import { Controller, Logger, Get, Query, HttpException, HttpStatus, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ApiQuery, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ArticleDto } from '../dtos/article.dto';
import { ArtistArticleDto } from '../dtos/artistArticle.dto';

@ApiTags('article')
@Controller('article')
export class ArticleController {

    client: ClientProxy;
    logger = new Logger('Article');
    
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
    async findAllArticle(@Query('limit') limit=10,@Query('offset') offset=0){
        this.logger.log('Getting all articles');
        const pattern = { cmd: 'getArticle' };
        const article = await this.client.send(pattern, [limit,offset]);
        if(article)
            return article;
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        //return this.socialService.findAllSocial(limit,offset);
    }

    @Post()
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: ArticleDto,
      })
    async createArticle(@Body() articleDto: ArticleDto){
        const article = await this.client.send<ArticleDto>({cmd: 'addArticle'},articleDto);
        if(article)
            return article;
        throw new HttpException('Article not created',HttpStatus.NOT_MODIFIED); 
    }

    @Get(':articleId')
    async findOneArticle(@Param('articleId') articleId: string){
        this.logger.log('Getting one article');
        const pattern = { cmd: 'getArticleById' };
        const article = await this.client.send<number>(pattern, articleId);        
        if(article){
            await this.client.emit<number>('get_artist_article', article).toPromise();
            return article;
        }
            //return article;
        throw new HttpException('Article not found',HttpStatus.NOT_FOUND);        
    }

    @Patch(':articleId')
    async updateArticle(@Param('articleId') articleId: string, @Body() articleDto: ArticleDto){
        this.logger.log('Updating one article');
        const article = await this.client.send<number>(
            {cmd: 'updateArticle' },
            [articleId,articleDto]
            );
        this.logger.log('Updating one article updated');
        if(article)
            return article;
        throw new HttpException('Article not modified',HttpStatus.NOT_FOUND);
    }

    @Delete(':articleId')
    async removeArticle(@Param('articleId') articleId: string){
        const article = await this.client.send<number>({cmd: 'deleteArticle'},articleId);
        if(article)
            return article;
         throw new HttpException('Article not modified',HttpStatus.NOT_FOUND);
    }

    @Patch(':articleId/tag/:tagId')
    async TagArticle(@Param('articleId') articleId: string, @Param('tagId') tagId: string){
        this.logger.log('Updating one tag article');
        const pattern = { cmd: 'updateArticleTag' };        
        const article = await this.client.send<number>(pattern, [articleId,tagId]);                
        if(article)
           return article
        throw new HttpException('Article not modified',HttpStatus.NOT_FOUND);
    }

    @Delete(':articleId/tag/:tagId')
    async DeleteTagArticle(@Param('articleId') articleId: string, @Param('tagId') tagId: string){
        this.logger.log('Deleting one tag article');
        const pattern = { cmd: 'deleteArticleTag' };        
        const article = await this.client.send<number>(pattern, [articleId,tagId]);                
        if(article)
           return article
        throw new HttpException('Article not modified',HttpStatus.NOT_FOUND);
    }


    @Patch(':articleId/label/:labelId')
    async LabelArticle(@Param('articleId') articleId: string, @Param('labelId') labelId: string){
        this.logger.log('Updating one label article');
        const pattern = { cmd: 'updateArticleLabel' };        
        const article = await this.client.send<number>(pattern, [articleId,labelId]);                
        if(article)
           return article
        throw new HttpException('Article not modified',HttpStatus.NOT_FOUND);
    }

    @Delete(':articleId/label/:labelId')
    async DeleteLabelArticle(@Param('articleId') articleId: string, @Param('labelId') labelId: string){
        this.logger.log('Deleting one label article');
        const pattern = { cmd: 'deleteArticleLabel' };        
        const article = await this.client.send<number>(pattern, [articleId,labelId]);                
        if(article)
           return article
        throw new HttpException('Article not modified',HttpStatus.NOT_FOUND);
    }

    @Patch(':articleId/redaction/:redactionId')
    async RedactionArticle(@Param('articleId') articleId: string, @Param('redactionId') redactionId: string){
        this.logger.log('Updating one redaction article');
        const pattern = { cmd: 'updateArticleAuthor' };        
        const article = await this.client.send<number>(pattern, [articleId,redactionId]);                
        if(article)
           return article
        throw new HttpException('Article not modified',HttpStatus.NOT_FOUND);
    }

    @Delete(':articleId/redaction/:redactionId')
    async DeleteRedactionArticle(@Param('articleId') articleId: string, @Param('redactionId') redactionId: string){
        this.logger.log('Deleting one redaction article');
        const pattern = { cmd: 'deleteArticleAuthor' };        
        const article = await this.client.send<number>(pattern, [articleId,redactionId]);                
        if(article)
           return article
        throw new HttpException('Article not modified',HttpStatus.NOT_FOUND);
    }

    @Patch(':articleId/artist/:artisteId')
    async ArticleArtist(@Param('articleId') articleId: string, @Param('artisteId') artisteId: string, @Body() artistArticleDto: ArtistArticleDto){
        this.logger.log('Updating one artist article');
        const pattern = { cmd: 'getArtistById' };                
        const artiste = await this.client.send<number>(pattern,artisteId);        
        if(artiste){
            artistArticleDto.artisteId= +artisteId;            
            artistArticleDto.articleId= +articleId;
            await this.client.emit<number>('create_artist_article', artistArticleDto).toPromise(); 
            return artistArticleDto;
            //return await this.client.send<number>({cmd: 'addArtisteArticle'},artistArticleDto);                       
        }

        throw new HttpException('Artiste Article not modified',HttpStatus.NOT_FOUND);
    }

    @Delete(':articleId/artist/:artisteId')
    async DeleteArticleArtist(@Param('articleId') articleId: string, @Param('artisteId') artisteId: string){
        this.logger.log('Deleting one artist article');
        const pattern = { cmd: 'getArtisteArticle' };                
        const artistArticle = await this.client.send<number>(pattern,[articleId,artisteId]);        
        if(artistArticle){            
           await this.client.emit<number>('delete_artist_article', [articleId,artisteId]).toPromise();  
           return artistArticle;                                
        }

        throw new HttpException('Artiste Article not modified',HttpStatus.NOT_FOUND);
    }
    
}
