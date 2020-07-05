import { Controller, Logger, Get, HttpException, HttpStatus, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiQuery, ApiCreatedResponse } from '@nestjs/swagger';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { EditionDto } from '../dtos/edition.dto';

@ApiTags('edition')
@Controller('edition')
export class EditionController {

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
    async findAllEdition(@Query('limit') limit=10,@Query('offset') offset=0){
        this.logger.log('Getting all editions');
        const pattern = { cmd: 'getEdition' };
        const edition = await this.client.send(pattern, [limit,offset]);
        if(edition)
            return edition;
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        //return this.socialService.findAllSocial(limit,offset);
    }

    @Post()
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: EditionDto,
      })
    async createEdition(@Body() editionDto: EditionDto){
        const edition = await this.client.send<EditionDto>({cmd: 'addEdition'},editionDto);
        if(edition)
            return edition;
        throw new HttpException('Edition not created',HttpStatus.NOT_MODIFIED); 
    }

    @Get(':editionId')
    async findOneEdition(@Param('editionId') editionId: string){
        this.logger.log('Getting one edition');
        const pattern = { cmd: 'getEditionById' };
        const edition = await this.client.send<number>(pattern, editionId);        
        if(edition)
            return edition;
        throw new HttpException('Edition not found',HttpStatus.NOT_FOUND);        
    }

    @Patch(':editionId')
    async updateEdition(@Param('editionId') editionId: string, @Body() editionDto: EditionDto){
        const edition = await this.client.send<number>({cmd: 'updateEdition'},[editionId,editionDto]);
        if(edition)
            return edition;
        throw new HttpException('Edition not modified',HttpStatus.NOT_FOUND);
    }

    @Delete(':editionId')
    async removeEdition(@Param('editionId') editionId: string){
        const edition = await this.client.send<number>({cmd: 'deleteEdition'},editionId);
        if(edition)
            return edition;
         throw new HttpException('Edition not modified',HttpStatus.NOT_FOUND);
    }
}
