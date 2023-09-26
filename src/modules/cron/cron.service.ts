import { CronExpression } from '@modules/shared/config'
import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'

@Injectable()
export class CronService {
  @Cron(CronExpression.EVERY_SECONDS.SECOND_30)
  handleCron(): void {
    console.log(`${new Date().toISOString()} 매 분 30초에 실행됩니다.`)
  }
}
