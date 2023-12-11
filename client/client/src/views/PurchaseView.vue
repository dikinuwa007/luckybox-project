<script>
import { mapActions, mapState } from 'pinia'
import { usePurchaseStore } from '../stores/purchase'
export default {
    data() {
        return {
            user: {
                name: '',
                phone: '',
                email: '',
                gross_amount: '',
                provinceId: '',
                cityId: '',
                courier: '',
                destination: '',
                origin: '444',
                weight: 1,
                price: 0
            }
        }
    },
    computed: {
        ...mapState(usePurchaseStore, ['provinces', 'cities', 'costs'])
    },
    methods: {
        ...mapActions(usePurchaseStore, ['fetchProvinces', 'fetchCities','fetchCost','payment']),
        async changeProvince() {
            await this.fetchCities(this.provinceId)
            console.log(this.cities, 'CITIES');
        },
        async paymentSubmit(){  
            const result = await this.payment(this.user.email,this.user.phone,this.user.name,this.price)
        },
        async changeCity() {
            
        },
        async changeCourier() {
            await this.fetchCost(this.cityId, this.courier)
            
        }

    },
    async created() {
        await this.fetchProvinces()
        
    }
}

</script>
<template>
    <section class="vh-60"
        style="background-color: rgb(255, 255, 255);display: flex;flex-wrap: wrap;margin-top: 5vh;margin-left: 1vw;justify-content: center;">
        <div class="container h-60">
            <div class="row d-flex justify-content-center align-items-center h-60">
                <div class="col-lg-12 col-xl-11">
                    <div class="card text-black" style="border-radius: 25px;">
                        <div class="card-body p-md-3">
                            <div class="row justify-content-center">
                                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                    <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Purchase Box</p>
                                    <form class="mx-1 mx-md-4" @submit.prevent="paymentSubmit">
                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                            <div class="form-outline flex-fill mb-0">
                                                <input type="text" id="form3Example1c" class="form-control"
                                                    v-model="user.name" />
                                                <label class="form-label" for="form3Example1c">Name</label>
                                            </div>
                                        </div>

                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                                            <div class="form-outline flex-fill mb-0">
                                                <input type="number" id="form3Example4cd" class="form-control"
                                                    v-model="user.phone" />
                                                <label class="form-label" for="form3Example4cd">Phone Number</label>
                                            </div>
                                        </div>
                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                            <div class="form-outline flex-fill mb-0">
                                                <input type="email" id="form3Example3c" class="form-control"
                                                    v-model="user.email" />
                                                <label class="form-label" for="form3Example3c">Your Email</label>
                                            </div>
                                        </div>
                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                                            <div class="form-outline flex-fill mb-0">
                                                <input type="text" id="form3Example4cd" class="form-control"
                                                    v-model="user.address" />
                                                <label class="form-label" for="form3Example4cd">Address</label>
                                            </div>
                                        </div>

                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                                            <div class="form-outline flex-fill mb-0">
                                                <select v-model="provinceId" @change.prevent="changeProvince(provinceId)"
                                                    class="form-select" aria-label="Default select example"
                                                    style="width: 92%;">
                                                    <option v-for="province in provinces" :key="province.id"
                                                        :value="province.province_id">{{ province.province }}</option>
                                                </select>
                                                <label class="form-label" for="form3Example4c">Province</label>
                                            </div>
                                        </div>
                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                                            <div class="form-outline flex-fill mb-0">
                                                <!-- <img v-if="cities === null" src="../assets/images.png" alt="Loading" /> -->
                                                <select v-model="cityId" @change.prevent="changeCity(cityId)"
                                                    class="form-select" aria-label="Default select example"
                                                    style="width: 92%;">
                                                    <option v-for="city in cities" :key="city.id" :value="city.city_id">{{
                                                        city.type + ' ' + city.city_name + ' (Kode Pos: ' + city.postal_code
                                                        + ')' }}
                                                    </option>
                                                </select>
                                                <label class="form-label" for="form3Example4c">City</label>
                                            </div>
                                        </div>
                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                                            <div class="form-outline flex-fill mb-0">
                                                <select v-model="courier" @change.prevent="changeCourier(courier)"
                                                    class="form-select" aria-label="Default select example"
                                                    style="width: 92%;">
                                                    <option value="jne"> JNE </option>
                                                    <option value="pos"> Pos Indonesia </option>
                                                    <option value="tiki"> TIKI </option>
                                                </select>
                                                <label class="form-label" for="form3Example4c">Courier</label>
                                            </div>
                                        </div>
                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                                            <div class="form-outline flex-fill mb-0">
                                                <select v-model="price" class="form-select"
                                                    aria-label="Default select example" style="width: 92%;">
                                                    <option v-for="cost in costs" 
                                                        :value="cost.cost[0].value">{{
                                                            cost.service + '- ' + cost.description + ' - RP ' + cost.cost[0].value
                                                            +'-' +cost.cost[0].etd
                                                            + ')' }}
                                                    </option>
                                                </select>
                                                <label class="form-label" for="form3Example4c">Service - Description - Harga
                                                    - Estimasi</label>
                                            </div>
                                        </div>

                                        <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                            <button type="submit" class="btn btn-primary btn-lg">Purchase</button>
                                        </div>

                                    </form>

                                </div>
                                <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                        class="img-fluid" alt="Sample image">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>