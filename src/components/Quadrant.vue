<template class="quadrant">
   <div >
		<input class="input" v-model="message">
		<input class="inputCenter" v-model="message">
    </div>
</template>

<script>
export default {
	name: 'MyQuadrant',
}
</script>

<style scoped>
.input{
	position:relative;
	left: 2%;
	top:5%;
	width:25%;
	font-size: 45PX;
	color:#aaa;
	background-color: black;
	border:4px solid #aaa;
	border-radius: 4px;
	outline:none;
	padding: 2%;
	box-sizing: border-box;
}
.input:focus {
	border-color:dodgerblue;
	box-shadow:0 0 8Px 0 dodgerblue;
}
.inputCenter {
	position:relative;
	left:15%;
	top:150px;
	font-size: 60PX;
	color:#aaa;
	width:%;
background-color:BLACK;
	border:4px solid #aaa;
	border-radius: 4px;
	outline:none;
	padding: 8px;
	box-sizing: border-box;
	padding: 2%;
}
.inputCenter:focus {
	border-color:dodgerblue;
	box-shadow:0 0 8Px 0 dodgerblue;
}
.quadrant {
	height: 100%;
	width:100%;
}
</style>