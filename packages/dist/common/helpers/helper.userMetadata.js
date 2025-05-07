"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMetadata = void 0;
const tslib_1 = require("tslib");
const helper_di_1 = require("../../common/helpers/helper.di");
let UserMetadata = class UserMetadata {
    user() {
        return helper_di_1.Container.resolve('User');
    }
};
exports.UserMetadata = UserMetadata;
exports.UserMetadata = UserMetadata = tslib_1.__decorate([
    (0, helper_di_1.Injectable)()
], UserMetadata);
