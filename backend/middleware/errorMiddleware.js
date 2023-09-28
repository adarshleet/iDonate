const notFound = (req,res,next) =>{
    const error = new Error('not found')
    res.status(404)
    next(error)
}

const errorHandler = (err,req,res,next)=>{
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode
    let message = err.message

    if(err.name == 'CastError' &&  err.kind==='objectId'){
        statusCode = 404;
        message = 'Resourse not found'
    }

    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? 'Sorry, an error occurred.' : err.stack,
    });
}

export {notFound,errorHandler}