let handelGlobalError = (err, req, res, next) => {
  res
    .status(err.statusCode)
    .json(
      process.env.MOOD === "dev"
        ? { message: "error", error: err.message, stack: err.stack }
        : { message: "error", error: err.message }
    );
};

export default handelGlobalError;
