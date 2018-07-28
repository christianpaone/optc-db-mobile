<template>
<v-container>
  <v-layout row>
    <v-flex xs12 sm8 offset-sm2 md6 offset-md3 lg6 offset-lg3 style="position:absolute;">
        <v-text-field
          class="text-xs-right"
          v-model="search"
          placeholder="Search..."
          single-line
          append-icon="search"
          color="white"
          />
    </v-flex>
  </v-layout>
  <v-layout row>
        <v-flex xs12 sm8 offset-sm2 md6 offset-md3 lg6 offset-lg3 id="charaList" class="charaList" v-scroll:#charaList="infinite">
          <div
            v-for="(item,i) in Units"
            :key="i"
            >
                <character-table-card 
                  :id="item.id"
                  v-on:click.native="getUnitDetails(item.id)"
                  :item="item" 
                  class="card"
                  ripple
                />
          </div>
           <div id="last"></div>
        </v-flex>
       <v-dialog
        v-model="dialog"
        max-width="800px" hide-overlay 
        >
      <v-card>
        <v-toolbar dark class="white--text primary" >
          <v-btn icon dark @click.native="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>{{selected_details.name}}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <div>
            <v-flex text-xs-center>
              <img :src=selected_details.image width="350px" height="300px">
            </v-flex>
            <v-flex text-xs-center text-sm-center text-md-left text-lg-left><h1>Details</h1></v-flex>
            <v-divider></v-divider>
            <v-flex row>
              <v-list three-line subheader>
                  <v-list-tile avatar>
                    <v-list-tile-content>
                      <v-list-tile-title><div class="font-weight-thin subheading">Class</div></v-list-tile-title>
                      <v-list-tile-sub-title><h3>{{selected_details.class}}</h3></v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-content>
                      <v-list-tile-title><div class="font-weight-thin subheading">Type</div></v-list-tile-title>
                      <v-list-tile-sub-title><h3>{{selected_details.type}}</h3></v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-content>
                      <v-list-tile-title><div class="font-weight-thin subheading">Stars</div></v-list-tile-title>
                      <v-list-tile-sub-title><h3>{{selected_details.stars}}</h3></v-list-tile-sub-title>
                    </v-list-tile-content>                    
                    <v-list-tile-content>
                      <v-list-tile-title><div class="font-weight-thin subheading">Cost</div></v-list-tile-title>
                      <v-list-tile-sub-title><h3>{{selected_details.cost}}</h3></v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile avatar>
                  </v-list-tile>
                </v-list>
            </v-flex>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</v-container>
</template>
<script>
import characterTableCard from "./CharacterTableCard.vue";
export default {
  components: {
    "character-table-card": characterTableCard
  },
  mounted: function() {
    this.activateDrawer();
    this.$store.commit("UPDATE_SCROLL", {top_scroll:0,bottom_scroll:10})
    this.$store.commit("LOAD_UNITS");
  },
  data: function() {
    return {
      dialog: false,
      maxstars: 6,
      selected_details: "",
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
      this.toggleClass(id, "elevation-10");
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
}
.charaList{
    height: 86%;
    width: 92%;
    padding: 0px;
    position: absolute;
    overflow: scroll;
}
</style>
