// Middleware to parse zod schema
export const zodMiddleware = (schema) => (req, res, next) => {
  try {
    let data = {};
    if (req.query) {
      data = { ...data, ...req.query };
    }
    if (req.params) {
      data = { ...data, ...req.params };
    }
    if (req.body) {
      data = { ...data, ...req.body };
    }
    const result = schema.safeParse(data);
    if (!result.success) {
      return res.status(400).json({ message: result.error.errors?.[0].message });
    }
    next();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
