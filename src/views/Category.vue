<template>
  <div class="home">
	<ul>
		<li v-for="item in list">
			<span>{{item.id}}</span>-<span>{{item.name}}</span>
		</li>
	</ul>

  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  data(){
  	return {
  		list: [],
  	}
  },
  components: {

  },
  created(){
  	this.$axios({
  		url: "/tmall/categories",
  		method: "GET"
  	}).then(res => {
  		console.log(res);
  		this.list = res.list;
  	})
  }
}
</script>
