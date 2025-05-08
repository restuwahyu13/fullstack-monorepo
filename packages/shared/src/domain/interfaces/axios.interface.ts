import { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { HttpClientType } from '~/domain/enums/axios.enum'

export interface HttpClientRequestOptions extends AxiosRequestConfig {
	path?: string
	type?: HttpClientType
}

export interface HttpClientInterceptor {
	handlerReq?: (value: InternalAxiosRequestConfig<any>) => InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>>
	handlerRes?: (value: AxiosResponse<any, any>) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>
}

export interface HttpClientResponse {
	code: number
	data?: any
	error?: any
}
