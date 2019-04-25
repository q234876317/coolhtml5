<template>
    <div class="dashboard-container">
        Welcome!!{{token}}
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import { UserModule } from '@/store/modules/user'
    @Component
    export default class Dashboard extends Vue {
        get token() {
            return UserModule.token
        }
    }
</script>

<style lang="scss" scoped>
    .dashboard-container{
        padding:15px;
    }
</style>
