<template>
    <div>
        <h1>About Page</h1>
        <h3>{{ data }}</h3>
        <button @click="clickMe">点我</button>
    </div>
</template>

<script>
  export default {
    name: '',
    asyncData ({ store, route }) { // 只在服务端中使用，并且只在页面级组件中有效
        //  自定义的Vue实例属性，都在vue.$options中可以拿到
      return store.dispatch('getName', 'lixiaolong');
    },
    mounted () {
      //  自定义的Vue实例属性，都在vue.$options中可以拿到
      this.$store.dispatch('getName', 'lixiaolong');
    },
  methods: {
      clickMe () {
          alert(1);
      }
  },
    computed: {
      // 从 store 的 state 对象中的获取 item。
      data () {
        return this.$store.state.name;
      }
    }
  };
</script>

<style scoped>

</style>
