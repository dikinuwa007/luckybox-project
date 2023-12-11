<script>
import { mapActions, mapState } from 'pinia'
import { useTestimonialStore } from '../stores/testimonial'
export default {
    name: 'imageUpload',
    data() {
        return {
            email: '',
            description: '',
            image: '',
            previewImage: null,
            imgBase64: ''
        }
    },
    methods: {
        ...mapActions(useTestimonialStore, ['addTestimonial', 'uploadimgBB']),
        async uploadImage(e) {
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e => {
                this.previewImage = e.target.result;
                this.imgBase64 = this.previewImage.slice(23);
            };
        },
        async submitForm() {
            const result = await this.addTestimonial(this.email, this.description, this.imgBase64)
        },

    },
}

</script>

<template>
    <form @submit.prevent="submitForm"
        style="background-color: rgb(255, 255, 255);display: grid;flex-wrap: wrap;margin-top: 5vh;margin-bottom:5vh;margin-left: 1vw;justify-content: center;">
        <div class="form-group" style="margin-bottom: 3vh;">
            <label for="exampleInputEmail1">Email address</label>
            <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                placeholder="Enter email">
        </div>
        <div class="form-group" style="margin-bottom: 3vh;">
            <label for="exampleInputPassword1">Description</label>
            <input v-model="description" type="text" class="form-control" id="exampleInputPassword1"
                placeholder="What do you fell after open the box">
        </div>
        <div class="form-group" style="margin-bottom: 3vh;">
            <div>
                <img :src="previewImage" class="uploading-image" style="width: 50%;height: 50%;" />
                <input type="file" accept="image/jpeg" @change=uploadImage>
            </div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</template>