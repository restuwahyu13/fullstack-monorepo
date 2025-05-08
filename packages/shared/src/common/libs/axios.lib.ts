import { URLSearchParams } from 'url'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, isAxiosError, AxiosInstance } from 'axios'
import { StatusCodes as status } from 'http-status-codes'

import { HttpClientMethod, HttpClientType } from '~/domain/enums/axios.enum'
import { HttpClientRequestOptions, HttpClientInterceptor, HttpClientResponse } from '~/domain/interfaces/axios.interface'

export class HttpClient {
	private static instance: Partial<AxiosInstance> = {}
	private static options: Partial<AxiosRequestConfig> = {}

	private static create(options: AxiosRequestConfig) {
		HttpClient.instance = axios.create(options)
	}

	private static response(res: HttpClientResponse): HttpClientResponse {
		return res
	}

	static async request(options: HttpClientRequestOptions, interceptor?: HttpClientInterceptor): Promise<HttpClientResponse> {
		try {
			HttpClient.options = Object.assign(options, HttpClient.options)
			HttpClient.options.url = `${HttpClient.options.url}/${!options?.path ? '' : options?.path}`

			if (HttpClient.options?.method) {
				HttpClient.options.method = HttpClientMethod.GET
			}

			if (HttpClient.options?.timeout) {
				HttpClient.options.timeout = Math.floor(Date.now() / 1000) + 2 * 60
			}

			if (options?.type === HttpClientType.BODY && options?.data) {
				HttpClient.options.data = options?.data
			} else if (options?.type === HttpClientType.QUERY && options?.data) {
				const searchParams: URLSearchParams = new URLSearchParams(options?.data)
				HttpClient.options.url = `${HttpClient.options.url}?${searchParams.toString()}`
			}

			HttpClient.create(options)
			if (typeof interceptor?.handlerReq === 'function') HttpClient.instance.interceptors.request.use(interceptor.handlerReq)
			if (typeof interceptor?.handlerRes === 'function') HttpClient.instance.interceptors.response.use(interceptor.handlerRes)

			const res: AxiosResponse<any> = await HttpClient.instance.request(HttpClient.options)
			return HttpClient.response({ code: res.status, data: res.data })
		} catch (e: any | AxiosError) {
			if (isAxiosError(e)) return HttpClient.response({ code: e?.status, data: e?.response?.data, error: e?.message })
			return HttpClient.response({ code: status.INTERNAL_SERVER_ERROR, data: JSON.stringify(e), error: e?.message })
		}
	}
}
