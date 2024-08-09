export const errorHandle = (statusCode , message) => {

    const error = new Error()
    error.statusCode = statusCode;
    // console.log(message);
    error.message = message
    // console.log(error);
    return error;

}