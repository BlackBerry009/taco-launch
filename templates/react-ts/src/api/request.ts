import { BaseRequest } from './baseRequest';

class BaseApi extends BaseRequest {
    protected defaultPrefix: string = 'http://localhost:5173';
}

export const request = new BaseApi();


