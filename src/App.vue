<template>
  <v-app :dark="theme">
    <v-toolbar app>
      <v-toolbar-side-icon v-on:click.native.stop="drawerToggle" v-if="!blockDrawer"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn 
          flat
          router-link :to="homeRoute">
        <v-icon >home</v-icon>
        </v-btn>
        <v-btn
          flat>
          <v-icon >settings</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    
    <v-navigation-drawer 
      v-model="drawer"
      v-if="characterDrawer"
      touchless
      fixed
      temporary
      clipped
      app
      >
        <CharacterFilters></CharacterFilters>
      </v-navigation-drawer>
    <v-content>
        <router-view  id = "mainContent" ></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Vue from "vue";
import CharacterDrawer from "./components/CharacterDrawer.vue";
export default {
  name: "optc-db-app",
  components: {
    CharacterFilters: CharacterDrawer
  },
  data() {
    return {
      cordova: Vue.cordova,
      title: "OPTC-DB App",
      homeRoute: "/",
      drawer: false
    };
  },
  created() {
    var self = this;
    this.cordova.on("deviceready", () => {
      self.onDeviceReady();
    });
  },
  computed: {
    theme() {
      return this.$store.getters.getTheme;
    },
    blockDrawer() {
      return this.$store.getters.getBlockDrawer;
    },
    characterDrawer() {
      return this.$store.getters.getCharacterDrawer;
    }
  },
  methods: {
    changeTheme: function() {
      this.$store.commit("CHANGE_THEME_MODE");
    },
    toggleDrawer: function() {
      this.$store.commit("TOGGLE_DRAWER");
    },
    drawerToggle:function(){
      this.drawer = !this.drawer;
        this.toggleClass("mainContent", "over")
    },
    toggleClass: function(id, className) {
      const el = document.getElementById(id);
      el.classList.toggle(className);
    },
    onDeviceReady: function() {
      // Handle the device ready event.
      this.cordova.on("pause", this.onPause, false);
      this.cordova.on("resume", this.onResume, false);
      if (this.cordova.device.platform === "Android") {
        document.addEventListener("backbutton", this.onBackKeyDown, false);
      }
    },
    onPause() {
      // Handle the pause lifecycle event.
      console.log("pause");
    },
    onResume() {
      // Handle the resume lifecycle event.
      // SetTimeout required for iOS.
      setTimeout(function() {
        console.log("resume");
      }, 0);
    },
    onBackKeyDown() {
      // Handle the back-button event on Android. By default it will exit the app.
      navigator.app.exitApp();
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
@import url('./../node_modules/animate.css/animate.css');
body {
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
}
.footer {
  /* Apply this to v-bottom-nav if necessary. */
  margin-bottom: constant(safe-area-inset-bottom);
  margin-bottom: env(safe-area-inset-bottom);
}html {
-ms-touch-action: manipulation;
touch-action: manipulation;
}
</style>
