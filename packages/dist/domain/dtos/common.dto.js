"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonFilterQueryDTO = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const common_enum_1 = require("../../domain/enums/common.enum");
class CommonFilterQueryDTO {
}
exports.CommonFilterQueryDTO = CommonFilterQueryDTO;
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    tslib_1.__metadata("design:type", Number)
], CommonFilterQueryDTO.prototype, "page", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    tslib_1.__metadata("design:type", Number)
], CommonFilterQueryDTO.prototype, "limit", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CommonFilterQueryDTO.prototype, "search", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(common_enum_1.ESortQuery),
    tslib_1.__metadata("design:type", String)
], CommonFilterQueryDTO.prototype, "sort", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", Object)
], CommonFilterQueryDTO.prototype, "sort_by", void 0);
