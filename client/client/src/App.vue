<script>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import HomeView from './views/HomeView.vue'
import Categorybar from './components/Categorybar.vue'

export default {
  components: {
    Navbar, HomeView,Categorybar,
    RouterView
  }
}

</script>

<template>
<div style="margin: 5vh 5vw 5vh 5vw;">
<Navbar></Navbar>
<RouterView></RouterView>
</div>
</template>

