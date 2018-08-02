<template>
<div>
  <v-container>
    <v-layout row  class="charactersList">
      <v-flex xs12 sm8 offset-sm2 md6 offset-md3 lg6 offset-lg3 id="charaList" v-scroll="infinite">
        <div v-for="(item,i) in Units" :key="i">
          <character-table-card :id="item.id" v-on:click.native.stop="getUnitDetails(item.id)" :item="item" class="card elevation-10" ripple />
        </div>
        <div id="last" class="lastElement">
          <img v-show="!infiniteDone" :src="loadingGif" height="35px"/>
        </div>
      </v-flex>
      <character-details-dialog :selected_details="selected_detail"></character-details-dialog>
    </v-layout>
  </v-container>
    <v-bottom-nav
      :active.sync="bottomNav"
      color="primary"
      :value="true"
      fixed
    >
    <v-dialog
      v-model="menu"
    >
      <v-btn dark  slot="activator">
        <span>Order By</span>
        <v-icon>filter_list</v-icon>
      </v-btn>
      <v-card class="xs-align-left">
        <v-list>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Order By</v-list-tile-title>
              <v-list-tile-sub-title>
                <v-select
                dense
                :items="items"
                label="Field"
                v-model="select"
              ></v-select>
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-tile>
            <v-list-tile-action>
              <v-switch v-model="orderDESC" color="purple"></v-switch>
            </v-list-tile-action>
            <v-list-tile-title>Descendant</v-list-tile-title>
          </v-list-tile>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn flat @click="menu = false">Cancel</v-btn>
          <v-btn color="primary" flat v-on:click.native.stop="applyOrderBy">Apply</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-bottom-nav>
  </div>
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
    document.scrollTop = 0;
  },

  data: function() {
    return {
      selected_detail: "",
      search: "",
      bottomNav: 1,
      select:"",
      items: [
        'id','name','type','class','atk','hp','rcv','cost','slots','stars'
      ],
      loadingGif: require("./../../assets/img/loading.gif"),
      infiniteDone: true,
      menu: false,
      orderDESC: false,
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
      this.$store.commit("SET_DIALOG_DETAILS", {
        value: !this.$store.getters.getDialogDetails
      });
      this.selected_detail = this.$store.getters.getUnitDetails(id);
    },
    applyOrderBy: function(){
      this.menu = false;
      document.documentElement.scrollTop=0;
      this.$store.commit("ORDER_BY",{field:this.select, DESC:this.orderDESC});
    },
    activateDrawer: function() {
      this.$store.commit("SET_BLOCK_DRAWER", false);

      this.$store.commit("SET_CHARACTER_DRAWER", true);
    },

    toggleClass: function(id, className) {
      const el = document.getElementById(id);

      el.classList.toggle(className);
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
      if (check && this.infiniteDone ) {
        this.infiniteDone = false;
        let self = this;
        setTimeout(function() {
          let newBottom = self.Bottom + 10;
          self.$store.commit("UPDATE_SCROLL",{
              top_scroll: 0,
              bottom_scroll: newBottom
            });
          self.infiniteDone = true;
        },1000);
      }
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons");
@import url("./../../assets/css/custom.css");


.card {
  cursor: pointer;
  margin-bottom: 10px;
  border: 1px solid black;
}
.flex-toolbar {
    position: fixed;
    z-index: 1;
}
.charactersList{
}
.lastElement{
  margin-bottom: 50px;
}
</style>
