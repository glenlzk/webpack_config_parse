<template>
  <div>
    <head-top :head-title="hotelName" goBack="true">
    </head-top>
    <bmap :m="giveData"></bmap>
  </div>
</template>

<script>
  import bmap from '../../components/common/bmap.vue'
  import headTop from '../../components/header/head'
  export default {
    data () {
      return {
        giveData:null,
        hotelName:null
      }
    },
    created(){
      var latitude = this.$route.query.latitude;
      var longitude = this.$route.query.longitude;
      this.hotelName = this.$route.query.hotelName;
        this.giveData={
          longitude:longitude,
          latitude:latitude
        };
    },
    components:{
      bmap,
      headTop
    }
  }
</script>
