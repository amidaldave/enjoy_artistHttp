import { Controller, HttpException, HttpStatus, Logger, Param, Body, Get, Post, Patch, Delete } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MediaDto } from '../dtos/media.dto';
import { ArtisteMediaDto } from '../dtos/artistemedia.dto';

@ApiTags('media')
@Controller('media')
export class MediaController {
    client: ClientProxy;
    logger = new Logger('Media');
    
    constructor(
        //private readonly socialService: SocialService,
    ){

        this.client = ClientProxyFactory.create({
            transport: Transport.REDIS,
            options: {
              url: 'redis://localhost:6379',
            },
          });
    }

    @Get()    
    async findAllMedia(){
        this.logger.log('Getting all medias');
        const pattern = { cmd: 'getMedia' };
        const photo = await this.client.send(pattern, {});
        if(photo)
            return photo;
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        //return this.socialService.findAllSocial(limit,offset);
    }

    @Post()
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: MediaDto,
      })
    async createMedia(@Body() mediaDto: MediaDto){
        const photo = await this.client.send<MediaDto>({cmd: 'addMedia'},mediaDto);
        if(photo)
            return photo;
        throw new HttpException('Media not created',HttpStatus.NOT_MODIFIED); 
    }

    @Get(':photoId')
    async findOneMedia(@Param('photoId') photoId: string){
        this.logger.log('Getting one media');
        const pattern = { cmd: 'getMediaById' };
        const photo = await this.client.send<number>(pattern, photoId);        
        if(photo)
            return photo;
        throw new HttpException('Media not found',HttpStatus.NOT_FOUND);        
    }

    @Patch(':photoId')
    async updateMedia(@Param('photoId') photoId: string, @Body() mediaDto: MediaDto){
        const photo = await this.client.send<number>({cmd: 'updateMedia'},[photoId,mediaDto]);
        if(photo)
            return photo
        throw new HttpException('Media not modified',HttpStatus.NOT_FOUND);
    }

    @Delete(':photoId')
    async removeMedia(@Param('photoId') photoId: string){
        const photo = await this.client.send<number>({cmd: 'deleteMedia'},photoId);
        if(photo)
            return photo
         throw new HttpException('Media not modified',HttpStatus.NOT_FOUND);
    }

    @Patch(':photoId/artist/:artisteId')
    async MediaArtist(@Param('photoId') photoId: string, @Param('artisteId') artisteId: string, @Body() artistemediaDto: ArtisteMediaDto){
        this.logger.log('Updating one artist media');
        const pattern = { cmd: 'getArtistById' };                
        const artiste = await this.client.send<number>(pattern,artisteId);        
        if(artiste){
            artistemediaDto.artisteId= +artisteId;            
            artistemediaDto.photoId= +photoId;
            await this.client.emit<number>('create_artist_media', artistemediaDto).toPromise(); 
            return await this.client.send<number>({cmd: 'addArtisteMedia'},artistemediaDto);                       
        }

        throw new HttpException('Artiste Media not modified',HttpStatus.NOT_FOUND);
    }

    @Delete(':photoId/artist/:artisteId')
    async DeleteMediaArtist(@Param('photoId') photoId: string, @Param('artisteId') artisteId: string){
        this.logger.log('Deleting one artist media');
        const pattern = { cmd: 'deleteArtisteMedia' };                
        const artisteMedia = await this.client.send<number>(pattern,[photoId,artisteId]);        
        if(artisteMedia){            
           await this.client.emit<number>('delete_artist_media', [photoId,artisteId]).toPromise();  
           return artisteMedia;                                
        }

        throw new HttpException('Artiste Media not modified',HttpStatus.NOT_FOUND);
    }
}
