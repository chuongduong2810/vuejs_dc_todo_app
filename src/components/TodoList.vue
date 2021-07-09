<template>
    <div>
        <ul class="todo-list">
            <TodoItem>12</TodoItem>
        </ul>
    </div>
</template>
<script>
import TodoItem from './TodoItem.vue'
export default {
    name:"TodoList",
    components:
    {
        TodoItem
    }
}
</script>
<style scope>
    
</style>