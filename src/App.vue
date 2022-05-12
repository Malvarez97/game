<template>
	<v-row class="row" :key="I" v-for="ROW,I in 2" >
		<v-col class="row" :key="index" v-for="col,index in 2">
			<MyQuadrantVue/>
		</v-col>
	</v-row>
</template>

<script>
import MyQuadrantVue from "./components/Quadrant.vue"

export default {
	components: {
		MyQuadrantVue
	},
	data: () => ({
	})
}
</script>

<style scoped>
.quadrant {
  width:50%;
  background-color: rgba(0, 0, 0);
  border-width:2px ;
  border-style:solid;
  border-color:red;
}
.row {
  width:100%;
  height: 508px;
  border:red;
  background-color: black;
  border:2px solid rgb(232, 8, 8);
}
</style>
