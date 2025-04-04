const { stack } = require("../app");
const ErrorHandler = require("../utils/errorHandler");

module.exports=(err,req,res,next)=>{
    err.statusCode = err.statusCode;

    if(process.env.NODE_ENV == 'development'){
        
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        stack: err.stack,
        error: err
    })

    }
    if(process.env.NODE_ENV == 'production'){
        let message = err.message;
        let error = new Error(message);

        if(err.name == "ValidationError"){
            message = Object.values(err.errors).map(value => value.message).join(", ");
            error = new ErrorHandler(message, 400);
        }
        if(err.name == "CastError"){
            message = `Resource not found. Invalid: ${err.path}`;
            error = new ErrorHandler(message, 400);
        }


        res.status(err.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error'
           
        })

    }


}