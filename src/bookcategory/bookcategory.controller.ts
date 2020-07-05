import { Controller, Logger, Get, HttpException, HttpStatus, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiQuery, ApiCreatedResponse } from '@nestjs/swagger';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { BookCategoryDto } from '../dtos/bookcategory.dto';

@ApiTags('bookcategory')
@Controller('bookcategory')
export class BookcategoryController {

    client: ClientProxy;
    logger = new Logger('BookCategory');
    
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
    async findAllBookCategory(@Query('limit') limit=10,@Query('offset') offset=0){
        this.logger.log('Getting all books categories');
        const pattern = { cmd: 'getBookCategory' };
        const bcategory = await this.client.send(pattern, [limit,offset]);
        if(bcategory)
            return bcategory;
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        //return this.socialService.findAllSocial(limit,offset);
    }

    @Post()
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: BookCategoryDto,
      })
    async createBookCategory(@Body() bcategoryDto: BookCategoryDto){
        const bcategory = await this.client.send<BookCategoryDto>({cmd: 'addBookCategory'},bcategoryDto);
        if(bcategory)
            return bcategory;
        throw new HttpException('Book Category not created',HttpStatus.NOT_MODIFIED); 
    }

    @Get(':bcategoryId')
    async findOneBookCategory(@Param('bcategoryId') bcategoryId: string){
        this.logger.log('Getting one book category');
        const pattern = { cmd: 'getBookCategoryById' };
        const bcategory = await this.client.send<number>(pattern, bcategoryId);        
        if(bcategory)
            return bcategory;
        throw new HttpException('Book Category not found',HttpStatus.NOT_FOUND);        
    }

    @Patch(':bcategoryId')
    async updateBookCategory(@Param('bcategoryId') bcategoryId: string, @Body() bcategoryDto: BookCategoryDto){
        const bcategory = await this.client.send<number>({cmd: 'updateBookCategory'},[bcategoryId,bcategoryDto]);
        if(bcategory)
            return bcategory
        throw new HttpException('Book Category not modified',HttpStatus.NOT_FOUND);
    }

    @Delete(':bcategoryId')
    async removeBookCategory(@Param('bcategoryId') bcategoryId: string){
        const bcategory = await this.client.send<number>({cmd: 'deleteBookCategory'},bcategoryId);
        if(bcategory)
            return bcategory
         throw new HttpException('Book Category not modified',HttpStatus.NOT_FOUND);
    }
}
