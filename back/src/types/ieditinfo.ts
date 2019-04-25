export default interface IEditInfo<T>{
    isCommit:boolean
    formBtnName:string
    id:string
    editForm:T
    editRules:object
}
