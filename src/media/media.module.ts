import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';

@Module({
  imports:[
    //TypeOrmModule.forFeature([MediaEntity]),
  ],
  controllers: [MediaController],
  providers: []
})
export class MediaModule {}
