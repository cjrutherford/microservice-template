export interface Retriable {
    retries: number;
    maxTries: number;
    maxedOut?: boolean;
}