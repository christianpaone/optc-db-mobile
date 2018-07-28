<template>
    <v-card>
    <v-jumbotron dark :src="title_bg" height="auto" :gradient="getTypeColorGradient(item.type)">
        <v-card-title class="characterTitle elevation-5">
            <div>
                <div class="title">{{item.name}}</div>
                <div class="body-1" v-if="item.subname!=null">{{item.subname}}</div>
            </div>
        </v-card-title>
    </v-jumbotron>
        <v-divider></v-divider>
            <v-layout >
                <v-flex xs4>
                    <v-card-media
                      :src="item.image"
                      height="150px"
                      class="hidden-md-and-up"
                    ></v-card-media>
                    <v-card-media
                      :src="item.image"
                      height="150px"
                      contain
                      class="hidden-sm-and-down"
                    ></v-card-media>
                </v-flex> 
                <v-flex xs4 >
                <v-layout row class="height-3">
                    <v-flex xs6>
                    <div class="font-weight-thin subheading">HP</div>
                    </v-flex>
                    <v-flex xs6>
                    <div class="font-weight-thin subheading">{{item.hp}}</div>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row class="height-3">
                    <v-flex xs6>
                    <div class="font-weight-thin subheading">ATK</div>
                    </v-flex>
                    <v-flex xs6>
                    <div class="font-weight-thin subheading">{{item.atk}}</div>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row class="height-3">
                    <v-flex xs6>
                    <div class="font-weight-thin subheading">RCV</div>
                    </v-flex>
                    <v-flex xs6>
                    <div class="font-weight-thin subheading">{{item.rcv}}</div>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row class="height-3">
                    <v-flex xs6>
                    <div class="font-weight-thin subheading">CMB</div>
                    </v-flex>
                    <v-flex xs6>
                    <div class="font-weight-thin subheading">{{item.combo}}</div>
                    </v-flex>
                </v-layout>
                </v-flex>
                <div>
                <v-divider vertical></v-divider>
                </div>
                <v-flex xs4>
                    <v-layout row class="classType-card">
                        <v-flex xs6 class="text-xs-right">
                        <img :src="item.class1_image" height="40px"/>
                        </v-flex>
                        <v-flex xs6 class="text-xs-left">
                        <img v-if="item.class2_image !== null" :src="item.class2_image" height="40px"/>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex class="text-xs-center" >
                            <vue-stars
                                v-if="String(item.stars) !== '5+' && String(item.stars) !== '6+'"
                                :name="'stars-table-'+item.stars+'-'+item.id" 
                                active-color="#ffdd00" 
                                inactive-color="#999999" 
                                shadow-color="#ffff00" 
                                hover-color="#dddd00" 
                                :max="item.stars + (6 - item.stars)"
                                :value="item.stars"
                                readonly
                                char="★" 
                                inactive-char="" 
                            />
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
    </v-card>
</template>

<script>
import vuestars from "vue-stars";
export default {
  components: {
    "vue-stars": vuestars
  },
  props: ["item"],
  data: function() {
    return {
        title_bg: require("./../../assets/img/bg-title.png"),
    };
  },
  methods:{
    getUnitDetails: function(id) {
      this.dialog = !this.dialog;
      return UnitsModule.getUnitDetails(id);
    },
    getTypeColorGradient:function(type){
        switch(type){
            case 'STR':
                return 'to top right, rgb(255,0,0,.6), rgb(255,123,123,.6)';
            case 'QCK':
                return 'to top right, rgb(4,62,167,.6), rgb(137,180,212,.6)'
            case 'DEX':
                return 'to top right, rgb(49,85,39,.6), rgb(78,138,62,.6)'
            case 'INT':
                return 'to top right, rgb(178,0,152,.6), rgb(217,72,255,.6)'
            case 'PSY':
                return 'to top left, rgb(255,220,9.6), rgb(255,244,135,.6)'
        }
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons");
@import url('./../../../node_modules/animate.css/animate.css');


.characterTitle {
  width: 100%;
  color: aliceblue;
  text-align: left;
    box-shadow: 0 4px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}

.cardimage{
    border-bottom-left-radius: 5px;
}

.classType-card{
    margin-top: 5px;
}
.cardBody{
    height: 130px;
    min-height: 130px;
}
.height-3{
    height: 25%;
}
</style>
