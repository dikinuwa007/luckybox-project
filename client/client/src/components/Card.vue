<script>
import { RouterLink } from 'vue-router';
import { mapActions, mapState } from 'pinia';
import { useTestimonialStore } from '../stores/testimonial';
export default {
    components: {

    },
    props: ['testimonial'],

    methods: {
        ...mapActions(useTestimonialStore, ['fetchTestimonial']),
    }
}
</script>

<template>
    <!-- <div class="row mb-2"> -->
    <div class="card" style="width: 16rem;margin: 1vh 1vw 1vh 1vw;">
        <img class="card-img-top" :src="this.testimonial.image_url" :alt="this.testimonial.image_url" style="height: 200px;" alt="image not uploaded">
        <div class="card-body">
            <h5 class="card-title">{{ this.testimonial.email }}</h5>
            <p class="card-text">{{ this.testimonial.description }}</p>
            <!-- <RouterLink :to="'/products/' + this.product.id" class="btn btn-sm btn-outline-secondary">Detail Product
            </RouterLink> -->
            <!-- <a v-if="status !== 'wishlist'" @click.prevent="this.addToWishlist(this.product.id)" style="margin-left: 2vw;ma"
                class="btn btn-sm btn-outline-secondary">+Wishlist</a> -->
        </div>
    </div>
</template>