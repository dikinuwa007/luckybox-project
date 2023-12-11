<script>
import Card from '../components/card.vue'
import { mapState, mapActions } from 'pinia'
import { useTestimonialStore } from '../stores/testimonial'
import { RouterView } from 'vue-router'
export default {
    data() {
        return { number: 1 }
    },
    computed: {
        ...mapState(useTestimonialStore, ['testimonials'])
    },
    methods: {
        ...mapActions(useTestimonialStore, ['fetchTestimonials']),
        async nextPage() {
            this.$router.push({ query: { 'page[size]': 4, 'page[number]': ++this.number } });
        },
        async prevPage() {

            this.$router.push({ query: { 'page[size]': 4, 'page[number]': --this.number } });
        },
    },

    async created() {
        await this.fetchTestimonials(this.number)
    },

    components: {
        Card,
        RouterView
    },
    watch: {
        '$route.query'() {
            console.log('WATCH');
            this.fetchTestimonials(this.$route.query['page[number]'])
        }
    },
}
</script>
<template>
    <h1 style="margin-top: 3vh;margin-left: 1vw;justify-content: center;display: flex;">How lucky they are</h1>
    <div style="display: flex;flex-wrap: wrap;margin-top: 5vh;margin-left: 1vw;justify-content: center;">
        <Card v-for="testimonial in testimonials" :key="testimonial.id" :testimonial="testimonial"></Card>
    </div>
    <div style="margin-left: 38.5vw;margin-top: 5vh;">
        <button @click.prevent="prevPage" class="btn btn-sm btn-outline-secondary">Previous</button>
        <button @click.prevent="nextPage" class="btn btn-sm btn-outline-secondary" style="margin-left: 2.5vw;">Next</button>
    </div>
</template>