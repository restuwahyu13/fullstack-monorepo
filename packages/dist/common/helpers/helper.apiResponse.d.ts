import { Response } from 'express';
export interface ApiResponse {
    stat_code: number;
    message?: string;
    err_code?: string;
    error?: any;
    errors?: any;
    data?: any;
    pagination?: Record<string, any>;
}
export declare const apiResponse: <T = any>(options: Partial<ApiResponse>, res?: Response) => T;
