<template>
  <div id="app">
    <router-view />
    <ajax-log></ajax-log>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import AjaxLog from '@/components/AjaxLog/index.vue'

  @Component({
    components:{AjaxLog}
  })
  export default class App extends Vue {}
</script>
