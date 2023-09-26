import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { config } from '@modules/shared/config'

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule, { logger: ['error', 'warn'] })
  await app.listen(config.port, '0.0.0.0')

  console.log(`[${new Date().toISOString()}] Server listening on - PORT: "${config.port}", SERVER: "${config.env}"`)
}
void bootstrap()
