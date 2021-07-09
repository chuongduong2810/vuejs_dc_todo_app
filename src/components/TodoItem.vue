<template>
    <div class="todo-item">
        <input class="todo-input" @keydown.enter="handleSubmit" v-model="testinput" placeholder="Nhập nội dung task..." >
        <div class="function">
            <div class="check-all">
                <input :checked="isCheckAll()" @change="handleChangeCheckAll()" type="checkbox" class="check-all-checkbox">
                <i class="fas fa-chevron-down checkmark-all"></i>
            </div>
            <div class="btnClearCompleted">Clear Completed</div>
        </div>
        <!-- <div class="filterContainer">
            <router-view></router-view>
            <router-link to="/">All</router-link>
            <router-link to="/completed">Completed</router-link>
            <router-link to="/incompleted">Incompleted</router-link>
        </div> -->
        <div v-if="todoArr && todoArr.length !== 0">
            <transition-group name="fade">
                <li :class="['task-item-'+item.id,{completed:item.isComplete}]"  v-for="item in todoArr" :key="item.id">
                    <div class="item-edit-container"  v-show="isEditing">
                        <input :ref="item.id" class="edit-input" @blur="handleBlur($event,item.id)" type="text" v-model="editText">
                    </div>
                    <div class="item-container" v-show="!isEditing">
                        <div class="left-part">
                            <div class="checkbox-container">
                                <input type="checkbox" :checked="item.isComplete"  @click="handleComplete(item.id)" class="complete-checkbox">
                                <span class="checkmark"></span>
                            </div>
                            <div class="item-title" @dblclick="!item.isComplete && handleDoubleclick($event,item.id)">{{item.name}}</div>
                        </div>
                        <div class="item-func">
                            <!-- <button class="btn-edit" @click="handleEdit(item.id)">I</button> -->
                            <button class="btn-del" @click="handleDelete(item.id)">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                    <hr>
                </li>
            </transition-group>
        </div>
        <div v-if="todoArr && todoArr.length==0" class="no-task">
            Chưa có task cần thực hiện
        </div>
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
import { v4 as uuidv4 } from 'uuid';


export default {
    name: "TodoItem",
    data(){
        return{
            url:`http://localhost:3000/task`,
            testinput:"",
            isEditing:false,
            editText:""
        }
    },
    created(){
        console.log("Created!");
        this.getTodos();
        //this.getTask();
        
    },
    // computed:mapState({
    //     todoArr: state => state.todoArr
    // }),
    
    
    computed:{
        ...mapState(['todoArr'])
    },
     
    methods:{
        ...mapActions(['getTodos','deleteTodo','addTodo','completeTodo','editTodo','checkAll']),
        handleChangeCheckAll()
        {
            var newArr = this.todoArr;
            for(var i=0;i<newArr.length;i++)
            {
                newArr[i].isComplete = !newArr[i].isComplete;
            }
            this.checkAll(newArr);
        },
        isCheckAll(){
            var flag = true;
            for(var i=0;i<this.todoArr.length;i++)
            {
                if(this.todoArr[i].isComplete == false)
                {
                    flag = false;
                    return flag
                }
            }
            console.log(flag)
            return flag
        },
        handleBlur(e,id){
            var wrapper = e.srcElement.parentElement.parentElement;
            var item = this.todoArr.find(item=>item.id==id);
            wrapper.classList.remove("editting");
            var newTask={
                name: this.editText,
                id:id,
                isComplete:item.isComplete
             }
             this.editTodo(newTask);

             console.log(this.todoArr)
        },
        handleDoubleclick(e,id){
            var wrapper = e.srcElement.parentElement.parentElement.parentElement;
            wrapper.classList.add("editting");
            //Auto focus ~ chua lam duoc

            //Set current name for edit input
            var item = this.todoArr.find(item=>item.id==id);
            this.editText=item.name;
        },
        handleEdit(id)
        {
            this.editTask(id);
        },
        handleComplete(id)
        {
            this.completeTodo(id);
        },
        handleSubmit(){
            var newTask = {
                name:this.testinput,
                isComplete: false,
                id: uuidv4()
            }
            console.log(newTask);
            this.addTodo(newTask);
            this.testinput="";
        },
        handleDelete(id){
            this.deleteTodo(id);
        }
    }
}
</script>



<style scoped>
    .btnClearCompleted{
        line-height: 3.4rem;
        font-size: 1.2rem;
        cursor: pointer;
    }
    .btnClearCompleted:hover{
        opacity: 0.8;
        transform: scale(1.01);
    }
    .check-all
    {
        position: relative;
        margin: 12px 0px;
        width: 40px;
        height: 40px;
    }
    .check-all i{
        left:-6px;
        position: absolute;
        z-index: 1;
        font-size: 2.4rem;
        color: #ccc;
    }
    .check-all-checkbox{
        width: 40px;
        height: 40px;
        opacity: 0;
        z-index: 1999;
        margin-left: -28px;
        position: absolute;
        cursor: pointer;
    }
    .check-all-checkbox:checked ~ .checkmark-all::before{
        color: #f2c8c8;
    }
    .check-all-checkbox:hover ~ .checkmark-all::before{
        font-size: 2.5rem;
        transition: all .01s ease-in;
    }
    .editting .item-edit-container
    {
        display: block!important;
    }
    .editting .item-container
    {
        display: none;
    }
    .left-part
    {
        display:flex;
        max-width: 90%;
    
    }
    .checkbox-container
    {
        position: relative;
    }
    .complete-checkbox
    {
        z-index: 1999;
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 40px;
        width: 40px;
    }
    input:checked~.checkmark::after {
        display: block;
    }
    .complete-checkbox:checked~.checkmark {
        background-color: #fff;
    }
    .checkmark {
        position: absolute;
        top: 6px;
        left: 0px;
        height: 40px;
        width: 40px;
        background-color: #fff;
        border-radius: 50%;
        border: 1px solid #ccc;
    }
    .checkmark::after {
        content: "";
        position: absolute;
        display: none;
        top: 8px;
        left: 8px;
        background-color: #f1c5c5;
        border-radius: 50%;
        height: 25px;
        width: 25px;
    }
    .no-task
    {
        opacity: 0.95;
        font-style: italic;
        font-size: 1.2rem;
    }
    .filterContainer
    {
        display: flex;
        justify-content: space-around;
        padding: 18px 0px;
    }
    .function{
        display: flex;
        justify-content: space-between;
        padding: 12px;
    }   
    li{
        list-style: none;
    }
    .completed{
        text-decoration: line-through;
        font-style: italic;
        opacity: 0.9;
        cursor: default;
    }
    .todo-input{
        border: none;
        box-shadow: inset 0 -2px 1px rgb(0 0 0 / 3%);
        margin: 12px;
        padding: 24px;
        width: 88%;
        font-size: 1.4rem;
    }
    .todo-input::placeholder{
        font-style: italic;
        font-size: 1.4rem;
    }
    .todo-input:focus{
        outline: none;
    }
    .todo-input:hover{
        transform: scale(1.01);
        transition: 0.1s ease-in;
    }
    .edit-input
    {
        padding: 10px 20px;
        font-size: 1.4rem;
        width: 80%;
        margin: 12px 12px
        border 1px solid #ccc;
    }
    .item-container
    {
        display:flex;
        justify-content: space-between;
    }
    .btn-del
    {
        font-size: 1.4rem;
        padding: 12px 17px;
        border: 1px solid #ccc;
        border-radius: 50%;
        margin: 0 12px;
    }
    .btn-del:hover
    {
        transform: scale(1.04);
        transition: 0.2s ease-in;
        opacity: 0.8;
        cursor: pointer;
    }
    .btn-edit
    {
        font-size: 1.4rem;
        padding: 12px 12px;
        border: 1px solid #ccc;
        border-radius: 50%;
        margin: 0 12px;
    }
    .btn-edit:hover
    {
        opacity: 0.8;
        cursor: pointer;
    }
    .item-title
    {
        font-size: 1.4rem;
        line-height: 3.2rem;
        margin-left: 50px;
        overflow-wrap: anywhere;
    }
    .item-title:hover
    {
    }
    /* li{
        animation: showTask 0.5s ease-in;
    }
    @keyframes showTask {
        0%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    } */

    /* Animation enter */
    .fade-enter{
        opacity: 0;
    }
    .fade-enter-to, .fade-leave
    {
        opacity: 1;
    }
    .fade-enter-active{
        transition: 0.5s ease-in;
    }


    /* Animation leave */
    .fade-leave{
        opacity: 1;
    }
    .fade-leave-to{
        opacity: 0;
    }
    .fade-leave-active{
        transition: 0.5s ease-out;
    }

   

</style>