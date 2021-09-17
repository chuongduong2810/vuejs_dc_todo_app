import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const url = `https://vue-dc-todo-app-api.herokuapp.com/task`
const storeData = {
    state:{
        todoArr:[]
    },
    actions:{
        getTodos({commit}){
            axios.get(url)
                .then(res=>{
                    //console.log(res);
                    commit("SET_TODOS",res.data)
                })
                .catch(e=>{
                    console.log("Error",e);
                })
        },
        addTodo({commit},newTask){
            //POST
            axios.post(url,newTask)
            .then(res=>{
                console.log(res);
                commit("ADD_TODO",newTask);
            })
            .catch(e=>{console.log(e)});
        },
        deleteTodo({commit},id){
            axios.delete(url+'/'+id)
            .then(res=>{
                console.log(res)
                commit("DELETE_TODO",id)
            })
            .catch(e=>console.log(e))
        },
        completeTodo({commit},id){
            var currentItem = this.state.todoArr.find(item=>item.id==id);

            var editTask = {
                name:currentItem.name,
                isComplete: !currentItem.isComplete,
                id:currentItem.id
            }
            axios.put(url+'/'+id,editTask)
            .then(res=>{
                commit("COMPLETE_TODO",id);
                console.log(res);
            })
            .catch(e=>{
                console.log(e);
            })
        },
        editTodo({commit},todo)
        {
            var currentItem = this.state.todoArr.find(item=>item.id==todo.id);

            var editTask = {
                name:todo.name,
                isComplete: currentItem.isComplete,
                id:currentItem.id
            }

            axios.put(url+'/'+todo.id,editTask)
            .then(res=>{
                commit("EDIT_TODO",todo);
                console.log(res);
            })
            .catch(e=>{
                console.log(e);
            })
        },
        checkAll({commit},todos)
        {


            // for(var i=0;i<newArr.length;i++)
            // {
            //     this.newArr[i].isComplete = !this.newArr[i].isComplete;
            // }

            // axios.put(url,todos)
            // .then(res=>{
            //     commit("COMPLETE_ALL");
            //     console.log(res);
            // })
            // .catch(e=>{
            //     console.log(e);
            // })
            commit("COMPLETE_ALL",todos)
        }
    },
    mutations:{
        SET_TODOS(state,todos){
            state.todoArr = todos
        },
        ADD_TODO(state,todo){
            console.log(todo);
            state.todoArr.unshift(todo);
        },
        DELETE_TODO(state,todoID){
            state.todoArr = state.todoArr.filter(todo => todo.id !== todoID);
        },
        COMPLETE_TODO(state,todoID){
            var index = state.todoArr.findIndex(item=>item.id===todoID)
            state.todoArr[index].isComplete = !state.todoArr[index].isComplete;
        },
        EDIT_TODO(state,todo){
            var index = state.todoArr.findIndex(item=>item.id===todo.id)
            state.todoArr[index].name = todo.name;
        },
        COMPLETE_ALL(state,todos){
            // state.todoArr.forEach(item => {
            //     item.isComplete = !item.isComplete
            // });
            state.todoArr = todos
        }
    }
}
const store = new Vuex.Store(storeData)

export default store
