import { Controller, Logger, Get, HttpException, HttpStatus, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiQuery, ApiCreatedResponse } from '@nestjs/swagger';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { SongDto } from '../dtos/song.dto';

@ApiTags('song')
@Controller('song')
export class SongController {

    client: ClientProxy;
    logger = new Logger('Song');
    
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
    async findAllSong(@Query('limit') limit=10,@Query('offset') offset=0){
        this.logger.log('Getting all songs');
        const pattern = { cmd: 'getSong' };
        const song = await this.client.send(pattern, [limit,offset]);
        if(song)
            return song;
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        //return this.socialService.findAllSocial(limit,offset);
    }

    @Post()
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: SongDto,
      })
    async createSong(@Body() songDto: SongDto){
        const song = await this.client.send<SongDto>({cmd: 'addSong'},songDto);
        if(song)
            return song;
        throw new HttpException('Song not created',HttpStatus.NOT_MODIFIED); 
    }

    @Get(':songId')
    async findOneSong(@Param('songId') songId: string){
        this.logger.log('Getting one song');
        const pattern = { cmd: 'getSongById' };
        const song = await this.client.send<number>(pattern, songId);        
        if(song)
            return song;
        throw new HttpException('Song not found',HttpStatus.NOT_FOUND);        
    }

    @Patch(':songId')
    async updateSong(@Param('songId') songId: string, @Body() songDto: SongDto){
        const song = await this.client.send<number>({cmd: 'updateSong'},[songId,songDto]);
        if(song)
            return song;
        throw new HttpException('Song not modified',HttpStatus.NOT_FOUND);
    }

    @Delete(':songId')
    async removeSong(@Param('songId') songId: string){
        const song = await this.client.send<number>({cmd: 'deleteSong'},songId);
        if(song)
            return song;
         throw new HttpException('Song not modified',HttpStatus.NOT_FOUND);
    }
}
