export const authBearer = (token: string) => ({
	Authorization: `Bearer ${token}`
})

export const xRequestToken = (token: string) => ({
	'X-Request-Token': token
})
