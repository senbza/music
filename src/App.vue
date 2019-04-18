<template>
  <div id="app">
    <!-- <Mhead></Mhead> -->
    <router-view/>
  </div>
</template>

<script>
// import Mhead from './components/m-head/m-head'
import 'lib-flexible'

export default {
  name: 'app',
  components: {
    // Mhead
  }
}
</script>

<style>
body{

}
#app{
  width: 100%;
  height:100%
}
</style>
