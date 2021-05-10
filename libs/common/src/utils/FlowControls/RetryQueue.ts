import { Retriable } from "./retriable";

export interface RetryQueue<Retriable>{
    members: Retriable[];
    retry(t:Retriable):void;
}