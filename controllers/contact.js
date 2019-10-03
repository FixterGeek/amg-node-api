const axios = require('axios');

const controller = {};

controller.recapcha = async (request, response) => {
  const { body } = request;
  const secret = process.env.GOOGLE_RECAPCHA_SECRET;

  axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${body.response}`)
    .then(({ data }) => {
      if (!data.success) response.status(400).json(data);
      response.status(200).json(data);
    })
    .catch(({ response }) => {
      response.status(400).json(response)
    });
};

module.exports = controller;
