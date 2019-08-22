<template>
    <div>
        <h1>Home Page</h1>
        <div>我的名字叫做{{ this.$store.state.name }}</div>
    </div>

</template>

<script>
  export default {
    name: ''
  };
</script>

<style scoped lang="less">
 h1 {
     background: red;
 }
</style>
