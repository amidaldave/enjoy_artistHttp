import { Controller, Logger, Get, Query, HttpException, HttpStatus, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiQuery, ApiCreatedResponse } from '@nestjs/swagger';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ScultureDto } from '../dtos/sculture.dto';

@ApiTags('sculture')
@Controller('sculture')
export class ScultureController {

    client: ClientProxy;
    logger = new Logger('Sculture');
    
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
    async findAllSculture(@Query('limit') limit=10,@Query('offset') offset=0){
        this.logger.log('Getting all scultures');
        const pattern = { cmd: 'getSculture' };
        const sculture = await this.client.send(pattern, [limit,offset]);
        if(sculture)
            return sculture;
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);       
    }

    @Post()
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: ScultureDto,
      })
    async createSculture(@Body() scultureDto: ScultureDto){
        const sculture = await this.client.send<ScultureDto>({cmd: 'addSculture'},scultureDto);
        if(sculture)
            return sculture;
        throw new HttpException('Sculture not created',HttpStatus.NOT_MODIFIED); 
    }

    @Get(':scultureId')
    async findOneSculture(@Param('scultureId') scultureId: string){
        this.logger.log('Getting one sculture');
        const pattern = { cmd: 'getScultureById' };
        const sculture = await this.client.send<number>(pattern, scultureId);        
        if(sculture)
            return sculture;
        throw new HttpException('Sculture not found',HttpStatus.NOT_FOUND);        
    }

    @Patch(':scultureId')
    async updateSculture(@Param('scultureId') scultureId: string, @Body() scultureDto: ScultureDto){
        const sculture = await this.client.send<number>({cmd: 'updateSculture'},[scultureId,scultureDto]);
        if(sculture)
            return sculture;
        throw new HttpException('Sculture not modified',HttpStatus.NOT_FOUND);
    }

    @Delete(':scultureId')
    async removeSculture(@Param('scultureId') scultureId: string){
        const sculture = await this.client.send<number>({cmd: 'deleteSculture'},scultureId);
        if(sculture)
            return sculture;
         throw new HttpException('Sculture not modified',HttpStatus.NOT_FOUND);
    }
}
