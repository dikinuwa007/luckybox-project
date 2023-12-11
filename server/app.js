if (process.env.NODE_ENV !== 'production') {
require('dotenv').config();
}
const express = require("express");
const app = express();
const PORT = process.env.PORT||3000;
const cors = require("cors");
const { default: axios } = require("axios");
const ongkirController = require('./controllers/ongkirController')
const paymentController = require('./controllers/paymentController')
const transactionalController = require('./controllers/transactionalController')
const {errorHandler} = require('./helpers/errorHandler')
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json({limit:'50mb'}));

app.get("/provinces", ongkirController.fetchProvinces);
app.get("/:idProvince/cities", ongkirController.fetchCities);
app.post("/cost", ongkirController.fetchCosts);
app.post("/generate-midtrans-token",paymentController.tokenMidtrans );
app.post("/transactional", transactionalController.saveTransactional);
app.post("/testimonial",transactionalController.saveTestimonial)
app.get("/testimonial",transactionalController.fetchTestimonial);

app.use(errorHandler);


app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
