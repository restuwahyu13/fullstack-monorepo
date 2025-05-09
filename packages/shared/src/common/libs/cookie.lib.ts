import js, { CookieAttributes } from 'js-cookie'

export class Cookie {
	static set(key: string, value: string, options?: CookieAttributes): boolean {
		if (!Cookie.get(key)?.length) {
			js.set(key, value, options)
			return true
		}

		js.remove(key)
		js.set(key, value, options)

		return true
	}

	static get(key: string): string | undefined {
		return js.get(key)
	}

	static remove(key: string): boolean {
		if (Cookie.get(key)?.length) {
			js.remove(key)
			return true
		}

		return false
	}
}
