import Vuex from 'vuex'

export default new Vuex.Store({
    state:{
        hola:0,
        generalState: 0,
        QuadrantState: 0,
    },
    mutations:{
            changeGeneralState(state){
                console.log(state.generalState);
                this.state.generalState+=1;
                console.log(state.generalState);
            },

    },
    actions:{
        next(context){
            context.commit('changeGeneralState');
        }
    }
})
