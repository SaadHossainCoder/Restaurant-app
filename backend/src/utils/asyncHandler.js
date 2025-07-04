const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((err) => {
            console.error(err);
            res.status(err.status || 500).json({
                success: false,
                message: err.message || "Internal Server Error",
                stack: 500,
            });
            next(err);
        });
    };
};
export { asyncHandler };