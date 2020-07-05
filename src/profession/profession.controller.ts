import { Controller, Get, Post, Body, HttpException, HttpStatus, Param, Logger, Patch, Delete, Query} from '@nestjs/common';
import { ProfessionDto } from '../dtos/profession.dto';
import { ApiCreatedResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@ApiTags('profession')
@Controller('profession')
export class ProfessionController {
    client: ClientProxy;
    logger = new Logger('Profession');
    constructor()
    {

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
    async findAllProfession(@Query('limit') limit=10,@Query('offset') offset=0){
        this.logger.log('Getting all professions');
        const pattern = { cmd: 'getProfession' };
        const profession = await this.client.send(pattern, [limit,offset]);
        if(profession)
            return profession;
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    @Post()
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: ProfessionDto,
      })
    async createProfession(@Body() professionDto: ProfessionDto){
        const profession = await this.client.send<ProfessionDto>({cmd: 'addProfession'},professionDto);
        if(profession)
            return profession;
        throw new HttpException('Profession not created',HttpStatus.NOT_MODIFIED); 
    }

    @Get(':professionId')
    async findOneProfession(@Param('professionId') professionId: string){
        Logger.log('La profession dont l"id est '+professionId,'ProfessionController');
        const pattern = { cmd: 'getProfessionById' };
        const profession = await this.client.send<number>(pattern, professionId);  
        if(profession)
            return profession;
        throw new HttpException('Profession not found',HttpStatus.NOT_FOUND);        
    }

    @Patch(':professionId')
    async updateProfession(@Param('professionId') professionId: string, @Body() professionDto: ProfessionDto){
        const profession = await this.client.send<number>({cmd: 'updateProfession'},[professionId,professionDto]);
        if(profession)
            return profession;
        throw new HttpException('Profession not modified',HttpStatus.NOT_FOUND);
    }

    @Delete(':professionId')
    async removeProfession(@Param('professionId') professionId: string){
        const profession = await this.client.send<number>({cmd: 'deleteProfession'},professionId);
        if(profession)
            return profession;
         throw new HttpException('Profession not modified',HttpStatus.NOT_FOUND);
    }
}
