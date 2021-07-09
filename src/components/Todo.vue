<template lang="">
    <div>
        <div class="todo-container">
              <h2 class="title">Vue JS Todo App</h2>
              <TodoList></TodoList>
        </div>
    </div>
</template>
<script>
import TodoList from './TodoList.vue'
export default {
    name: "TodoApp",
    props:{
        user: String
    },
    components:{
        TodoList
    }
}
</script>
<style scope>
    .title {
        width: 100%;
        font-size: 80px;
        font-weight: 700;
        color: rgb(222 123 123/31%);
    }
    .todo-container
    {
        padding: 40px 40px 10px;
        height: auto;
        width: 742px;
        min-width: 450px;
        border: 1px solid #e0e0e0;
        background-color: #f9e7e7;
        box-shadow: 1px 1px 24px #e49f9f;
        margin: 40px auto;
    }
</style>