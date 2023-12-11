import { defineStore } from "pinia";
import axios from "axios";
export const useTestimonialStore = defineStore("testimonial", {
  state: () => {
    return {
      baseUrl: "https://luckybox.apajalah.my.id",
      testimonials: [],
      cities: [],
      costs: [],
      resultPayment:[]
    };
  },
  actions: {
    async fetchTestimonials(number) {
      console.log(number,'NUMBERR');
      try {
        const { data } = await axios.get(this.baseUrl + "/testimonial?page[size]=4&page[number]=" + number)
        this.testimonials = data;
      } catch (error) {
        console.log(error);
      }
    },
    async addTestimonial(email,description,image_url) {
    console.log(email,'EMAIL',description,'DESC',image_url,'IMAGE');
      try {
        const { data } = await axios.post(this.baseUrl + "/testimonial",{description,email,imagebase64:image_url},{headers:{'Content-Type': 'application/json'}});
        this.testimonials = data;
        Swal.fire({
          position: "center",
          icon: "success",
          title: `berhasil menambahkan testimoni`,
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `${error.response.data.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
  },
});
