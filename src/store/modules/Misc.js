const state = {
  drawer: false,
  blockDrawer: false,
  dialogDetails: false,
  darkMode: false,
  characterDrawer: false
}

const mutations = {
  CHANGE_THEME_MODE (state) {
    state.darkMode = !state.darkMode
  },
  TOGGLE_DRAWER (state) {
    state.drawer = !state.drawer
  },
  SET_BLOCK_DRAWER (state, payload) {
    state.blockDrawer = payload
    if (!payload) {
      state.drawer = false
    }
  },
  SET_CHARACTER_DRAWER (state, payload) {
    state.characterDrawer = payload
  },
  SET_DIALOG_DETAILS (state, payload) {
    state.dialogDetails = payload.value
  }
}

const actions = {
  someAsyncTask ({
    commit
  }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  }
}

const getters = {
  getTheme (state) {
    return state.darkMode
  },
  getDrawer (state) {
    return state.drawer
  },
  getBlockDrawer (state) {
    return state.blockDrawer
  },
  getCharacterDrawer (state) {
    return state.characterDrawer
  },
  getDialogDetails (state) {
    return state.dialogDetails
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
