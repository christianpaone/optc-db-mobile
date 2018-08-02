<template>
      <v-list class="nomargin">
        <v-list-tile v-on:click.stop="clearFilters" class="clearFilters">
          <v-list-tile-content>
            <v-list-tile-title  class="text-xs-center">CLEAR FILTERS</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
          <v-list-tile class="filterHeader" >
            <v-list-tile-title class="text-xs-center">Type Filters</v-list-tile-title>
          </v-list-tile>
            <v-flex
               v-for="(item,i) in Types"
               :key="i+'-type'"
               :class="item.width"
                v-on:click.stop="setTypeFilter(i)"
            >
                <v-list-tile class="filter" v-bind:class="item.filter+' '+item.active">    
                <v-list-tile-content>
                  <v-list-tile-title class="text-xs-center" v-text="item.filter"></v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
            </v-flex>
           <v-list-tile class="filterHeader">
            <v-list-tile-title class="text-xs-center">Class Filters</v-list-tile-title>
          </v-list-tile>
          <v-flex
               v-for="(item,i) in Classes"
               :key="i+'-class'"
               :class="item.width"               
               v-on:click.stop="setClassFilter(i)"
            >
                <v-list-tile class="filter" v-bind:class="item.filter+' '+item.active">    
                <v-list-tile-content>
                  <v-list-tile-title class="text-xs-center" v-text="item.filter"></v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
            </v-flex>
            <v-list-tile class="filterHeader">
              <v-list-tile-title class="text-xs-center">Stars Filters</v-list-tile-title>
            </v-list-tile>
            <v-flex
               v-for="(item,i) in Stars"
               :key="i+'-stars'"
               :class="item.width"
               v-on:click.stop="setStarsFilter(i)"
            >
            <v-list-tile class="filter" v-bind:class="item.active">    
                <v-list-tile-content class="text-xs-center">
                    <vue-stars 
                      v-if="item.filter !== '5+' && item.filter !== '6+'"
                      :name="'stars-'+item.filter" 
                      active-color="#ffdd00" 
                      inactive-color="#999999" 
                      shadow-color="#ffff00" 
                      hover-color="#dddd00" 
                      :max="item.value + (6 -item.value)"
                      :value="item.value"
                      readonly
                      char="★" 
                      inactive-char="" 
                      class="" />
                    <vue-stars 
                      v-else
                      :name="'stars-'+item.filter" 
                      active-color="#ffdd00" 
                      inactive-color="#999999" 
                      shadow-color="#ffff00" 
                      hover-color="#dddd00" 
                      :value="item.value-10"
                      :max="item.value-9"
                      readonly
                      char="★" 
                      inactive-char="+" 
                      class="" />
                </v-list-tile-content>
            </v-list-tile> 
            </v-flex>
              <v-list-tile class="filterHeader">
                <v-list-tile-title class="text-xs-center" >Cost Filters</v-list-tile-title>
              </v-list-tile>
              <v-list-tile >
                <v-list-tile-content class="cost">
                    <v-range-slider  
                      v-model="Cost"
                      min="1"
                      max="99"
                      style="width:100%;padding:34px 10px 0 10px"
                      thumb-label="always"
                      thumb-size="20px"
                      @input="setCostFilter(Cost)"
                    ></v-range-slider>
                </v-list-tile-content>
              </v-list-tile>
      </v-list>
</template>


<script>
import vuestars from "vue-stars";
export default {
  components: {
    "vue-stars": vuestars
  },
  data: function() {
    return {
      name: "CharacterDrawer",
      maxstars: 6
    };
  },
  computed: {
    Types: {
      get() {
        return this.$store.getters.getCharacterFilter.types;
      },
      set(i) {
        this.$store.commit("ACTIVE_FILTER", { filter: "type", index: i });
      }
    },
    Classes: {
      get() {
        return this.$store.getters.getCharacterFilter.classes;
      },
      set(i) {
        this.$store.commit("ACTIVE_FILTER", { filter: "class", index: i });
      }
    },
    Stars: {
      get() {
        return this.$store.getters.getCharacterFilter.stars;
      },
      set(i) {
        this.$store.commit("ACTIVE_FILTER", { filter: "stars", index: i });
      }
    },
    Cost: {
      get() {
        return this.$store.getters.getCharacterFilter.cost.slider;
      },
      set(input) {
        this.$store.commit("UPDATE_COST_FILTER", input);
      }
    }
  },
  methods: {
    clearFilters: function() {
      document.documentElement.scrollTop = 0;
      this.$store.commit("CLEAR_FILTERS");
    },
    setTypeFilter: function(i) {
      this.Types = i;
    },
    setClassFilter: function(i) {
      this.Classes = i;
    },
    setStarsFilter: function(i) {
      this.Stars = i;
    },
    setCostFilter: function(input) {
      this.Cost = input;
    }
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons");
@import url("./../assets/css/custom.css");
.cost {
  height: 65px;
}
</style>
