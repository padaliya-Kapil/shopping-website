const notFound = (req, res,next)=>{

    const error = new Error(`Not found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

const erroHandler = (err,req,res,next) =>{

    // to handle cases where we have error but status code is 200
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message : err.message,

        // If it is not in production we want stack trace
        stack : process.env.NODE_ENV === 'production' ? null : err.stack

    })

}

export {notFound,erroHandler}