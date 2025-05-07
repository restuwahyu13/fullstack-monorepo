"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiResponse = void 0;
const tslib_1 = require("tslib");
const node_http_1 = require("node:http");
const consola_1 = tslib_1.__importDefault(require("consola"));
const http_status_codes_1 = require("http-status-codes");
const apiResponse = (options, res) => {
    const apiResponse = {};
    const errCode = 'GENERAL_ERROR';
    const errMessage = 'Application is busy please try again later!';
    if (options instanceof Error) {
        consola_1.default.error(`
==================================
======== Error Exception =========
==================================

	name: ${options.name}
	message: ${options.message}
	stack: ${options.stack}

==================================
==================================
==================================
		`);
    }
    options.stat_code = options.stat_code ?? http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    if (!options.stat_code && !options.message && !options.error) {
        options.err_code = errCode;
        options.error = errMessage;
    }
    else if (options?.errors || options instanceof Error) {
        apiResponse.stat_code = options.stat_code;
        apiResponse.err_code = errCode;
        apiResponse.error = errMessage;
        if (options?.errors) {
            delete apiResponse.stat_code;
            delete apiResponse.err_code;
            delete apiResponse.error;
            apiResponse.errors = options.errors;
        }
        options = apiResponse;
    }
    for (const i of Object.keys(options)) {
        if (options[i] === undefined) {
            delete options[i];
        }
    }
    if (res instanceof node_http_1.OutgoingMessage) {
        return res.status(!options?.errors ? options.stat_code : http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).json({ ...options });
    }
    return { ...options };
};
exports.apiResponse = apiResponse;
