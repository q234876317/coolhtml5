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
                <el-table-column align="center" label="分类名称" prop="category_name"></el-table-column>
                <el-table-column align="center" label="标题" prop="title"></el-table-column>
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
        <modal-custom :show.sync="modelrule" :title="editInfo.formBtnName">
            <div class="yrd-form-container">
                <el-form :model="editInfo.editForm" :rules="editInfo.editRules" ref="editInfo.editForm" label-width="100px" class="yrd-form">
                    <el-form-item label="选择分类" prop="category_id" style="width:100%;">
                        <el-select filterable v-model="editInfo.editForm.category_id" placeholder="请选择">
                            <el-option v-for="item in types" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="图片文件">
                        <el-upload
                                class="upload-demo"
                                :action='base_url+"/api/fileupload"'
                                list-type="picture"
                                :on-remove="handleRemove"
                                multiple
                                :limit="1"
                                :before-upload="beforeUpload"
                                :on-success="handleSuccess"
                                :on-exceed="handleExceed"
                                :file-list="filelist">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="链接" prop="url">
                        <el-input v-model.lazy="editInfo.editForm.url" placeholder="url"></el-input>
                    </el-form-item>
                    <el-form-item label="标题" prop="title">
                        <el-input v-model.lazy="editInfo.editForm.title" placeholder="标题"></el-input>
                    </el-form-item>
                    <el-form-item label="内容" prop="des">
                        <el-input type="textarea" v-model="editInfo.editForm.des"></el-input>
                    </el-form-item>
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
    import { Component, Vue } from 'vue-property-decorator'

    import Ipage from  '@/types/ipage'

    import CategoryApi from '@/api/category'
    import NewsApi from '@/api/news'
    import {ElForm} from "element-ui/types/form";
    import IEditInfo from "@/types/ieditinfo";
    import {IEditNews} from '@/types/views/news';
    import {UpdateInfo} from '@/api/baseapi';
    import {APIService} from '@/config';

    @Component
    export default class News extends Vue {
        private base_url: string = APIService
        private list: object[] = []
        private listLoading: boolean = true
        private page: Ipage = {
            count: 0,
            cur_page: 1,
            size: 10
        }

        private modelrule: boolean = false
        private editInfo: IEditInfo<IEditNews> = {
            isCommit: false,
            formBtnName: '',
            id: '',
            editForm: {
                category_id: '',
                logo: '',
                url: '',
                title: '',
                des: '',
            },
            editRules: {
                category_id: [{required: true, message: '请选择分类', trigger: 'change'}],
                title: [{required: true, message: '标题必填', trigger: 'blue'}],
                des: [{required: true, message: '详细内容必填', trigger: 'blue'}],
                url: [{required: true, message: 'url必填', trigger: 'blue'}],
            }
        }

        private filelist: any[] = []
        private types: object[] = []

        mounted() {
            this.firstLoad()
        }

        pageChange(val: number) {
            this.page.cur_page = val
            this.fetchData()
        }

        fetchData() {
            this.getData().then((res) => {
                this.page.count = res.count
                this.list = res.list
                this.translist()
            })
        }

        firstLoad(){
            this.initAndFetchData().then(res=>{
                this.types=res.types
                let {data}=res
                this.page.count = data.count
                this.list = data.list
                this.translist()
            })
        }

        translist() {
            let list = JSON.parse(JSON.stringify(this.list))
            let types = JSON.parse(JSON.stringify(this.types))
            list.map((item: any) => {
                let curCategory = types.find((category: any) => {
                    return category.id == item.category_id
                }) || {}
                item.category_name = curCategory.name || ''
                return item
            })
            this.list = list
        }

        async initAndFetchData() {
            const categories = await CategoryApi.all()
            const list = await this.getData()
            return {
                types: categories.data || [],
                data: list
            }
        }

        async getData() {
            this.listLoading = true
            const res = await NewsApi.query(this.page.cur_page)
            const resCount = await NewsApi.count()
            let {count = 0} = resCount.data
            this.listLoading = false
            return {
                count,
                list: res.data
            }
        }

        handleDelete(id: string, index: number, list: []) {
            this.$confirm('确认删除？', '确认删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: "warning"
            }).then(() => {
                NewsApi.del(id).then(res => {
                    list.splice(index, 1)
                })
            }).catch(() => {
            })
        }

        //编辑模块
        initForm(scope: any) {
            this.modelrule = true
            let obj: IEditNews = {
                category_id: '',
                logo: '',
                url: '',
                title: '',
                des: ''
            }
            if (scope && scope.id) {
                //编辑
                obj.title = scope.title
                obj.category_id = scope.category_id
                obj.logo = scope.logo
                obj.url = scope.url
                obj.des = scope.des
                this.editInfo.id = scope.id
                this.filelist = [{name: obj.logo, url: this.base_url + obj.logo}]

                this.editInfo.formBtnName = "修改"
            } else {
                //添加
                this.editInfo.id = ''
                this.editInfo.formBtnName = "添加"
                this.filelist = []
            }
            this.editInfo.editForm = obj
        }

        submitForm() {
            (this.$refs['editInfo.editForm'] as ElForm).validate(valid => {
                if (valid) {
                    let postData: UpdateInfo = {
                        id: '',
                        title: this.editInfo.editForm.title,
                        category_id: this.editInfo.editForm.category_id,
                        logo: this.editInfo.editForm.logo,
                        url: this.editInfo.editForm.url,
                        des: this.editInfo.editForm.des
                    }
                    if (this.editInfo.id) {
                        postData.id = this.editInfo.id
                    }
                    if(!postData.logo){
                        this.$message.warning('log必填');
                        return
                    }
                    this.editInfo.isCommit = true
                    NewsApi.commonupdate(postData).then(res => {
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                            duration: 2000,
                            onClose() {

                            }
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
            this.handleRemove()
        }

        //图片上传
        handleSuccess(response: any, file: any, fileList: any) {
            if (response.code != 200) {
                this.$message.warning(response.message || "上传失败");
                fileList.remove(file)
                return
            }
            let {url} = response.data
            file.name = url
            file.url = this.base_url + url
            this.editInfo.editForm.logo = url
        }

        handleRemove() {
            this.filelist=[]
            this.editInfo.editForm.logo = ''
        }

        beforeUpload(file: any) {
            const isPic = file.type === 'image/jpeg'
                || file.type === 'image/png' || file.type === 'image/gif';
            if (!isPic) {
                this.$message.error('请上传图片!');
            }
            return isPic;
        }

        handleExceed(files: any[], fileList: any[]) {
            this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        }
    }
</script>


<style scoped>
    .oper-top{
        float:right;
        padding:0 10px 10px 0;
    }
</style>
