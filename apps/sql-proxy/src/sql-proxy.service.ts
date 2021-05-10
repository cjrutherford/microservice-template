import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PoolConfig } from 'mysql';
import { getConnection, MySqlConfigManager, MySqlConfig } from './overrides';
import { MySqlCommand } from './overrides/mysql.override';

@Injectable()
export class SqlProxyService {
  constructor(private readonly mysqlConfigs: MySqlConfigManager, private readonly configService: ConfigService) { }
  processQuery(configs: string[], query: string, params: any[]) {
    return new Promise((resolve, reject) => {
      const tries: number = this.configService.get<number>('maxTries') || 10;
      const cmd: MySqlCommand = {
        ...new MySqlCommand(), resolve, reject, configs, parameters: params, query, retries: 0, maxTries: tries, maxedOut: false
      }
      this.mysqlConfigs.queue(cmd);
    });
  }

  createConfiguration(config: PoolConfig, name: string) {
    return new Promise((resolve, reject) => {
      const savedName = this.mysqlConfigs.createConnectionPool(config, name);
      resolve(savedName);
    });
  }

  getConfigurations(): { name: string, details: PoolConfig }[] {
    return [...this.mysqlConfigs.configs.values()].map(x => ({ name: x.name, details: x.config }));
  }
}
