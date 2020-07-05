import { Controller, Logger, Get, Query, HttpException, HttpStatus, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ApiQuery, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { LabelDto } from '../dtos/label.dto';

@ApiTags('label')
@Controller('label')
export class LabelController {

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
    async findAllLabel(@Query('limit') limit=10,@Query('offset') offset=0){
        this.logger.log('Getting all labels');
        const pattern = { cmd: 'getLabel' };
        const label = await this.client.send(pattern, [limit,offset]);
        if(label)
            return label;
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        //return this.socialService.findAllSocial(limit,offset);
    }

    @Post()
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: LabelDto,
      })
    async createLabel(@Body() labelDto: LabelDto){
        const label = await this.client.send<LabelDto>({cmd: 'addLabel'},labelDto);
        if(label)
            return label;
        throw new HttpException('Label not created',HttpStatus.NOT_MODIFIED); 
    }

    @Get(':labelId')
    async findOneLabel(@Param('labelId') labelId: string){
        this.logger.log('Getting one label');
        const pattern = { cmd: 'getLabelById' };
        const label = await this.client.send<number>(pattern, labelId);        
        if(label)
            return label;
        throw new HttpException('Label not found',HttpStatus.NOT_FOUND);        
    }

    @Patch(':labelId')
    async updateLabel(@Param('labelId') labelId: string, @Body() labelDto: LabelDto){
        const label = await this.client.send<number>({cmd: 'updateLabel'},[labelId,labelDto]);
        if(label)
            return label;
        throw new HttpException('Label not modified',HttpStatus.NOT_FOUND);
    }

    @Delete(':labelId')
    async removeLabel(@Param('labelId') labelId: string){
        const label = await this.client.send<number>({cmd: 'deleteLabel'},labelId);
        if(label)
            return label;
         throw new HttpException('Label not modified',HttpStatus.NOT_FOUND);
    }
}
