<template>
    <div class="app-container">
        <div class="inner-container">
            <div class="oper-top">
                <el-tooltip class="item" effect="dark" content="添加" placement="top-start">
                    <div class="yrd-btn-svg yrd-btn-svg-add" @click="initForm()">
                        <svg-icon name="add"></svg-icon>
                    </div>
                </el-tooltip>
            </div>
            <el-table :data="list"
                      v-loading="listLoading"
                      element-loading-text="Loading"
                      border
                      fit
                      highlight-current-row>
                <el-table-column align="center" label="编号" width="100">
                    <template slot-scope="scope">{{(page.cur_page-1)*page.size+scope.$index+1}}</template>
                </el-table-column>
                <el-table-column align="center" label="Key" prop="id"></el-table-column>
                <el-table-column align="center" label="名称" prop="name"></el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
                            <div class="yrd-btn-svg" @click="initForm(scope.row)">
                                <svg-icon name="edit"></svg-icon>
                            </div>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
                            <div class="yrd-btn-svg" @click="handleDelete(scope.row.id,scope.$index,list)">
                                <svg-icon name="delete"></svg-icon>
                            </div>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    :disabled="listLoading"
                    style="text-align:right;margin-top:10px;"
                    background
                    :current-page="page.cur_page"
                    :page-size="page.size"
                    layout="total, prev, pager, next"
                    @current-change="pageChange"
                    :total="page.count">
            </el-pagination>
        </div>
        <modal-custom animateName="center" :show.sync="modelrule" :title="editInfo.formBtnName">
            <div class="yrd-form-container">
                <el-form :model="editInfo.editForm" :rules="editInfo.editRules" ref="editInfo.editForm" label-width="100px" class="yrd-form">
                    <!--                    <el-form-item label="选择类型" prop="type">-->
                    <!--                        <el-select v-model="editInfo.editForm.type" placeholder="请选择">-->
                    <!--                            <el-option v-for="item in editInfo.types" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
                    <!--                        </el-select>-->
                    <!--                    </el-form-item>-->
                    <el-form-item label="分类名称" prop="name">
                        <el-input v-model.lazy="editInfo.editForm.name" placeholder="分类名称"></el-input>
                    </el-form-item>
                    <!--                    <el-form-item label="白名单value" prop="value">-->

                    <!--                    </el-form-item>-->
                    <!--                    <el-form-item label="白名单说明" prop="des">-->
                    <!--                        <el-input type="textarea" v-model="editInfo.editForm.des"></el-input>-->
                    <!--                    </el-form-item>-->
                    <el-form-item>
                        <el-button :loading="editInfo.isCommit" type="primary" @click="submitForm">保存</el-button>
                        <el-button @click="resetForm()">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </modal-custom>
    </div>
</template>

<script lang="ts">
    import { Component, Vue,Prop } from 'vue-property-decorator'
    import Ipage from  '@/types/ipage'

    import CategoryApi from '@/api/category'
    import {ElForm} from "element-ui/types/form";
    import IEditInfo from "@/types/ieditinfo";
    import {IEditCategory} from '@/types/views/category';
    import {UpdateInfo} from '@/api/baseapi';

    @Component
    export default class Category extends Vue {
        private list: object[] = []
        private listLoading: boolean = true
        private page: Ipage = {
            count: 0,
            cur_page: 1,
            size: 10
        }

        private modelrule: boolean = false

        private editInfo:IEditInfo<IEditCategory> = {
            isCommit: false,
            formBtnName: '',
            id: '',
            editForm: {
                name: '',
            },
            editRules: {
                name: [{required: true, message: '分类名称必填', trigger: 'blue'}]
            }
        }

          mounted() {
             this.fetchData()
        }

         pageChange(val: number) {
            this.page.cur_page = val
             this.fetchData()
        }
        fetchData(){
            this.getData().then((res)=>{
                this.page.count = res.count
                this.list = res.list
            })
        }
        async getData() {
            this.listLoading = true
            const res = await CategoryApi.query(this.page.cur_page)
            const resCount = await CategoryApi.count()
            let {count = 0} = resCount.data
            this.listLoading = false
            return {
                count,
                list:res.data
            }
        }

        handleDelete(id:string, index:number, list:[]) {
            this.$confirm('确认删除？', '确认删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: "warning"
            }).then(() => {
                CategoryApi.del(id).then(res => {
                    list.splice(index, 1)
                })
            }).catch(() => {
            })
        }

        //编辑模块
        initForm(scope: any) {
            this.modelrule = true
            let obj: IEditCategory = {name: ''}
            if (scope && scope.id) {
                //编辑
                obj.name = scope.name
                this.editInfo.id = scope.id
                this.editInfo.formBtnName = "修改"

            } else {
                //添加
                this.editInfo.id = ''
                this.editInfo.formBtnName = "添加"
            }
            this.editInfo.editForm.name = obj.name
        }

        submitForm() {
            (this.$refs['editInfo.editForm'] as ElForm).validate(valid => {
                if (valid) {
                    let postData:UpdateInfo = {
                        id:'',
                        name: this.editInfo.editForm.name,
                    }
                    if (this.editInfo.id) {
                        postData.id = this.editInfo.id
                    }
                    this.editInfo.isCommit = true
                    CategoryApi.commonupdate(postData).then(res => {
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                            duration: 2000
                        })
                        this.modelrule = false
                        this.editInfo.isCommit = false
                        this.fetchData()
                    }).catch(() => {
                        this.modelrule = false
                        this.editInfo.isCommit = false
                    })
                } else {
                    return false
                }
            });
        }

        resetForm() {
            (this.$refs['editInfo.editForm'] as ElForm).resetFields()
        }
    }
</script>


<style scoped>
    .oper-top{
        float:right;
        padding:0 10px 10px 0;
    }
</style>
