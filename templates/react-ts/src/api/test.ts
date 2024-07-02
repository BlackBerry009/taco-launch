import { request } from "./request"

export const sayHello = () => {
    return request.get('/hello')
}