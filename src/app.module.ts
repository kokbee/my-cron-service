import { CronModule } from '@modules/cron/cron.module'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [CronModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
