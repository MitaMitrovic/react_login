import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { cookieService } from "../cookies/cookieService";

const headers: Readonly<Record<string, string | boolean>> = {
    Accept: "application/json",
    "Content-Type": "application/json",
}

const injectToken = (config: AxiosRequestConfig): AxiosRequestConfig => {
    try {
        const token = cookieService.get('accessToken')

        if (token != null) {
            config.headers.Authorization = token
        }

        return config
    } catch (error: any) {
        throw new Error(error)
    }
};

class HttpClient {
    private instance: AxiosInstance | null = null

    private get http(): AxiosInstance {
        return this.instance != null ? this.instance : this.initHttp()
    }

    initHttp() {
        const http = axios.create({
            baseURL: process.env.REACT_APP_BASE_URL,
            headers
        })

        http.interceptors.request.use(injectToken, (error) => Promise.reject(error))

        http.interceptors.response.use(
            (response) => response,
            (error) => {
                const { response } = error
                return Promise.reject(response)
            }
        )

        this.instance = http
        return http
    }

    get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.http.get<T, R>(url, config)
    }

    post<T = any, R = AxiosResponse<T>>(
        url: string,
        data?: T,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.http.post<T, R>(url, data, config)
    }

}

export const httpClient = new HttpClient()