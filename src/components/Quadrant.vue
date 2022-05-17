<template>
  <div v-show=response >
      <h1 class="positionUp">{{short.toUpperCase()}} </h1>
      <h1 class="positionCenter">{{long.toUpperCase()}} </h1>
    </div>
   <div v-show=!response >
    <div v-show=!validateShort&&shortIsEmpty>
        <input class="positionUp inputEmpty" v-model="input">
      </div>
       <div v-show=!validateShort&&!shortIsEmpty>
         <input class="positionUp inputFail" v-model="input">
       </div>
      <div v-show=validateShort>
        <h1 class="positionUp">{{short.toUpperCase()}} ☑</h1>
      </div>
       <div v-show=!validateLong&&longIsEmpty>
         <input class="positionCenter inputEmpty" v-model="inputCenter">
       </div>
       <div v-show=!validateLong&&!longIsEmpty>
         <input class="positionCenter inputFail" v-model="inputCenter">
       </div>
       <div v-show=validateLong>
         <h1 class="positionCenter">{{long.toUpperCase()}} ☑</h1>
       </div>
    </div>
</template>

<script>

export default {
	name: 'MyQuadrant',
  props: {
    long:{
      default:"",
    },
    short:String,
    response:Boolean,
  },
  data(){
    return{
      validateShort:false,
      validateLong:false,
      shortIsEmpty:true,
      longIsEmpty:true,
      input:"",
      inputCenter:"",
    }
  },
  methods: {
    isShort: function(){
      if(this.short.toUpperCase()===this.input.toUpperCase()) {
        // eslint-disable-next-line no-unreachable
        this.validateShort=true;
      }
    },
    shortEmpty: function(){
      if(this.input.length>=1) {
        // eslint-disable-next-line no-unreachable
        this.shortIsEmpty=false;
      }
    },
    isLong: function(){
      if(this.long.toUpperCase()===this.inputCenter.toUpperCase()) {
        // eslint-disable-next-line no-unreachable
        this.validateLong=true;
      }
    },
    longEmpty: function(){
      if(this.inputCenter.length>=1) {
        // eslint-disable-next-line no-unreachable
        this.longIsEmpty=false;
      }
    },
  },
  watch:{
     input() {
      this.isShort();
      this.shortEmpty();
        },
      inputCenter(){
        this.isLong();
        this.longEmpty();
      }
    }
}
</script>

<style scoped>
h1{
  font-size: 75px;
  color:greenyellow;
}
input {
	font-size: 75PX;
	color:#aaa;
	background-color: #2C3E50;
	border:4px solid #aaa;
	border-radius: 20px;
	outline:none;
	padding: 2%;
	box-sizing: border-box;
}
.inputEmpty:focus {
	border-color:dodgerblue;
	box-shadow:0 0 8Px 0 dodgerblue;
}
.inputFail{
  color:darkred;
}
.inputFail:focus {
  border-color:darkred;
  box-shadow:0 0 8Px 0 darkred;
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
