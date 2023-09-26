const { env: ENV } = process

export const config = {
  env: ENV.NODE_ENV ?? 'local',
  port: ENV.NODE_PORT ?? 17777,
}

export const CronExpression= {
  EVERY_SECONDS: {
    SECOND_1: '1 * * * * *',
    SECOND_15: '15 * * * * *',
    SECOND_30: '30 * * * * *',
    SECOND_45: '45 * * * * *'
  }
}
