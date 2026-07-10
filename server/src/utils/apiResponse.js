/**
 * 
 * @param {Object} res 
 * @param {Number} statusCode 
 * @param {String} message 
 * @param {Any} data 
 * @param {Object} meta 
 * 
 */
const apiResponse = (res, statusCode, message, data = null, meta = null) => {
  const responsePayload = {
    success: statusCode < 400,
    message,
    timestamp: new Date().toISOString(), 
    data,
  };

  if (meta) {
    responsePayload.meta = meta;
  }

  return res.status(statusCode).json(responsePayload);
};

module.exports = apiResponse;