<template>
    <transition :name="animateName" tag="div">
        <div class="modal-custom" v-show="show">
            <div class="modal-custom-dialog">
                <div class="modal-custom-content">
                    <div class="modal-custom-header">
                        <slot name="header">
                            <p class="title" v-if="title">{{title}}</p>
                        </slot>
                        <a @click.prevent="close()" class="modal-custom-close">X</a>
                    </div>
                    <div class="modal-custom-body">
                        <slot>
                        </slot>
                    </div>
                </div>
            </div>
            <div class="modal-custom-backup" @click="close()"></div>
        </div>
    </transition>
</template>

<script lang="ts">
    import {Component, Vue,Prop,Emit} from 'vue-property-decorator'

    @Component
    export default class ModalCustom extends Vue {
        @Prop({default:'right'})
        private animateName!:string

        @Prop({default:false})
        private show!:boolean

        @Prop({default:''})
        private title!:string

        @Emit('update:show')
        close(){
            return false
        }
    };
</script>

<style lang="scss" scoped>
    .center-enter-active {
        animation: modal-outer-open .5s linear;
        .modal-custom-dialog{
            animation: modal-rotate-in .5s linear;
        }
    }
    .center-leave-active {
        animation: modal-outer-open .5s reverse linear;
        .modal-custom-dialog{
            animation: modal-rotate-in .5s reverse linear;
        }
    }

    .right-enter-active {
        animation: modal-outer-opacity .5s linear;
        .modal-custom-dialog{
            animation: modal-right-in .5s linear;
        }
    }
    .right-leave-active {
        animation: modal-outer-opacity .5s reverse linear;
        .modal-custom-dialog{
            animation: modal-right-in .5s reverse linear;
        }
    }


    @keyframes modal-outer-open {
        0% {
            transform: translateY(-20px) rotateX(-60deg);
            opacity: 0;
        }
        50% {
            opacity: 0.5;
        }
        100% {
            transform: translateY(0) rotateX(0);
            opacity: 1;
        }
    }
    @keyframes modal-rotate-in {
        0% {
            transform:rotateZ(-360deg) scale(0,0) translateX(50%);
        }
        100% {
            transform:rotateZ(0deg) scale(1,1) translateX(0);
        }
    }


    @keyframes modal-outer-opacity {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    @keyframes modal-right-in {
        0% {
            transform: translateX(50%) scale(0.8,0.8);
        }
        70%{
            transform: translateX(20%) scale(0.8,0.8);
        }
        100% {
            transform: translateX(0) scale(1,1);
        }
    }


    .modal-custom {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 1001;
        outline: 0;
        overflow: hidden;
    }
    .modal-custom-dialog {
        position: fixed;
        right:0;
        top: 0;
        bottom:0;
        width: 65%;
        overflow:auto;
        background: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        z-index: 1002;
        padding:0 15px;
        .modal-custom-content {
            .modal-custom-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #eee;
                a {
                    color: #999;
                    &:hover {
                        color: #666;
                    }
                }
            }
            .modal-custom-body{
                padding:10px 0;
            }
        }
    }
    .modal-custom-backup {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1000;
        background: rgba(0, 0, 0, 0.5);
    }
</style>
