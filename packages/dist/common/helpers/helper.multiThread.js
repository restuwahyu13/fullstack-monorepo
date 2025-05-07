"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiThread = void 0;
const tslib_1 = require("tslib");
const node_os_1 = tslib_1.__importDefault(require("node:os"));
const node_cluster_1 = tslib_1.__importStar(require("node:cluster"));
const node_events_1 = require("node:events");
const consola_1 = tslib_1.__importDefault(require("consola"));
class MultiThread {
    constructor() {
        this.cpus = node_os_1.default.cpus().length / 2;
        this.nodecluster = node_cluster_1.default;
        this.event = new node_events_1.EventEmitter();
        this.cpus = this.cpus < 1 ? 1 : this.cpus;
    }
    cluster(singleThread, handler) {
        if (!singleThread && node_cluster_1.default.isPrimary) {
            for (let i = 1; i <= this.cpus; i++) {
                this.nodecluster.fork();
            }
            this.event.on('workers', (args) => {
                if (args) {
                    if (args.isDead()) {
                        args.send(args);
                    }
                    else {
                        args.send(`Worker id ${args.id} is online with pid ${args.process.pid}`);
                    }
                }
            });
            this.nodecluster.on('online', (worker) => {
                consola_1.default.info(`Worker id ${worker.id} is online`);
                this.event.emit('workers', worker);
            });
            this.nodecluster.on('exit', (code, signal) => {
                consola_1.default.info(`Worker has teminated received code ${code.id} and signal ${signal}`);
                for (let i = 1; i <= this.cpus; i++) {
                    this.nodecluster.fork();
                }
            });
        }
        else if (!singleThread && node_cluster_1.default.isWorker) {
            process.on('message', (msg) => {
                if (msg instanceof node_cluster_1.Worker) {
                    consola_1.default.info(`Worker id ${msg.worker.id} and process pid ${msg.worker.process.pid} has teminated`);
                    msg.worker.kill();
                }
                else {
                    console.info(msg);
                }
            });
            handler();
        }
        else {
            handler();
        }
    }
}
exports.MultiThread = MultiThread;
