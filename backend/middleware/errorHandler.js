const errorHandler = (err, req, res, next) => {
  // Ambil statusCode dari error jika ada, jika tidak default ke 500 (Internal Server Error)
  const statusCode = err.statusCode || 500;

  console.error(err.stack); // Log error untuk debugging

  res.status(statusCode).json({
    message: err.message || "An unexpected error occurred",
    // Hanya tampilkan stack trace jika sedang dalam mode development
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorHandler;
