<template>
    <section id='foot_guide'>
      <section @click = "gotoAddress('key')" class="guide_item">
		    <svg class="icon_style">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="$route.path.indexOf('key') !== -1? '#icon-key' : '#icon-grey-key'"></use>
		    </svg>
			<span v-bind:class="[$route.path.indexOf('key') !== -1?'selectedcolor':'']">钥匙</span>
        </section>
        <section @click = "gotoAddress('search')" class="guide_item">
			<svg class="icon_style">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="$route.path.indexOf('search') !== -1? '#icon-door' : '#icon-grey-door'"></use>
			</svg>
            <span v-bind:class="[$route.path.indexOf('search') !== -1?'selectedcolor':'']">订房</span>
        </section>
        <section @click = "gotoAddress('me')" class="guide_item">
        	<svg class="icon_style">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="$route.path.indexOf('me') !== -1? '#icon-me' : '#icon-grey-me'"></use>
            </svg>
            <span v-bind:class="[$route.path.indexOf('me') !== -1?'selectedcolor':'']">我的</span>
        </section>
    </section>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
    	data(){
            return{
                activeName:'search'
            }
        },
        created(){

        },
        mounted(){

        },
        computed: {
            ...mapState([
                'geohash'
            ]),
        },
        methods: {
        	gotoAddress(path){
                this.activeName = path;
        		this.$router.push(path);
        	}
        },

    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
	.activeClass{
		color: black;
	}
    #foot_guide{
        background-color: #fff;
        position: fixed;
        z-index: 100;
        left: 0;
        right: 0;
        bottom: 0;
        @include wh(100%, 1.95rem);
        display: flex;
        box-shadow: 0 -0.026667rem 0.053333rem rgba(0,0,0,.1);
    }
    .guide_item{
    	flex: 1;
    	display: flex;
    	text-align: center;
    	flex-direction: column;
    	align-items: center;
		.icon_style{
			@include wh(.8rem, .8rem);
			margin-bottom: .2rem;
			margin-top: .3rem;
			fill: #ccc;
		}
		span{
			@include sc(.45rem, #666);
		}
    }

</style>
