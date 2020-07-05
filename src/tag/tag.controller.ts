import { Controller, Logger, Get, HttpException, HttpStatus, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ApiQuery, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { TagDto } from '../dtos/tag.dto';

@ApiTags('tag')
@Controller('tag')
export class TagController {

    client: ClientProxy;
    logger = new Logger('Tag');
    
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
    async findAllTag(@Query('limit') limit=10,@Query('offset') offset=0){
        this.logger.log('Getting all tags');
        const pattern = { cmd: 'getTag' };
        const tag = await this.client.send(pattern, [limit,offset]);
        if(tag)
            return tag;
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        //return this.socialService.findAllSocial(limit,offset);
    }

    @Post()
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: TagDto,
      })
    async createTag(@Body() tagDto: TagDto){
        const tag = await this.client.send<TagDto>({cmd: 'addTag'},tagDto);
        if(tag)
            return tag;
        throw new HttpException('Tag not created',HttpStatus.NOT_MODIFIED); 
    }

    @Get(':taggId')
    async findOneTag(@Param('tagId') tagId: string){
        this.logger.log('Getting one tag');
        const pattern = { cmd: 'getTagById' };
        const tag = await this.client.send<number>(pattern, tagId);        
        if(tag)
            return tag;
        throw new HttpException('Tag not found',HttpStatus.NOT_FOUND);        
    }

    @Patch(':tagId')
    async updateTagg(@Param('tagId') tagId: string, @Body() tagDto: TagDto){
        const tag = await this.client.send<number>({cmd: 'updateTag'},[tagId,tagDto]);
        if(tag)
            return tag;
        throw new HttpException('Tag not modified',HttpStatus.NOT_FOUND);
    }

    @Delete(':tagId')
    async removeTag(@Param('tagId') tagId: string){
        const tag = await this.client.send<number>({cmd: 'deleteTag'},tagId);
        if(tag)
            return tag;
         throw new HttpException('Tag not modified',HttpStatus.NOT_FOUND);
    }
}
