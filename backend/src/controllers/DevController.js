const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");
const { findConnections, sendMessage } = require("../websocket");

//controller possui 5 funcoes: index, show, store, update, destroy

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();
    return response.json(devs);
  },

  async store(request, response) {
    const { github_user, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_user });

    if (!dev) {
      const ApiResponse = await axios.get(
        `https://api.github.com/users/${github_user}`
      );
      //continuar apos receber a resposta
      const { name = login, avatar_url, bio } = ApiResponse.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_user,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });

      //Filtrar as conexoes e satisfazer as codicoes de distancia e techs
      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray
      );
      sendMessage(sendSocketMessageTo, "new-dev", dev);
    }

    return response.json(dev);
  }
};
