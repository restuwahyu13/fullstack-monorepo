import { CommonFilterQueryDTO } from '../../domain/dtos/common.dto';
export declare class ParamsUserIdDTO {
    id: string;
}
export declare class QueryUserDTO extends CommonFilterQueryDTO {
    filter?: any;
}
export declare class CreateUserDTO {
    totalAverageWeightRatings: string;
    numberOfRents: number;
    recentlyActive: number;
    highPriority: number;
}
export declare class UpdateUserDTO {
    totalAverageWeightRatings: string;
    numberOfRents: number;
    recentlyActive: number;
    highPriority: number;
}
