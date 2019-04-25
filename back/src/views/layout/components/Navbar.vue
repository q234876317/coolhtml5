<template>
    <div class="navbar">
        <hamburger
                :toggle-click="toggleSideBar"
                :is-active="sidebar.opened"
                class="hamburger-container"
        />
        <breadcrumb />
        <span style="display: block;float: right;cursor: pointer;margin-right: 15px;" @click="logout">退出</span>
    </div>
</template>

<script lang="ts">
    import Breadcrumb from '@/components/Breadcrumb/index.vue'
    import Hamburger from '@/components/Hamburger/index.vue'
    import { Component, Vue } from 'vue-property-decorator'
    import { AppModule } from '@/store/modules/app'
    import { UserModule } from '@/store/modules/user'

    @Component({
        components: {
            Breadcrumb,
            Hamburger
        }
    })
    export default class Navbar extends Vue {
        get sidebar() {
            return AppModule.sidebar
        }

        private toggleSideBar() {
            AppModule.ToggleSideBar(false)
        }

        private logout() {
            UserModule.FedLogOut().then(() => {
                location.reload() // 为了重新实例化vue-router对象 避免bug
            })
        }
    }
</script>

<style lang="scss" scoped>
    .navbar {
        height: 50px;
        line-height: 50px;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);

        .hamburger-container {
            line-height: 58px;
            height: 50px;
            float: left;
            padding: 0 10px;
        }

        .screenfull {
            position: absolute;
            right: 90px;
            top: 16px;
            color: red;
        }
    }
</style>
