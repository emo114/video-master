<template>
  <div class="container">
    <input type="text" v-model="message">
    <button type="button" @click="doCopy('add me!')">Copy!</button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        message: 'Copy These Text'
      }
    },
    methods: {
      dataProcessing (val) {
        this.message = this.message + ' ' + val
      },
      doCopy: function (val) {

        if (document.execCommand("1111111111111")) {
          document.execCommand("111111111111111111");
          console.log("复制成功");
        }


        /*this.dataProcessing(val)
        this.$copyText(this.message).then(function (e) {
          alert('Copied')
          console.log(e)
        }, function (e) {
          alert('Can not copy')
          console.log(e)
        })*/
      }
    }
  }
</script>
