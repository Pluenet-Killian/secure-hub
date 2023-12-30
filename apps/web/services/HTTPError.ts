export class HTTPError extends Error {
    statusCode: number;
    
    constructor(error: {statusCode: number; message: string}) {
        super(error.message);
        this.statusCode = error.statusCode;
    }
}