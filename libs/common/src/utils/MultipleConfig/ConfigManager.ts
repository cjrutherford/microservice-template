import {Config} from '.';

export class ConfigManager<T>{
    configs: Map<string, T> = new Map<string,T>();
    addConfiguration(config: T){
        this.configs.set(config.name, config);
    }
    getConfig(...configNames: string[]): T[]{
        return configNames.map(c => this.configs.get(c));
    }
}