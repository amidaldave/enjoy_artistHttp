import { Controller, Logger, Get, Query, HttpException, HttpStatus, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ApiQuery, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { RedactionDto } from '../dtos/redaction.dto';

@ApiTags('redaction')
@Controller('redaction')
export class RedactionController {

    client: ClientProxy;
    logger = new Logger('Redaction');
    
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
    async findAllRedaction(@Query('limit') limit=10,@Query('offset') offset=0){
        this.logger.log('Getting all redactions');
        const pattern = { cmd: 'getAuthor' };
        const redaction = await this.client.send(pattern, [limit,offset]);
        if(redaction)
            return redaction;
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        //return this.socialService.findAllSocial(limit,offset);
    }

    @Post()
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: RedactionDto,
      })
    async createRedaction(@Body() redactionDto: RedactionDto){
        const redaction = await this.client.send<RedactionDto>({cmd: 'addAuthor'},redactionDto);
        if(redaction)
            return redaction;
        throw new HttpException('Redaction not created',HttpStatus.NOT_MODIFIED); 
    }

    @Get(':redactionId')
    async findOneRedaction(@Param('redactionId') redactionId: string){
        this.logger.log('Getting one redaction');
        const pattern = { cmd: 'getAuthorById' };
        const redaction = await this.client.send<number>(pattern, redactionId);        
        if(redaction)
            return redaction;
        throw new HttpException('Redaction not found',HttpStatus.NOT_FOUND);        
    }

    @Patch(':redactionId')
    async updateRedaction(@Param('redactionId') redactionId: string, @Body() redactionDto: RedactionDto){
        const redaction = await this.client.send<number>({cmd: 'updateAuthor'},[redactionId,redactionDto]);
        if(redaction)
            return redaction;
        throw new HttpException('Redaction not modified',HttpStatus.NOT_FOUND);
    }

    @Delete(':redactionId')
    async removeRedaction(@Param('redactionId') redactionId: string){
        const redaction = await this.client.send<number>({cmd: 'deleteAuthor'},redactionId);
        if(redaction)
            return redaction;
         throw new HttpException('Redaction not modified',HttpStatus.NOT_FOUND);
    }
}
