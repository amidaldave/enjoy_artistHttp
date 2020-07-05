import { Controller, Logger, Get, HttpException, HttpStatus, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiQuery } from '@nestjs/swagger';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AlbumDto } from '../dtos/album.dto';

@ApiTags('album')
@Controller('album')
export class AlbumController {

    client: ClientProxy;
    logger = new Logger('Album');
    
    constructor(
       
    ){

        this.client = ClientProxyFactory.create({
            transport: Transport.REDIS,
            options: {
              url: 'redis://localhost:6379',
            },
          });
    }

    @Get() 
    @ApiQuery({name:'limit'})   
    @ApiQuery({name:'offset'})    
    async findAllAlbum(@Query('limit') limit=10,@Query('offset') offset=0){
        this.logger.log('Getting all albums');
        const pattern = { cmd: 'getAlbum' };
        const album = await this.client.send(pattern, [limit,offset]);
        if(album)
            return album;
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        //return this.socialService.findAllSocial(limit,offset);
    }

    @Post()
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: AlbumDto,
      })
    async createAlbum(@Body() albumDto: AlbumDto){
        const album = await this.client.send<AlbumDto>({cmd: 'addAlbum'},albumDto);
        if(album)
            return album;
        throw new HttpException('Album not created',HttpStatus.NOT_MODIFIED); 
    }

    @Get(':albumId')
    async findOneAlbum(@Param('albumId') albumId: string){
        this.logger.log('Getting one album');
        const pattern = { cmd: 'getAlbumById' };
        const album = await this.client.send<number>(pattern, albumId);        
        if(album)
            return album;
        throw new HttpException('Album not found',HttpStatus.NOT_FOUND);        
    }

    @Patch(':albumId')
    async updateAlbum(@Param('albumId') albumId: string, @Body() albumDto: AlbumDto){
        const album = await this.client.send<number>({cmd: 'updateAlbum'},[albumId,albumDto]);
        if(album)
            return album;
        throw new HttpException('Album not modified',HttpStatus.NOT_FOUND);
    }

    @Patch(':albumId/song/:songId')
    async SongAlbum(@Param('albumId') albumId: string, @Param('songId') songId: string){
        this.logger.log('Updating one song album');
        const pattern = { cmd: 'updateAlbumSong' };        
        const album = await this.client.send<number>(pattern, [albumId,songId]);                
        if(album)
           return album
        throw new HttpException('Album not modified',HttpStatus.NOT_FOUND);
    }

    @Delete(':albumId/song/:songId')
    async DeleteSongAlbum(@Param('albumId') albumId: string, @Param('songId') songId: string){
        this.logger.log('Deleting one song album');
        const pattern = { cmd: 'deleteAlbumSong' };        
        const album = await this.client.send<number>(pattern, [albumId,songId]);                
        if(album)
           return album
        throw new HttpException('Album not modified',HttpStatus.NOT_FOUND);
    }

    @Patch(':albumId/musicgenre/:mgenreId')
    async GenreAlbum(@Param('albumId') albumId: string, @Param('mgenreId') mgenreId: string){
        this.logger.log('Updating one music genre album');
        const pattern = { cmd: 'updateAlbumGenre' };        
        const album = await this.client.send<number>(pattern, [albumId,mgenreId]);                
        if(album)
           return album
        throw new HttpException('Album not modified',HttpStatus.NOT_FOUND);
    }

    @Delete(':albumId/musicgenre/:mgenreId')
    async DeleteGenreAlbum(@Param('albumId') albumId: string, @Param('mgenreId') mgenreId: string){
        this.logger.log('Deleting one music genre album');
        const pattern = { cmd: 'deleteAlbumGenre' };        
        const album = await this.client.send<number>(pattern, [albumId,mgenreId]);                
        if(album)
           return album
        throw new HttpException('Album not modified',HttpStatus.NOT_FOUND);
    }

    @Patch(':albumId/band/:bandId')
    async BandAlbum(@Param('albumId') albumId: string, @Param('bandId') bandId: string){
        this.logger.log('Updating one band album');
        const pattern = { cmd: 'updateAlbumBand' };        
        const album = await this.client.send<number>(pattern, [albumId,bandId]);                
        if(album)
           return album
        throw new HttpException('Album not modified',HttpStatus.NOT_FOUND);
    }

    @Delete(':albumId/band/:bandId')
    async DeleteBandAlbum(@Param('albumId') albumId: string, @Param('bandId') bandId: string){
        this.logger.log('Deleting one band album');
        const pattern = { cmd: 'deleteAlbumBand' };        
        const album = await this.client.send<number>(pattern, [albumId,bandId]);                
        if(album)
           return album
        throw new HttpException('Album not modified',HttpStatus.NOT_FOUND);
    }

    @Delete(':albumId')
    async removeAlbum(@Param('albumId') albumId: string){
        const album = await this.client.send<number>({cmd: 'deleteAlbum'},albumId);
        if(album)
            return album;
         throw new HttpException('Album not modified',HttpStatus.NOT_FOUND);
    }
}
