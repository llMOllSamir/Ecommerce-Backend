export default class AppError extends Error{
    constructor(message,status){
        super(message)
        this.statusCode=status
    }
}