<template>
   <div >
	<div v-show=!validLetter>
			<input class="positionUp" v-model="input">
		</div>
		<div v-show=validLetter>
      <h1 class="positionUp,red">ABC ☑️</h1>
		</div>
     <div>
       <input class="positionCenter" v-model="inputCenter">
     </div>
    </div>
</template>

<script>

export default {
	name: 'MyQuadrant',
  data(){
    return{
      validLetter:false,
      input:"",
    }
  },
  methods: {
    isLetters: function(){
      if("ABC"===this.input) {
        // eslint-disable-next-line no-unreachable
        this.validLetter=true;
        console.log(this.validLetter);
      }
    },
  },
  watch:{
     input() {
      this.isLetters();
        }
    }
}
</script>

<style scoped>
h1{
  font-size: 65px;
  color:greenyellow;
}
input {
	font-size: 65PX;
	color:#aaa;
	background-color: #2C3E50;
	border:4px solid #aaa;
	border-radius: 20px;
	outline:none;
	padding: 2%;
	box-sizing: border-box;

}
.red{
  background-color: darkred;
}
input:focus {
	border-color:dodgerblue;
	box-shadow:0 0 8Px 0 dodgerblue;
}
.positionUp{
	position:relative;
	left: 2%;
	top:5%;
	width:25%;
}
.positionCenter {
	position:relative;
	left:15%;
	top:150px;
	width:50%;
	padding: 2%;
}
</style>
