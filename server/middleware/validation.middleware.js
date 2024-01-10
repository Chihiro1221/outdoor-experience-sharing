const { body, validationResult } = require('express-validator');

const validationRequestParams = (req, res, next) => {
  const errors = validationResult(req);
  // 如果校验出现错误直接返回异常
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validationRequestParams,
};
