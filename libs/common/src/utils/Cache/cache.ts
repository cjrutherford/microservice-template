export interface Cache<T> {
    get(key: string): T | Promise<T>;
    set(key: string, value: T): boolean | Promise<boolean>;
    keys(): string[];
    del(key: string): void;
    values(): T[] | Promise<T[]>;
}