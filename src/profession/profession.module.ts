import { Module } from '@nestjs/common';
import { ProfessionController } from './profession.controller';

@Module({
  imports:[
    //TypeOrmModule.forFeature([ProfessionEntity]),
  ],
  controllers: [ProfessionController],
  providers: []
})
export class ProfessionModule {}
