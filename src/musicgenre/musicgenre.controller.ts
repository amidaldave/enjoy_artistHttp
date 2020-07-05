import { Controller, Logger, Get, HttpException, HttpStatus, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiQuery, ApiCreatedResponse } from '@nestjs/swagger';
import { ClientProxy, Transport, ClientProxyFactory } from '@nestjs/microservices';
import { MusicGenreDto } from '../dtos/musicgenre.dto';

@ApiTags('musicgenre')
@Controller('musicgenre')
export class MusicgenreController {

    client: ClientProxy;
    logger = new Logger('Music Genre');
    
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
    async findAllMusicGenre(@Query('limit') limit=10,@Query('offset') offset=0){
        this.logger.log('Getting all musics genres');
        const pattern = { cmd: 'getMusicGenre' };
        const mgenre = await this.client.send(pattern, [limit,offset]);
        if(mgenre)
            return mgenre;
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        //return this.socialService.findAllSocial(limit,offset);
    }

    @Post()
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: MusicGenreDto,
      })
    async createSocial(@Body() mgenreDto: MusicGenreDto){
        const mgenre = await this.client.send<MusicGenreDto>({cmd: 'addMusicGenre'},mgenreDto);
        if(mgenre)
            return mgenre;
        throw new HttpException('Music Genre not created',HttpStatus.NOT_MODIFIED); 
    }

    @Get(':mgenreId')
    async findOneMusicGenre(@Param('mgenreId') mgenreId: string){
        this.logger.log('Getting one music genre');
        const pattern = { cmd: 'getMusicGenreById' };
        const mgenre = await this.client.send<number>(pattern, mgenreId);        
        if(mgenre)
            return mgenre;
        throw new HttpException('Music Genre not found',HttpStatus.NOT_FOUND);        
    }

    @Patch(':mgenreId')
    async updateMusicGenre(@Param('mgenreId') mgenreId: string, @Body() mgenreDto: MusicGenreDto){
        const mgenre = await this.client.send<number>({cmd: 'updateMusicGenre'},[mgenreId,mgenreDto]);
        if(mgenre)
            return mgenre
        throw new HttpException('Music Genre not modified',HttpStatus.NOT_FOUND);
    }

    @Delete(':mgenreId')
    async removeMusicGenre(@Param('mgenreId') mgenreId: string){
        const mgenre = await this.client.send<number>({cmd: 'deleteMusicGenre'},mgenreId);
        if(mgenre)
            return mgenre
         throw new HttpException('Music Genre not modified',HttpStatus.NOT_FOUND);
    }
}
