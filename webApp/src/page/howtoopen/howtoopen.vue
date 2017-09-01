<template>
    <div class="howtoopenLayout">
        <head-top headTitle="如何开门" goBack="true"></head-top>
        <!--顶部end-->
        <div class="bgcolor-layout clearfix" id="app">
            <div class="howtoopen-layout">
                <img src="../../images/lock.png" alt="门锁" />
                <div class="tel">电话<a :href="getCallHref(telephoneNo)">{{telephoneNo}}</a></div>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../../components/header/head'

    export default {
        data(){
            return {
                telephoneNo:''
            }
        },
        created(){
            this.telephoneNo = this.$route.query.tel;
        },
        components: {
            headTop,
        },
        methods: {
            //电话号码拼接
            getCallHref:function(item){
                return 'tel:'+item;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .howtoopenLayout{
        height: 100%;
        background-color: #fff;
    }
    .howtoopen-layout{
        /*padding-top: 1.9rem;*/
        width: 100%;
        text-align: center;
    }
    .howtoopen-layout img{
        width: 100%;
    }
    .tel{
        color: #999;
        background-color: #fff;
        margin-top: -0.2rem;
    }
    .tel a{
        color: #21bcf5;
    }
</style>
