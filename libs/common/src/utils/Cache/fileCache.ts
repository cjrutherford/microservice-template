import { Cache } from '.';
import * as Keyv from 'keyv'
import { KeyvFile } from 'keyv-file';

export class FileCache<T> implements Cache<T>{

    constructor(name: string, ttl?: number) {
        this.cache = new Keyv({
            store: new KeyvFile({
                filename: `./cache/${name}.json`,
                encode: JSON.stringify,
                decode: JSON.parse
            })
        });
    }
    del(key: string): void {
        const index = this.memberKeys.indexOf(key);
        this.memberKeys.splice(index, 1);
        this.cache.delete(key);
    }

    async get(key: string): Promise<T> {
        return await this.cache.get(key);
    }
    async set(key: string, value: T): Promise<boolean> {
        if (!this.memberKeys.includes(key)) {
            this.memberKeys.push(key);
        }
        return await this.cache.set(key, value)
    }
    keys(): string[] {
        return this.memberKeys;
    }
    async values(): Promise<T[]> {
        const keyPromises: Promise<T>[] = [];
        this.memberKeys.forEach(m => keyPromises.push(this.get(m)));
        const values = await Promise.all(keyPromises);
        return values;
    }
    private memberKeys: string[] = [];
    private cache: Keyv;
}