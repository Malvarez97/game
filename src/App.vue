<template>
	<v-app fluid style="height: 100vh;">
    <div v-show="generalState==0">
        <Beginner @finishBegin="nextState"> </Beginner>
    </div>
    <div v-show="generalState==1"  >
      <Game1 @finishExcersize="nextState"> </Game1>
    </div>
    <div v-show="generalState==2" >
      <h1> 2</h1>
    </div>
    <div v-show="generalState==3" >
      <h1> 3</h1>
    </div>
    <div v-show="generalState==4" >
      <h1> 4</h1>
    </div>
    <div v-show="generalState==5" >
      <h1> 5</h1>
    </div>
    <div v-show="generalState==6" >
      <h1> 6</h1>
    </div>
	</v-app>
</template>
<script>

import Game1 from "@/Games/Game1";
import Beginner from "@/components/Beginner";
export default {
	components: {
    Beginner,
    Game1,
	},
  data(){
    return{
        generalState:0,
      }
    },
  methods: {
     nextState:function (){
       this.generalState=this.generalState+1;
       console.log(this.generalState);
     }
    }
}
</script>

<style scoped>

</style>
