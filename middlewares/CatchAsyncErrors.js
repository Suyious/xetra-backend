// Below is a function Returning another function
module.exports = (AsyncErrorParamFunction) => (req, res, next) => {
  Promise.resolve(AsyncErrorParamFunction(req, res, next)).catch(next);
};
