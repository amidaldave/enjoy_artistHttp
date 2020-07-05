import { Controller, Logger, Get, Query, HttpException, HttpStatus, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiQuery, ApiCreatedResponse } from '@nestjs/swagger';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { PeintureDto } from '../dtos/peinture.dto';

@ApiTags('peinture')
@Controller('peinture')
export class PeintureController {

    client: ClientProxy;
    logger = new Logger('Edition');
    
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
    async findAllPeinture(@Query('limit') limit=10,@Query('offset') offset=0){
        this.logger.log('Getting all peintures');
        const pattern = { cmd: 'getPeinture' };
        const peinture = await this.client.send(pattern, [limit,offset]);
        if(peinture)
            return peinture;
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);       
    }

    @Post()
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: PeintureDto,
      })
    async createPeinture(@Body() peintureDto: PeintureDto){
        const peinture = await this.client.send<PeintureDto>({cmd: 'addPeinture'},peintureDto);
        if(peinture)
            return peinture;
        throw new HttpException('Peinture not created',HttpStatus.NOT_MODIFIED); 
    }

    @Get(':peintureId')
    async findOnePeinture(@Param('peintureId') peintureId: string){
        this.logger.log('Getting one peinture');
        const pattern = { cmd: 'getPeintureById' };
        const peinture = await this.client.send<number>(pattern, peintureId);        
        if(peinture)
            return peinture;
        throw new HttpException('Peinture not found',HttpStatus.NOT_FOUND);        
    }

    @Patch(':peintureId')
    async updatePeinture(@Param('peintureId') peintureId: string, @Body() peintureDto: PeintureDto){
        const peinture = await this.client.send<number>({cmd: 'updatePeinture'},[peintureId,peintureDto]);
        if(peinture)
            return peinture;
        throw new HttpException('Peinture not modified',HttpStatus.NOT_FOUND);
    }

    @Delete(':peintureId')
    async removePeinture(@Param('peintureId') peintureId: string){
        const peinture = await this.client.send<number>({cmd: 'deletePeinture'},peintureId);
        if(peinture)
            return peinture;
         throw new HttpException('Peinture not modified',HttpStatus.NOT_FOUND);
    }
}
