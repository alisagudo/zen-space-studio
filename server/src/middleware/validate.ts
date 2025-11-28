import { ZodTypeAny } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: "Invalid request", details: result.error.format() });
  }
  // assign parsed/coerced data back to body
  req.body = result.data as any;
  next();
};

export default validate;
