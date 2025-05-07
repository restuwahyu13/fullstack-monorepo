"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDTO = exports.CreateUserDTO = exports.QueryUserDTO = exports.ParamsUserIdDTO = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const common_dto_1 = require("../../domain/dtos/common.dto");
class ParamsUserIdDTO {
}
exports.ParamsUserIdDTO = ParamsUserIdDTO;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBase64)(),
    tslib_1.__metadata("design:type", String)
], ParamsUserIdDTO.prototype, "id", void 0);
class QueryUserDTO extends common_dto_1.CommonFilterQueryDTO {
}
exports.QueryUserDTO = QueryUserDTO;
class CreateUserDTO {
}
exports.CreateUserDTO = CreateUserDTO;
tslib_1.__decorate([
    (0, class_validator_1.IsDecimal)({ force_decimal: true }),
    tslib_1.__metadata("design:type", String)
], CreateUserDTO.prototype, "totalAverageWeightRatings", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)({ allowInfinity: false, allowNaN: false }),
    tslib_1.__metadata("design:type", Number)
], CreateUserDTO.prototype, "numberOfRents", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ allowInfinity: false, allowNaN: false }),
    tslib_1.__metadata("design:type", Number)
], CreateUserDTO.prototype, "recentlyActive", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)({ allowInfinity: false, allowNaN: false }),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], CreateUserDTO.prototype, "highPriority", void 0);
class UpdateUserDTO {
}
exports.UpdateUserDTO = UpdateUserDTO;
tslib_1.__decorate([
    (0, class_validator_1.IsDecimal)({ force_decimal: true }),
    tslib_1.__metadata("design:type", String)
], UpdateUserDTO.prototype, "totalAverageWeightRatings", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)({ allowInfinity: false, allowNaN: false }),
    tslib_1.__metadata("design:type", Number)
], UpdateUserDTO.prototype, "numberOfRents", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ allowInfinity: false, allowNaN: false }),
    tslib_1.__metadata("design:type", Number)
], UpdateUserDTO.prototype, "recentlyActive", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)({ allowInfinity: false, allowNaN: false }),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], UpdateUserDTO.prototype, "highPriority", void 0);
