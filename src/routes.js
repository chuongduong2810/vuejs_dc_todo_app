import TodoApp from './components/Todo.vue'
import Completed from './components/Completed.vue'
import Incompleted from './components/Incompleted.vue'


const routes = [
    {path:"/", name:"home",component:TodoApp},
    {path:"/completed", name:"completed",component:Completed},
    {path:"/incompleted", name:"incompleted",component:Incompleted}

]
export default routes