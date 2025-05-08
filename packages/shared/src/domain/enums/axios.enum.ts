export enum HttpClientMethod {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
	PATCH = 'PATCH'
}

export enum HttpClientType {
	BODY = 'body',
	PARAMS = 'params',
	QUERY = 'query'
}

export enum HttpClientAdapterType {
	HTTP = 'http',
	FETCH = 'fetch',
	XHR = 'xhr'
}
