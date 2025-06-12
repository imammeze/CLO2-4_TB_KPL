import { body, validationResult } from "express-validator";

// Aturan validasi untuk membuat dan mengupdate tenant
export const tenantValidationRules = () => {
  return [
    body("name")
      .isString()
      .notEmpty()
      .withMessage("Name is required and must be a string."),
    body("phone")
      .isString()
      .notEmpty()
      .withMessage("Phone is required.")
      .isLength({ min: 10, max: 15 })
      .withMessage("Phone number must be between 10 and 15 characters."),
    body("room_number")
      .isString()
      .notEmpty()
      .withMessage("Room number is required."),
  ];
};

// Middleware untuk mengecek hasil validasi
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(422).json({
    message: "Validation failed",
    errors: extractedErrors,
  });
};
