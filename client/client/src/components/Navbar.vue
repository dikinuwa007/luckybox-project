<script>
import { RouterLink } from 'vue-router';
import { mapWritableState } from 'pinia';
import { usePurchaseStore } from '../stores/purchase';
export default {
    // computed: { ...mapWritableState(usePurchaseStore,['status'])},
    methods: {
        
        async home() {
            this.$router.push('/')
        },
        
    }
    
}

</script>

<template>
    <div class="container">
        <!-- login -->
        <header class="border-bottom lh-1 py-3">
            <div class="row flex-nowrap justify-content-between align-items-center">
                <div class="col-4 pt-1">
                    <RouterLink to="/purchase" class="btn btn-sm btn-outline-secondary">Purchase</RouterLink>
                </div>
                <div class="col-4 text-center">
                    <a class="blog-header-logo text-body-emphasis text-decoration-none" href="#"
                        @click.prevent="home">Lucky Box</a>
                </div>
                <div class="col-4 d-flex justify-content-end align-items-center">
                    <RouterLink to="/testimonial" class="btn btn-sm btn-outline-secondary" style="margin-right: 2vw;">Testimonial</RouterLink>
                    <RouterLink to="/addtestimonial" class="btn btn-sm btn-outline-secondary">Share Your Feel</RouterLink>
                    <!-- <a @click.prevent="logout"  v-if="status==='login'" class="btn btn-sm btn-outline-secondary"
                        style="margin-right: 2vw;">Logout</a>
                    <RouterLink to="/login" v-if="status==='logout'" class="btn btn-sm btn-outline-secondary" style="margin-right: 2vw;">Login
                    </RouterLink>
                    <RouterLink to="/register" v-if="status==='logout'" class="btn btn-sm btn-outline-secondary">Register</RouterLink> -->
                </div>
            </div>
        </header>
        <!-- category -->
    </div>
</template>