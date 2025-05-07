"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GracefulShutdown = void 0;
const tslib_1 = require("tslib");
const node_http_1 = tslib_1.__importDefault(require("node:http"));
const node_net_1 = require("node:net");
const consola_1 = tslib_1.__importDefault(require("consola"));
const helper_multiThread_1 = require("../../common/helpers/helper.multiThread");
class GracefulShutdown {
    constructor(env, port, single_tread) {
        this.multiThread = new helper_multiThread_1.MultiThread();
        this.connection = new Map();
        this.env = env;
        this.port = port;
        this.singleThread = single_tread;
        this.gracefulShutdownTimer = this.env === 'development' ? 3000 : 5000;
        this.signals = ['SIGTERM', 'SIGINT', 'SIGQUIT', 'SIGHUP', 'SIGABRT', 'SIGALRM', 'SIGUSR1', 'SIGUSR2'];
    }
    close(server, signal) {
        const socket = this.connection.get('connection');
        if (!socket?.closed)
            socket?.destroy();
        server.close(async (err) => {
            await this.sleep(this.gracefulShutdownTimer);
            this.connection.clear();
            if (!err) {
                console.info(`Server Closed Without Error: ${err}`);
                console.info('Gracefull shutdown successfully');
                process.removeAllListeners();
                process.kill(process.pid, signal);
                process.exit(0);
            }
            else {
                console.info(`Server Closed With Error: ${err}`);
                console.info('Gracefull shutdown successfully');
                process.removeAllListeners();
                process.kill(process.pid, signal);
                process.exit(1);
            }
        });
    }
    async sleep(timer) {
        await new Promise((resolve) => setTimeout(resolve, timer));
    }
    listen(app) {
        const server = node_http_1.default.createServer(app);
        server.on('connection', (socket) => {
            console.info('Server Connection Established');
            if (socket)
                this.connection.set('connection', socket);
            else
                socket.destroy();
        });
        server.on('request', (req, _res) => {
            const socketRequest = req.socket;
            const socketConnection = this.connection.get('connection');
            if (!(socketRequest instanceof node_net_1.Socket) || !(socketConnection instanceof node_net_1.Socket)) {
                this.connection.clear();
                this.connection.set('connection', socketRequest);
            }
        });
        this.signals.forEach((event) => {
            if (this.env === 'development') {
                process.on(event, async (signal) => {
                    console.info(`Server ${this.env} received signal: ${signal}`);
                    if (this.singleThread) {
                        this.multiThread.nodecluster.disconnect();
                    }
                    await this.close(server, signal);
                });
            }
            else {
                process.on(event, async (signal) => {
                    console.info(`Server ${this.env} received signal: ${signal}`);
                    if (this.singleThread) {
                        this.multiThread.nodecluster.disconnect();
                    }
                    await this.close(server, signal);
                });
            }
        });
        this.multiThread.cluster(this.singleThread, () => {
            const serverInfo = `Server is running on port ${this.port}`;
            server.listen(this.port, () => consola_1.default.info(serverInfo));
        });
    }
}
exports.GracefulShutdown = GracefulShutdown;
