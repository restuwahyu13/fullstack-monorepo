"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestMetadata = void 0;
const tslib_1 = require("tslib");
const helper_di_1 = require("../../common/helpers/helper.di");
let RequestMetadata = class RequestMetadata {
    req() {
        return helper_di_1.Container.resolve('Req');
    }
};
exports.RequestMetadata = RequestMetadata;
exports.RequestMetadata = RequestMetadata = tslib_1.__decorate([
    (0, helper_di_1.Injectable)()
], RequestMetadata);
