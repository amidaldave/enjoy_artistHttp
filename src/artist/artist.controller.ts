import { Controller, Get, Patch, Delete, Post, Body, HttpException, HttpStatus, Param, Logger, Query} from '@nestjs/common';
import { ArtisteDto } from '../dtos/artist.dto';
import { ApiCreatedResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import {ClientProxy, ClientProxyFactory, Transport} from '@nestjs/microservices';
import { ArtistFestivalDto } from '../dtos/artistFestival.dto';
import { ArtistEventDto } from '../dtos/artistevent.dto';

@ApiTags('artist')
@Controller('artist')
export class ArtistController {
    client: ClientProxy;
    logger = new Logger('Artists');

    constructor(){
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
    async findAllArtist(@Query('limit') limit=10,@Query('offset') offset=0){
        this.logger.log('Getting all artists');
        const pattern = { cmd: 'getArtist' };
        const artist = await this.client.send(pattern, [limit,offset]);
        if(artist)
            return artist;
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        //return this.artisteService.findAllArtist(limit,offset);
    }

    @Post()
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: ArtisteDto,
      })
    async createArtiste(@Body() artisteDto: ArtisteDto){
        //this.logger.log(artisteDTO);
        //const artiste = await this.artisteService.createArtiste(artisteDto);
        const artiste = await this.client.send<ArtisteDto>(
            {cmd: 'addArtist' },
            artisteDto,
        );
        if(artiste)
            return artiste;
        throw new HttpException('Artiste not created',HttpStatus.NOT_MODIFIED); 
        //Logger.log('L"artiste dont l"id est '+artisteId+' a ete cree','ArtisteController');
    }

    @Get(':artisteId')
    async findOneArtiste(@Param('artisteId') artisteId: string){
        //Logger.log('L"artiste dont l"id est '+artisteId,'ArtisteController');
        this.logger.log('Getting one artist');
        const pattern = { cmd: 'getArtistById' };
        const artiste = await this.client.send<number>(pattern, artisteId);
        //const artiste = await this.artisteService.findOneArtist(artisteId);
        if(artiste){
            await this.client.emit<number>('get_artist_article',artisteId).toPromise();
            return artiste;
        }
            
        throw new HttpException('Artiste not found',HttpStatus.NOT_FOUND);        
    }

    @Patch(':artisteId')
    async updateArtist(@Param('artisteId') artisteId: string, @Body() artisteDto: ArtisteDto){
        this.logger.log('Updating one artist');
        //const pattern = { cmd: 'updateArtist' };
        const artist = await this.client.send<number>(
            { cmd: 'updateArtist' },
            [artisteId,artisteDto]            
            );
            this.logger.log('Updating one artist updated'); 
        if(artist)             
           return artist;           
        throw new HttpException('Artiste not modified',HttpStatus.NOT_FOUND);
    }

    @Patch(':artisteId/profession/:professionId')
    async ProfessionArtist(@Param('artisteId') artisteId: string, @Param('professionId') professionId: string){
        this.logger.log('Updating one profession artist');
        const pattern = { cmd: 'updateArtistProfession' };
        const artist = await this.client.send<number>(pattern, [artisteId,professionId]);
        if(artist)
            return artist
        throw new HttpException('Artiste not modified',HttpStatus.NOT_FOUND);
    }
    
    @Delete(':artisteId/profession/:professionId')
    async DeleteProfessionArtist(@Param('artisteId') artisteId: string, @Param('professionId') professionId: string){
        this.logger.log('Deleting one profession artist');
        const pattern = { cmd: 'deleteArtistProfession' };        
        const artiste = await this.client.send<number>(pattern, [artisteId,professionId]);                
        if(artiste)
           return artiste
        throw new HttpException('Artist Profession not modified',HttpStatus.NOT_FOUND);
    }

    @Patch(':artisteId/social/:socialId')
    async SocialArtist(@Param('artisteId') artisteId: string, @Param('socialId') socialId: string){
        this.logger.log('Updating one social artist');
        const pattern = { cmd: 'updateArtistSocial' };        
        const artist = await this.client.send<number>(pattern, [artisteId,socialId]);                
        if(artist)
           return artist
        throw new HttpException('Artiste not modified',HttpStatus.NOT_FOUND);
    }

    @Delete(':artisteId/social/:socialId')
    async DeleteSocialArtist(@Param('artisteId') artisteId: string, @Param('socialId') socialId: string){
        this.logger.log('Deleting one social artist');
        const pattern = { cmd: 'deleteArtistSocial' };        
        const artiste = await this.client.send<number>(pattern, [artisteId,socialId]);                
        if(artiste)
           return artiste
        throw new HttpException('Artist Social not modified',HttpStatus.NOT_FOUND);
    }

    @Patch(':artisteId/song/:songId')
    async SongArtist(@Param('artisteId') artisteId: string, @Param('songId') songId: string){
        this.logger.log('Updating one song artist');
        const pattern = { cmd: 'updateArtistSong' };        
        const artist = await this.client.send<number>(pattern, [artisteId,songId]);                
        if(artist)
           return artist
        throw new HttpException('Artiste not modified',HttpStatus.NOT_FOUND);
    }

    @Delete(':artisteId/song/:songId')
    async DeleteSongArtist(@Param('artisteId') artisteId: string, @Param('songId') songId: string){
        this.logger.log('Deleting one song artist');
        const pattern = { cmd: 'deleteArtistSocial' };        
        const artiste = await this.client.send<number>(pattern, [artisteId,songId]);                
        if(artiste)
           return artiste
        throw new HttpException('Artist Song not modified',HttpStatus.NOT_FOUND);
    }

    @Patch(':artisteId/book/:bookId')
    async BookArtist(@Param('artisteId') artisteId: string, @Param('bookId') bookId: string){
        this.logger.log('Updating one book artist');
        const pattern = { cmd: 'updateArtistBook' };        
        const artist = await this.client.send<number>(pattern, [artisteId,bookId]);                
        if(artist)
           return artist
        throw new HttpException('Artiste not modified',HttpStatus.NOT_FOUND);
    }

    @Delete(':artisteId/book/:bookId')
    async DeleteBookArtist(@Param('artisteId') artisteId: string, @Param('bookId') bookId: string){
        this.logger.log('Deleting one book artist');
        const pattern = { cmd: 'deleteArtistBook' };        
        const artiste = await this.client.send<number>(pattern, [artisteId,bookId]);                
        if(artiste)
           return artiste
        throw new HttpException('Artist Book not modified',HttpStatus.NOT_FOUND);
    }

    @Patch(':artisteId/band/:bandId')
    async BandArtist(@Param('artisteId') artisteId: string, @Param('bandId') bandId: string){
        this.logger.log('Updating one band artist');
        const pattern = { cmd: 'updateArtistBand' };        
        const artist = await this.client.send<number>(pattern, [artisteId,bandId]);                
        if(artist)
           return artist
        throw new HttpException('Artiste not modified',HttpStatus.NOT_FOUND);
    }

    @Delete(':artisteId/band/:bandId')
    async DeleteBandArtist(@Param('artisteId') artisteId: string, @Param('bandId') bandId: string){
        this.logger.log('Deleting one band artist');
        const pattern = { cmd: 'deleteArtistBand' };        
        const artiste = await this.client.send<number>(pattern, [artisteId,bandId]);                
        if(artiste)
           return artiste
        throw new HttpException('Artist Band not modified',HttpStatus.NOT_FOUND);
    }

    @Patch(':artisteId/album/:albumId')
    async AlbumArtist(@Param('artisteId') artisteId: string, @Param('albumId') albumId: string){
        this.logger.log('Updating one album artist');
        const pattern = { cmd: 'updateArtistAlbum' };        
        const artist = await this.client.send<number>(pattern, [artisteId,albumId]);                
        if(artist)
           return artist
        throw new HttpException('Artist not modified',HttpStatus.NOT_FOUND);
    }

    @Delete(':artisteId/album/:albumId')
    async DeleteAlbumArtist(@Param('artisteId') artisteId: string, @Param('albumId') albumId: string){
        this.logger.log('Deleting one album artist');
        const pattern = { cmd: 'deleteArtistAlbum' };        
        const artiste = await this.client.send<number>(pattern, [artisteId,albumId]);                
        if(artiste)
           return artiste
        throw new HttpException('Artist Album not modified',HttpStatus.NOT_FOUND);
    }

    @Patch(':artisteId/movie/:movieId')
    async MovieArtist(@Param('artisteId') artisteId: string, @Param('movieId') movieId: string){
        this.logger.log('Updating one movie artist');
        const pattern = { cmd: 'updateArtistMovie' };        
        const artist = await this.client.send<number>(pattern, [artisteId,movieId]);                
        if(artist)
           return artist
        throw new HttpException('Artist Movie not modified',HttpStatus.NOT_FOUND);
    }

    @Delete(':artisteId/movie/:movieId')
    async DeleteMovieArtist(@Param('artisteId') artisteId: string, @Param('movieId') movieId: string){
        this.logger.log('Deleting one movie artist');
        const pattern = { cmd: 'deleteArtistMovie' };        
        const artiste = await this.client.send<number>(pattern, [artisteId,movieId]);                
        if(artiste)
           return artiste
        throw new HttpException('Artist Movie not modified',HttpStatus.NOT_FOUND);
    }

    @Delete(':artisteId')
    async removeArtist(@Param('artisteId') artisteId: string){
        const pattern = { cmd: 'getArtistById' };
        const artist = await this.client.send<number>(pattern, artisteId);        
        const pattern1 = { cmd: 'deleteArtist' };
        if(artist)
        return await this.client.send<number>(pattern1, artisteId);           
        throw new HttpException('Artiste not deleted',HttpStatus.NOT_FOUND);
    }

    @Patch(':artisteId/event/:eventId')
    async EventArtist(@Param('artisteId') artisteId: string, @Param('eventId') eventId: string, @Body() artistEventDto: ArtistEventDto){
        this.logger.log('Updating one artist event');
        const pattern = { cmd: 'getArtistById' };                
        const artiste = await this.client.send<number>(pattern,artisteId);        
        if(artiste){
            artistEventDto.artisteId= +artisteId;            
            artistEventDto.eventId= +eventId;
            await this.client.emit<number>('create_artist_event', artistEventDto).toPromise(); 
            return artistEventDto;
            //return await this.client.send<number>({cmd: 'addArtisteArticle'},artistArticleDto);                       
        }

        throw new HttpException('Artiste Event not modified',HttpStatus.NOT_FOUND);
    }

    @Delete(':articleId/artist/:artisteId')
    async DeleteEventArtist(@Param('artisteId') artisteId: string, @Param('eventId') eventId: string){
        this.logger.log('Deleting one artist event');
        const pattern = { cmd: 'deleteArtisteEvent' };                
        const artistEvent = await this.client.send<number>(pattern,[artisteId,eventId]);        
        if(artistEvent){            
           await this.client.emit<number>('delete_artist_event', [artisteId,eventId]).toPromise();  
           return artistEvent;                                
        }

        throw new HttpException('Artiste Event not modified',HttpStatus.NOT_FOUND);
    }

    @Patch(':artisteId/festival/:festivalId')
    async FestivalArtist(@Param('artisteId') artisteId: string, @Param('festivalId') festivalId: string, @Body() artistFestivalDto: ArtistFestivalDto){
        this.logger.log('Updating one artist festival');
        const pattern = { cmd: 'getArtistById' };                
        const artiste = await this.client.send<number>(pattern,artisteId);        
        if(artiste){
            artistFestivalDto.artisteId= +artisteId;            
            artistFestivalDto.festivalId= +festivalId;
            await this.client.emit<number>('create_artist_festival', artistFestivalDto).toPromise(); 
            return artistFestivalDto;
            //return await this.client.send<number>({cmd: 'addArtisteArticle'},artistArticleDto);                       
        }

        throw new HttpException('Artiste Festival not modified',HttpStatus.NOT_FOUND);
    }

    @Delete(':articleId/artist/:festivalId')
    async DeleteFestivalArtist(@Param('artisteId') artisteId: string, @Param('festivalId') festivalId: string){
        this.logger.log('Deleting one artist festival');
        const pattern = { cmd: 'deleteArtisteFestival' };                
        const artistFestival = await this.client.send<number>(pattern,[artisteId,festivalId]);        
        if(artistFestival){            
           await this.client.emit<number>('delete_artist_festival', [artisteId,festivalId]).toPromise();  
           return artistFestival;                                
        }

        throw new HttpException('Artiste Event not modified',HttpStatus.NOT_FOUND);
    }
}
