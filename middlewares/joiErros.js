import { isCelebrate } from 'celebrate';

const joiErrors = () => (err, req, res, next) => {
  if (!isCelebrate(err)) return next(err);
  return res.status(400).json({
    success: false,
    errFields: err.message.split('\"').join('') || undefined,
  });
};

export default joiErrors;