function validationSchema(schema) {
  return (req, res, next) => {
    try {
      const { query, params, body } = req;
      const { error } = schema.validate(
        { query, params, body },
        { abortEarly: false, convert: true }
      );
      if (error) {
        const ErrMsg = error.details.map((err) => err.message);

        return res.status(400).json({ message: ErrMsg });
      }
      next();
    } catch (error) {
      console.log(`errror in validation :: ${error.message}`);
      next(error);
    }
  };
}

module.exports = {
  validationSchema,
};
