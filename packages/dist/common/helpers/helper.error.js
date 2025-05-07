"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackendError = void 0;
class BackendError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
    }
}
exports.BackendError = BackendError;
