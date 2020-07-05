import { Controller, Get, Post, Body, HttpException, HttpStatus, Param, Logger, Patch, Delete, Query } from '@nestjs/common';
import { SocialDto } from '../dtos/social.dto';
import { ApiCreatedResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@ApiTags('social')
@Controller('social')
export class SocialController {
    client: ClientProxy;
    logger = new Logger('Social');
    
    constructor(
        //private readonly socialService: SocialService,
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
    async findAllSocial(@Query('limit') limit=10,@Query('offset') offset=0){
        this.logger.log('Getting all socials');
        const pattern = { cmd: 'getSocial' };
        const social = await this.client.send(pattern, [limit,offset]);
        if(social)
            return social;
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);        
    }

    @Post()
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: SocialDto,
      })
    async createSocial(@Body() socialDto: SocialDto){
        const social = await this.client.send<SocialDto>({cmd: 'addSocial'},socialDto);
        if(social)
            return social;
        throw new HttpException('Social not created',HttpStatus.NOT_MODIFIED); 
    }

    @Get(':socialId')
    async findOneSocial(@Param('socialId') socialId: string){
        this.logger.log('Getting one social');
        const pattern = { cmd: 'getSocialById' };
        const social = await this.client.send<number>(pattern, socialId);        
        if(social)
            return social;
        throw new HttpException('Social not found',HttpStatus.NOT_FOUND);        
    }

    @Patch(':socialId')
    async updateSocial(@Param('socialId') socialId: string, @Body() socialDto: SocialDto){
        const social = await this.client.send<number>({cmd: 'updateSocial'},[socialId,socialDto]);
        if(social)
            return social;
        throw new HttpException('Social not modified',HttpStatus.NOT_FOUND);
    }

    @Delete(':socialId')
    async removeSocial(@Param('socialId') socialId: string){
        const social = await this.client.send<number>({cmd: 'deleteSocial'},socialId);
        if(social)
            return social;
         throw new HttpException('Social not modified',HttpStatus.NOT_FOUND);
    }
}
