<template>
	<v-app fluid style="height: 99vh;">
	<v-row :key="I" v-for="I in 2" >
		<v-col class="row" :key="index" v-for="index in 2">
			<MyQuadrantVue :long=long+I+index :short=short+I+index />
		</v-col>
	</v-row>
	</v-app>

</template>

<script>
import MyQuadrantVue from "./components/Quadrant.vue"

export default {
	components: {
		MyQuadrantVue
	},
  setup(){

    let short = "a";
    let long="palabra"

    return {
      short,
      long
    }
  },
	data: () => ({
	})
}
</script>

<style scoped>
.row {
  background-color: #2C3E50;
  border:red;
  border:2px solid rgb(232, 8, 8);
}
.container {
  background-color: gray;
  height: 100%;
}
</style>
