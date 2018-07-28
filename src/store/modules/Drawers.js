const state = {
    drawer: false,
    blockDrawer: false,
    darkMode: false,
    characterDrawer: false,
}
  
 export const mutations = {
    CHANGE_THEME_MODE(state){
        state.darkMode = !state.darkMode
    },
    TOGGLE_DRAWER(state){
        state.drawer = !state.drawer
    },
    SET_BLOCK_DRAWER(state,payload){
        state.blockDrawer = payload
        if ( !payload ){
            state.drawer = false
        }
    },
    SET_CHARACTER_DRAWER(state,payload){
        state.characterDrawer = payload
    }
  }
  
export const actions = {
    someAsyncTask ({ commit }) {
      // do something async
      commit('INCREMENT_MAIN_COUNTER')
    }
}

export const getters = {
    getTheme(state){
        return state.darkMode
    },
    getDrawer(state){
        return state.drawer
    },
    getBlockDrawer(state){
        return state.blockDrawer
    },
    getCharacterDrawer(state){
        return state.characterDrawer
    }
} 

  export default {
    state,
    mutations,
    actions,
    getters
  }