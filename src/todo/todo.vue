<template>
  <section class="real-app">
    <input
      type="text"
      class="add-text"
      autofocus="autofocus"
      placeholder="接下去要做什么？"
      @keyup.enter="addTodo">
      <Item 
        :todo="todo"
        v-for="todo in filteredTodos"
        :key="todo.id"
        @delete="deleteTodo" />
      <Tabs 
        :filter="filter" 
        :todos="todos"
        @toggle="toggleFilter"
        @clearAllCompleted="clearAllCompleted" />
  </section>
</template>

<script>
import Item from './item.vue'
import Tabs from './tabs.vue'

let id = 0;

export default {
  data() {
    return {
      todos: [],
      filter: 'all'
    }
  },
  components: {
    Item,
    Tabs
  },
  methods: {
    addTodo(e) {
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim(),
        completed: false
      });

      e.target.value = '';
    },
    deleteTodo(id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1);
    },
    toggleFilter(state) {
      this.filter = state;
    },
    clearAllCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed);
    }
  },
  computed: {
    filteredTodos() {
      if (this.filter === 'all')
      {
        return this.todos;
      }

      const completed = this.filter === 'completed';
      return this.todos.filter(todo => completed === todo.completed);
    }
  }
}
</script>

<style lang="css" scoped>
  .real-app {
    width: 600px;
    margin: 0 auto;
    box-shadow: 0 0 5px #666;
  }

  .add-text {
    position: relative;
    width: 100%;
    font-size: 24px;
    line-height: 1.4em;
    outline: none;
    border: 1px solid #999;
    box-sizing: border-box;
    padding: 16px 16px 16px 60px;
  }
</style>