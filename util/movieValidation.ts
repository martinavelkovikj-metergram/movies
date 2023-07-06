import { body, validationResult, ValidationChain } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateMovieFields: ValidationChain[] = [
  body("Title").isAlpha().withMessage("Title must be alphabetic"),
  body("Type").isAlpha().withMessage("Type must be alphabetic"),
];

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};
