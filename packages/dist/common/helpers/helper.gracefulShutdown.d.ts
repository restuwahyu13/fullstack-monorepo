import { Express } from 'express';
export declare class GracefulShutdown {
    private multiThread;
    private connection;
    private env;
    private port;
    private singleThread;
    private gracefulShutdownTimer;
    private signals;
    constructor(env: string, port: number, single_tread: boolean);
    private close;
    private sleep;
    listen(app: Express): void;
}
