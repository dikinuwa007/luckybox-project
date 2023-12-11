import { defineStore } from "pinia";
import axios from "axios";
export const usePurchaseStore = defineStore("purchase", {
  state: () => {
    return {
      baseUrl: "https://luckybox.apajalah.my.id",
      provinces: [],
      cities: [],
      costs: [],
      resultPayment:[]
    };
  },
  actions: {
    async fetchProvinces() {
      try {
        const { data } = await axios.get(this.baseUrl + "/provinces");
        this.provinces = data;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchCities(idProvince) {
      try {
        const { data } = await axios.get(
          this.baseUrl + "/" + idProvince + "/cities"
        );
        this.cities = data;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchCost(destination, courier) {
      let origin = "444";
      let weight = "1";
      try {
        const { data } = await axios.post(this.baseUrl + "/cost", {
          origin,
          destination,
          weight,
          courier,
        });
        this.costs = data;
      } catch (error) {
        console.log(error);
      }
    },
    async addTransactional(result,email) {
      try {
        const { data } = await axios.post(this.baseUrl + "/transactional", {
          bank:result.bank,
          order_id:result.order_id,
          gross_amount:result.gross_amount,
          transaction_time:result.transaction_time,
          payment_type:result.payment_type,
          email:email,
        });
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Terima kasih sudah memesan, silahkan ditunggu paketnya, Share Your Feel!`,
          showConfirmButton: true,
          
        });
      } catch (error) {
        console.log(error);
      }
    },

    async payment(email, phone, name, price) {
      try {
        const { data } = await axios.post(
          this.baseUrl + "/generate-midtrans-token",
          { email, phone, name, gross_amount: price }
        );
        const cb = this.addTransactional; //untuk menginject nilai == UNTUK PENAMAAN callback SAJA

        window.snap.pay(data.token, {
          onSuccess: function (result) {
            cb(result,email); //untuk mengambil nilai result dari window ATAU UNTUK MEMANGGIL function addTransactional dengan mengirimkan nilai result         
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
});
