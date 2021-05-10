import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MySqlConfigManager } from './overrides';
import { SqlProxyController } from './sql-proxy.controller';
import { SqlProxyService } from './sql-proxy.service';
import {sqlConfig} from './overrides/sqlConfig'

@Module({
  imports: [ConfigModule.forRoot({load: [sqlConfig]})],
  controllers: [SqlProxyController],
  providers: [SqlProxyService, MySqlConfigManager],
})
export class SqlProxyModule {}
