¬<template>
    <div class="ajax-log" :class="{active:isOpen,'is-hover':ShowConsole}" v-on:mouseenter="Enter" v-on:mouseleave="Leave">
        <div class="info-header">
            ajax请求记录(<span style="color:#f56c6c;">双击json字符串可自动格式化</span>)：
            <div class="oper">
                <el-tooltip class="item" effect="dark" content="清空请求记录" placement="top-start">
                    <i class="el-icon-delete" @click="clearAll()"></i>
                </el-tooltip>
                <el-tooltip v-if="!isOpen" class="item" effect="dark" content="展开调试" placement="top-start">
                    <i  class="el-icon-arrow-up" @click="handelClick()"></i>
                </el-tooltip>
                <el-tooltip v-else class="item" effect="dark" content="关闭调试" placement="top-start">
                    <i class="el-icon-minus" @click="handelClick()"></i>
                </el-tooltip>
            </div>
        </div>
        <div class="info-list">
            <el-collapse accordion>
                <el-collapse-item v-for="(item,key) in list" :key="item.id">
                    <template slot="title">
                        {{item.url}}
                        <el-tag :type="item.is_error?'danger':'success'" style="float: right;margin-top: 6px;margin-left:3px;">{{item.status}}</el-tag>
                        <el-tag :type="item.method.toUpperCase()=='POST'?'warning':'info'" style="float: right;margin-top: 6px;">{{item.method.toUpperCase()}}</el-tag>
                    </template>
                    <el-form label-position="right" label-width="120px">
                        <el-form-item v-if="item.is_error" label="错误提示：">
                            <el-alert
                                    :title="item.error_msg"
                                    type="error"
                                    :closable="false">
                            </el-alert>
                        </el-form-item>
                        <el-form-item label="请求头："><json-formate :json="item.headers"></json-formate></el-form-item>
                        <el-form-item label="表单："><json-formate :json="item.req_data"></json-formate></el-form-item>
                        <el-form-item v-if="!item.is_error" label="返回数据："><json-formate :json="item.res_data"></json-formate></el-form-item>
                    </el-form>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component,Vue,Prop} from 'vue-property-decorator'
    import JsonFormate from './JsonFormate.vue'
    import {AjaxModule} from '@/store/modules/ajaxlist'

    @Component({components:{JsonFormate}})
    export default class AjaxLog extends Vue{
        private isOpen:boolean=false
        private isOver:boolean=false

        get list(){
            return AjaxModule.ajaxlist
        }

        get ShowConsole() {
            return this.isOpen||this.isOver
        }

        clearAll(){
            AjaxModule.ClearAJax()
        }
        handelClick(){
            this.isOpen=!this.isOpen
        }
        Enter(){
            this.isOver=true
        }
        Leave(){
            this.isOver=false
        }
    }
</script>

<style lang="scss" scoped>
    .ajax-log{
        position: fixed;
        z-index: 9999;
        background:#fff;
        right: 0;
        bottom: 0;
        opacity:.5;
        width:500px;
        transition: width .5s;
        .info-header{
            background: #eee;
            padding:0 10px;
            text-align:left;
            height:40px;
            line-height: 40px;
            .oper{
                text-align:right;
                float:right;
            }
            i{
                cursor:pointer;
                font-size: 20px;
                display: inline-block;
                margin-right: 10px;
            }
        }
        .info-list {
            height: 0;
            overflow-y: scroll;
            text-align:left;
            transition: height .5s;
        }
        &.is-hover{
            opacity:1;
        }
        &.active{
            width:100%;
            .info-list{
                height:320px;
            }
        }
    }
</style>
