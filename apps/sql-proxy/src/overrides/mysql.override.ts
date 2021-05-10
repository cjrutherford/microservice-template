import * as mysql from 'mysql';
import { Injectable } from '@nestjs/common';
import { FifoQueue } from '@common/common/utils/FlowControls/FifoQueue';
import { createJob, Job } from 'node-schedule';
import { ConfigService } from '@nestjs/config';
import { Retriable, withPromise } from '@common/common/utils/FlowControls';

export class MySqlCommand implements withPromise, Retriable {
    configs: string[];
    query: string;
    parameters: any[];
    resolve: Function;
    reject: Function;
    maxTries: number;
    retries: number = 0;
    get maxedOut(): boolean {
        return this.retries >= this.maxTries;
    }
}

export class MySqlConfig {
    name: string;
    config: mysql.PoolConfig;
    pool: mysql.Pool;
    fifo: FifoQueue<MySqlCommand>;
}


@Injectable()
export class MySqlConfigManager {
    constructor(private readonly appConfig: ConfigService) {
        this.sliceSize = this.appConfig.get('sliceSize') || 10;
    }
    configs: Map<string, MySqlConfig> = new Map<string, MySqlConfig>()
    schedule: Job;
    sliceSize: number;

    public queue(cmd: MySqlCommand) {
        const configs = [...this.configs.values()].filter(x => cmd.configs.includes(x.name));
        configs.map(c => c.fifo.add(cmd));
        configs.forEach(c => this.configs.set(c.name, c));
    }

    get queueSize() {
        return [...this.configs.values()].map(x => x.fifo.size).reduce((acc: number, value: number) => acc += value);
    }

    getConnections(...configNames: string[]) {
        return configNames.map(c => ([c, this.configs.get(c).pool]));
    }
    createConnectionPool = (config: mysql.PoolConfig, configName: string) => {
        const final: MySqlConfig = {
            name: configName,
            config, pool: mysql.createPool(config),
            fifo: new FifoQueue<MySqlCommand>()
        };
        this.configs.set(configName, final);
        this.schedule = createJob(this.appConfig.get('timerString'), this.processQueue);
        return final.name;
    }
    private processQueue(ts: Date) {
        const configs = this.configs.keys();
        while (this.queueSize > 0) {
            for (const c of configs) {
                const config = this.configs.get(c)
                const slice: MySqlCommand[] = config.fifo.get(this.sliceSize) as MySqlCommand[];
                slice.forEach(cmd => {
                    query(config.pool, cmd.query, cmd.parameters).then(results => {
                        cmd.resolve(results);
                    }).catch(err => {
                        if (cmd.retries <= cmd.maxTries) {
                            cmd.retries++;
                            config.fifo.retry(cmd);
                        } else {
                            cmd.reject(err);
                        }
                    });
                });
            }
        }
    }
}


export const query = (connection: mysql.Pool, query: string, params: any[]) => {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });
}




