"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const tslib_1 = require("tslib");
const consola_1 = tslib_1.__importDefault(require("consola"));
const logger = (src, type) => {
    switch (type) {
        case 'error':
            consola_1.default.error(`
          ==================================
          ======== Error Exception =========
          ==================================

              name: ${src.name}
              message: ${src.message}
              stack: ${src.stack}

          ==================================
          ==================================
          ==================================
       `);
            break;
        case 'debug':
            consola_1.default.debug(`
          ==================================
          ======== Logger Debug =========
          ==================================

            content: ${JSON.stringify(src) || src}

          ==================================
          ==================================
          ==================================
       `);
            break;
        case 'info':
            consola_1.default.info(`
          ==================================
          ======== Logger Info =========
          ==================================

            content: ${JSON.stringify(src) || src}

          ==================================
          ==================================
          ==================================
       `);
            break;
        case 'wanr':
            consola_1.default.warn(`
          ==================================
          ======== Logger Warn =========
          ==================================

            content: ${JSON.stringify(src) || src}

          ==================================
          ==================================
          ==================================
       `);
            break;
        default:
            consola_1.default.log(`
          ==================================
          ======== Logger Log =========
          ==================================

            content: ${JSON.stringify(src) || src}

          ==================================
          ==================================
          ==================================
       `);
            break;
    }
};
exports.logger = logger;
