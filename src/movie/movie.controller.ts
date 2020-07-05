import { Controller, Logger, Get, Query, HttpException, HttpStatus, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ClientProxy, Transport, ClientProxyFactory } from '@nestjs/microservices';
import { ApiQuery, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { MovieDto } from '../dtos/movie.dto';

@ApiTags('movie')
@Controller('movie')
export class MovieController {

    client: ClientProxy;
    logger = new Logger('Label');
    
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
    async findAllMovie(@Query('limit') limit=10,@Query('offset') offset=0){
        this.logger.log('Getting all movies');
        const pattern = { cmd: 'getMovie' };
        const movie = await this.client.send(pattern, [limit,offset]);
        if(movie)
            return movie;
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        //return this.socialService.findAllSocial(limit,offset);
    }

    @Post()
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: MovieDto,
      })
    async createMovie(@Body() movieDto: MovieDto){
        const movie = await this.client.send<MovieDto>({cmd: 'addMovie'},movieDto);
        if(movie)
            return movie;
        throw new HttpException('Movie not created',HttpStatus.NOT_MODIFIED); 
    }

    @Get(':movieId')
    async findOneMovie(@Param('movieId') movieId: string){
        this.logger.log('Getting one movie');
        const pattern = { cmd: 'getMovieById' };
        const movie = await this.client.send<number>(pattern, movieId);        
        if(movie)
            return movie;
        throw new HttpException('Movie not found',HttpStatus.NOT_FOUND);        
    }

    @Patch(':movieId')
    async updateMovie(@Param('movieId') movieId: string, @Body() movieDto: MovieDto){
        const movie = await this.client.send<number>({cmd: 'updateMovie'},[movieId,movieDto]);
        if(movie)
            return movie;
        throw new HttpException('Movie not modified',HttpStatus.NOT_FOUND);
    }

    @Delete(':movieId')
    async removeMovie(@Param('movieId') movieId: string){
        const movie = await this.client.send<number>({cmd: 'deleteMovie'},movieId);
        if(movie)
            return movie;
         throw new HttpException('Movie not modified',HttpStatus.NOT_FOUND);
    }
}
