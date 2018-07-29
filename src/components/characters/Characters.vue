<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm8 offset-sm2 md6 offset-md3 lg6 offset-lg3 id="charaList" v-scroll="infinite">
        <div v-for="(item,i) in Units" :key="i">
          <character-table-card :id="item.id" v-on:click.native.stop="getUnitDetails(item.id)" :item="item" class="card elevation-10" ripple />
        </div>
        <div id="last"></div>
      </v-flex>
        <character-details-dialog :selected_details="selected_detail"></character-details-dialog>
    </v-layout>
  </v-container>
</template>
<script>
import characterTableCard from "./CharacterTableCard.vue";

import CharacterDetailsDialogVue from "./CharacterDetailsDialog.vue";

export default {
  components: {
    CharacterTableCard: characterTableCard,

    CharacterDetailsDialog: CharacterDetailsDialogVue
  },

  mounted: function() {
    this.activateDrawer();
    this.$store.commit("UPDATE_SCROLL", {
      top_scroll: 0,
      bottom_scroll: 10
    });
    this.$store.commit("LOAD_UNITS");
  },

  data: function() {
    return {
      maxstars: 6,
      selected_detail: "",
      search: "",
      selected: []
    };
  },

  computed: {
    Units() {
      return this.$store.getters.getUnits.slice(this.Top, this.Bottom);
    },

    Top() {
      return this.$store.getters.getTop_Scroller;
    },

    Bottom() {
      return this.$store.getters.getBottom_Scroller;
    }
  },

  methods: {
    getUnitDetails: function(id) {
      this.$store.commit('SET_DIALOG_DETAILS', {value:!this.$store.getters.getDialogDetails})
      this.selected_detail = this.$store.getters.getUnitDetails(id)[0];
    },

    activateDrawer: function() {
      this.$store.commit("SET_BLOCK_DRAWER", false);

      this.$store.commit("SET_CHARACTER_DRAWER", true);
    },

    toggleClass: function(id, className) {
      const el = document.getElementById(id);

      el.classList.toggle(className);
    },

    addClass: function(id, className) {
      const el = document.getElementById(id);

      el.classList.add(className);
    },

    removeClass: function(id, className) {
      const el = document.getElementById(id);

      el.classList.remove(className);
    },

    docHeight: function() {
      var D = document;

      return Math.max(
        D.body.scrollHeight,

        D.documentElement.scrollHeight,

        D.body.offsetHeight,

        D.documentElement.offsetHeight,

        D.body.clientHeight,

        D.documentElement.clientHeight
      );
    },

    posY(elm) {
      var test = elm,
        top = 0;

      while (!!test && test.tagName.toLowerCase() !== "main") {
        top += test.offsetTop;

        test = test.offsetParent;
      }

      return top;
    },

    viewPortHeight() {
      var de = document.documentElement;

      if (!!window.innerWidth) {
        return window.innerHeight;
      } else if (de && !isNaN(de.clientHeight)) {
        return de.clientHeight;
      }

      return 0;
    },

    scrollY() {
      if (window.pageYOffset) {
        return window.pageYOffset;
      }

      return Math.max(
        document.documentElement.scrollTop,

        document.body.scrollTop
      );
    },

    checkvisible(elm) {
      var vpH = this.viewPortHeight(), // Viewport Height
        st = this.scrollY(), // Scroll Top
        y = this.posY(elm);

      return y > vpH + st;
    },

    infinite: function(h) {
      var check = !this.checkvisible(document.getElementById("last"));

      if (check) {
        let newBottom = this.Bottom + 10;

        this.$store.dispatch("UPDATE_SCROLL", {
          top_scroll: 0,

          bottom_scroll: newBottom
        });
      }
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons");

@import url("./../../assets/css/custom.css");

.tableNormal {
  cursor: pointer;
}

.tableNormal > tr :hover {
  background-color: azure;
}

.card {
  cursor: pointer;

  margin-bottom: 10px;

  border: 1px solid black;
}
</style>
