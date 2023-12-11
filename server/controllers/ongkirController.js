const baseUrlRajaOngkir = "https://api.rajaongkir.com/starter";
const axios = require("axios");

class ongkirController {
  static async fetchProvinces(req, res, next) {
    try {
      const { data } = await axios.get(baseUrlRajaOngkir + "/province", {
        headers: { key: process.env.KEYRAJAONGKIR },
      });
      res.status(200).json(data.rajaongkir.results);
    } catch (error) {
      next(error);
    }
  }
  static async fetchCities(req, res, next) {
    const idProvince = req.params.idProvince;
    console.log(idProvince, "ID PROVINSI");
    try {
      const { data } = await axios.get(
        baseUrlRajaOngkir + "/city?province=" + idProvince,
        {
          headers: { key:  process.env.KEYRAJAONGKIR},
        }
      );
      res.status(200).json(data.rajaongkir.results);
    } catch (error) {
      next(error);
    }
  }
  static async fetchCosts(req, res, next) {
    const { origin, destination, weight, courier } = req.body;
    console.log(
      origin,
      destination,
      weight,
      courier,
    );
    try {
      const { data } = await axios.post(
        baseUrlRajaOngkir + "/cost",
        { origin, destination, weight, courier },
        { headers: { key: process.env.KEYRAJAONGKIR } }
      );
      res.status(201).json(data.rajaongkir.results[0].costs);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = ongkirController;