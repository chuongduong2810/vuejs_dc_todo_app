<template>
  <div id="app">
    <TodoApp></TodoApp>
  </div>
</template>

<script>
import TodoApp from './components/Todo.vue'


export default {
  name: 'App',
  components: {
    TodoApp
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,300;0,500;1,100;1,200&display=swap');
#app {
  font-family: 'Raleway', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h2{
  font-family: 'Raleway', sans-serif;
}
input{
  font-family: 'Raleway', sans-serif;
}
ul{
  padding: 0;
}
body {
	background: linear-gradient(-45deg, #f499ee, #ffc5db, #ff9ef4, #ff5c5c);
	background-size: 400% 400%;
	animation: gradient 15s ease infinite;
}

@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}
</style>
