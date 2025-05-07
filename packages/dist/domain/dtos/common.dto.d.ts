import { ESortQuery } from '../../domain/enums/common.enum';
export declare class CommonFilterQueryDTO {
    page?: number;
    limit?: number;
    search?: string;
    sort?: ESortQuery;
    sort_by?: any;
}
