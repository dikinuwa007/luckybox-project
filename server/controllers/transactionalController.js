const { Transactional, Testimonial } = require("../models");
const axios = require("axios");
class transactionalController {
  static async saveTransactional(req, res, next) {
    const { order_id, gross_amount, transaction_time, payment_type, email } =
      req.body;
    try {
      const sT = await Transactional.create({
        order_id,
        gross_amount,
        transaction_time,
        payment_type,
        email,
      });
      res.status(201).json(sT);
    } catch (error) {
      next(error);
    }
  }
  static async saveTestimonial(req, res, next) {
    const { description, imagebase64, email } = req.body;
    let image_url=''
    try {
      const fT = await Transactional.findOne({
        where: { email, isTestimonial: "false" },
        order: [["id", "DESC"]],
      });
      if (!fT) {
        throw { name: "nottransactional" };
      }
      if(imagebase64){
      const {data} = await axios.post(
        "https://api.imgbb.com/1/upload?key="+process.env.KEYIMAGEBB,
        {image:imagebase64},
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      image_url = data.data.url
      }
      const sT = await Testimonial.create({email,description,image_url});
      const uT = await Transactional.update({isTestimonial:'true'},{where:{email,isTestimonial:'false',id:fT.id}})
      res.status(201).json(sT);
    } catch (error) {
      next(error);
    }
  }
  static async fetchTestimonial(req, res, next) {
    const { page } = req.query;
    let paramQuerySQL = {};
    let limit;
    let offset;

    if (page !== "" && typeof page !== "undefined") {
      if (page.size != "" && typeof page.size !== "undefined") {
        limit = page.size;
        paramQuerySQL.limit = limit;
      }
      if (page.number !== "" && typeof page !== "undefined") {
        paramQuerySQL.order = [["id", "DESC"]];
        offset = page.number * limit - limit;
        paramQuerySQL.offset = offset;
      }
    } else {
      paramQuerySQL = {}
    }
    try {
      const fT = await Testimonial.findAll(paramQuerySQL);
      res.status(200).json(fT);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = transactionalController;
