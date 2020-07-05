import { Controller, Logger, Get, HttpException, HttpStatus, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiQuery, ApiCreatedResponse } from '@nestjs/swagger';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { BandDto } from '../dtos/band.dto';

@ApiTags('band')
@Controller('band')
export class BandController {

    client: ClientProxy;
    logger = new Logger('Band');
    
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
    async findAllBand(@Query('limit') limit=10,@Query('offset') offset=0){
        this.logger.log('Getting all bands');
        const pattern = { cmd: 'getBand' };
        const band = await this.client.send(pattern, [limit,offset]);
        if(band)
            return band;
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        //return this.socialService.findAllSocial(limit,offset);
    }

    @Post()
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: BandDto,
      })
    async createBand(@Body() bandDto: BandDto){
        const band = await this.client.send<BandDto>({cmd: 'addBand'},bandDto);
        if(band)
            return band;
        throw new HttpException('Band not created',HttpStatus.NOT_MODIFIED); 
    }

    @Get(':bandId')
    async findOneBand(@Param('bandId') bandId: string){
        this.logger.log('Getting one band');
        const pattern = { cmd: 'getBandById' };
        const band = await this.client.send<number>(pattern, bandId);        
        if(band)
            return band;
        throw new HttpException('Band not found',HttpStatus.NOT_FOUND);        
    }

    @Patch(':bandId')
    async updateBand(@Param('bandId') bandId: string, @Body() bandDto: BandDto){
        const band = await this.client.send<number>({cmd: 'updateBand'},[bandId,bandDto]);
        if(band)
            return band;
        throw new HttpException('Band not modified',HttpStatus.NOT_FOUND);
    }

    @Delete(':bandId')
    async removeBand(@Param('bandId') bandId: string){
        const band = await this.client.send<number>({cmd: 'deleteBand'},bandId);
        if(band)
            return band;
         throw new HttpException('Band not modified',HttpStatus.NOT_FOUND);
    }

    @Patch(':bandId/social/:socialId')
    async SocialBand(@Param('bandId') bandId: string, @Param('socialId') socialId: string){
        this.logger.log('Updating one band social');
        const pattern = { cmd: 'updateBandSocial' };        
        const band = await this.client.send<number>(pattern, [bandId,socialId]);                
        if(band)
           return band;
        throw new HttpException('Band not modified',HttpStatus.NOT_FOUND);
    }

    @Delete(':bandId/social/:socialId')
    async DeleteSocialBand(@Param('bandId') bandId: string, @Param('socialId') socialId: string){
        this.logger.log('Deleting one band social');
        const pattern = { cmd: 'deleteBandSocial' };        
        const band = await this.client.send<number>(pattern, [bandId,socialId]);                
        if(band)
           return band;
        throw new HttpException('Band not modified',HttpStatus.NOT_FOUND);
    }
}
