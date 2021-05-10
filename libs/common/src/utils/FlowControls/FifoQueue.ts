import { RetryQueue, Retriable } from '.';
export class FifoQueue<Retriable> implements RetryQueue<Retriable>{
    members: Retriable[];
    add(...t: Retriable[]): void {
        this.members.push(...t);
    }
    get(count: number): Retriable[] {
        return this.members.splice(0, count);
    }
    get size() {
        return this.members.length;
    }
    retry(t: Retriable): void {
        this.add(t);
    }
}