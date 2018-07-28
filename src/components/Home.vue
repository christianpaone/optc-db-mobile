<template>
  <v-container >
  <v-flex xs10 offset-xs1 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4 class="home">
    <v-btn 
      router 
      :to="section.to"
      :key="i"
      v-for="(section, i) in sections"
      large 
      v-text="section.title"
      v-bind:style="section.style"
      class="white--text">
    </v-btn>
  </v-flex>
  </v-container>
</template>
<script>
  export default {
    mounted:function(){
      this.$store.commit('SET_BLOCK_DRAWER',true)
    },
    data:() => ({
      sections:[
        { style: { backgroundColor: 'green', width: '100%' }, title: 'Character Table', to: '/characters' },
        { style: { backgroundColor: 'blue', width: '100%'}, title: 'Damage Calculator', to: '/' },
        { style: { backgroundColor: 'orange', width: '100%'}, title: 'Drop Table', to: '/' },
        { style: { backgroundColor: 'red', width: '100%'}, title: 'Evolution Helper', to: '/' },
        { style: { backgroundColor: 'purple', width: '100%'}, title: 'Slot Planner', to: '/' }
      ]
    })
  }
</script>
<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
  @import url("./../assets/css/custom.css");

</style>