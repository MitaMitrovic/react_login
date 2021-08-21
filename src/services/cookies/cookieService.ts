import cookie from "cookie_js"

class CookieService {
    get(key: string): string {
        return cookie.get(key)
    }

    set(key: string, value: string, options?: string): void {
        cookie.set(key, value, options)
    }

    remove(key: string): void {
        cookie.remove(key)
    }
}

export const cookieService = new CookieService()