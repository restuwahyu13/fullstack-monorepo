import { Cluster } from 'node:cluster';
export declare class MultiThread {
    nodecluster: Cluster;
    private cpus;
    private event;
    constructor();
    cluster(singleThread: boolean, handler: Function): void;
}
