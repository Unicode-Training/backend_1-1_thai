export interface IHttpException extends Error {
    status?: number;
    errors?: any;
}
export class HttpException extends Error implements IHttpException {
    public status?: number;
    public errors?: any;
    constructor(message: string, status: number = 500, errors: any = null) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
}