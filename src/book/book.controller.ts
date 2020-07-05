import { Controller, Logger, Get, HttpException, HttpStatus, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiQuery, ApiCreatedResponse } from '@nestjs/swagger';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { BookDto } from '../dtos/book.dto';

@ApiTags('book')
@Controller('book')
export class BookController {

    client: ClientProxy;
    logger = new Logger('Book');
    
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
    async findAllBook(@Query('limit') limit=10,@Query('offset') offset=0){
        this.logger.log('Getting all books');
        const pattern = { cmd: 'getBook' };
        const book = await this.client.send(pattern, [limit,offset]);
        if(book)
            return book;
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);        
    }

    @Post()
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: BookDto,
      })
    async createBook(@Body() bookDto: BookDto){
        const book = await this.client.send<BookDto>({cmd: 'addBook'},bookDto);
        if(book)
            return book;
        throw new HttpException('Book not created',HttpStatus.NOT_MODIFIED); 
    }

    @Get(':bookId')
    async findOneBook(@Param('bookId') bookId: string){
        this.logger.log('Getting one book');
        const pattern = { cmd: 'getBookById' };
        const book = await this.client.send<number>(pattern, bookId);        
        if(book)
            return book;
        throw new HttpException('Book not found',HttpStatus.NOT_FOUND);        
    }

    @Patch(':bookId')
    async updateBook(@Param('bookId') bookId: string, @Body() bookDto: BookDto){
        const book = await this.client.send<number>({cmd: 'updateBook'},[bookId,bookDto]);
        if(book)
            return book;
        throw new HttpException('Book not modified',HttpStatus.NOT_FOUND);
    }

    @Delete(':bookId')
    async removeBook(@Param('bookId') bookId: string){
        const book = await this.client.send<number>({cmd: 'deleteBook'},bookId);
        if(book)
            return book;
         throw new HttpException('Book not modified',HttpStatus.NOT_FOUND);
    }

    @Patch(':bookId/bookcategory/:bcategoryId')
    async CategoryBook(@Param('bookId') bookId: string, @Param('bcategoryId') bcategoryId: string){
        this.logger.log('Updating one category book a book');
        const pattern = { cmd: 'updateCategoryBook' };        
        const book = await this.client.send<number>(pattern, [bookId,bcategoryId]);                
        if(book)
           return book
        throw new HttpException('Book not modified',HttpStatus.NOT_FOUND);
    }

    @Delete(':bookId/bookcategory/:bcategoryId')
    async DeleteCategoryBook(@Param('bookId') bookId: string, @Param('bcategoryId') bcategoryId: string){
        this.logger.log('Deleting one category book a book');
        const pattern = { cmd: 'deleteCategoryBook' };        
        const book = await this.client.send<number>(pattern, [bookId,bcategoryId]);                
        if(book)
           return book
        throw new HttpException('Book not modified',HttpStatus.NOT_FOUND);
    }

    @Patch(':bookId/edition/:editionId')
    async EditionBook(@Param('bookId') bookId: string, @Param('editionId') editionId: string){
        this.logger.log('Updating one edition book');
        const pattern = { cmd: 'updateBookEdition' };        
        const book = await this.client.send<number>(pattern, [bookId,editionId]);                
        if(book)
           return book
        throw new HttpException('Book not modified',HttpStatus.NOT_FOUND);
    }

    @Delete(':bookId/edition/:editionId')
    async DeleteEditionBook(@Param('bookId') bookId: string, @Param('editionId') editionId: string){
        this.logger.log('Deleting one edition book');
        const pattern = { cmd: 'deleteBookEdition' };        
        const book = await this.client.send<number>(pattern, [bookId,editionId]);                
        if(book)
           return book
        throw new HttpException('Book not modified',HttpStatus.NOT_FOUND);
    }
}
