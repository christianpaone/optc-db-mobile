<template>
<v-dialog v-model="VuexDialog" fullscreen id="dialogDetails" hide-overlay scrollable>
    <v-card>
        <v-toolbar dark class="white--text primary">
            <v-btn icon dark v-on:click.native.stop.stop="disableDialog">
                <v-icon>close</v-icon>
            </v-btn>
            <div class="text--white">
                <div class="subheading text-xs-left">{{selected_details.name}}</div>
                <div class="body-1" v-if="selected_details.subname!=null">{{selected_details.subname}}</div>
            </div>
        </v-toolbar>
        <v-card-text>
            <div>
                <v-card-media :src="selected_details.image_full" height="300px" class="imageUnselectable"></v-card-media>
                <div class="font-weight-thin display-1 text-xs-left" style="margin-top:10px;">Details</div>
                <div class="table-details elevation-4">
                    <v-layout row class="header">
                        <v-flex xs3>
                            <div class="subheading">Class</div>
                        </v-flex>
                        <v-flex xs3>
                            <div class="subheading">Type</div>
                        </v-flex>
                        <v-flex xs3>
                            <div class="subheading">Stars</div>
                        </v-flex>
                        <v-flex xs3>
                            <div class="subheading">Cost</div>
                        </v-flex>
                    </v-layout>
                    <v-divider></v-divider>
                    <v-layout row>
                        <v-flex xs3>
                            <img :src="selected_details.class1_image" height="30px" />
                            <img v-if="selected_details.class2_image !== null" :src="selected_details.class2_image" height="30px" />
                        </v-flex>
                        <v-flex xs3>
                            <img :src="selected_details.type1_image" height="30px" />
                            <img v-if="selected_details.type2_image !== null" :src="selected_details.type2_image" height="30px" />
                        </v-flex>
                        <v-flex xs3>
                            <div class="font-weight-thin tableRow title">{{selected_details.stars}}</div>
                        </v-flex>
                        <v-flex xs3>
                            <div class="font-weight-thin tableRow title">{{selected_details.cost}}</div>
                        </v-flex>
                    </v-layout>
                    <v-layout row class="header">
                        <v-flex xs3>
                            <div class="subheading">Combo</div>
                        </v-flex>
                        <v-flex xs3>
                            <div class="subheading">Slots</div>
                        </v-flex>
                        <v-flex xs3>
                            <div class="subheading">MAX lvl</div>
                        </v-flex>
                        <v-flex xs3>
                            <div class="subheading">EXP</div>
                        </v-flex>
                    </v-layout>
                    <v-divider></v-divider>
                    <v-layout row>
                        <v-flex xs3>
                            <div class="font-weight-thin tableRow title">{{selected_details.combo}}</div>
                        </v-flex>
                        <v-flex xs3>
                            <div class="font-weight-thin tableRow title">{{selected_details.slots}}</div>
                        </v-flex>
                        <v-flex xs3>
                            <div class="font-weight-thin tableRow title">{{selected_details.maxlvl}}</div>
                        </v-flex>
                        <v-flex xs3>
                            <div class="font-weight-thin tableRow title">{{formatter(selected_details.maxExp)}}</div>
                        </v-flex>
                    </v-layout>
                </div>
                <div class=" font-weight-thin display-1 text-xs-left" style="margin-top:10px;">Stats</div>
                <div class="table-details elevation-4">
                    <v-layout row class="header">
                        <v-flex xs3>
                            <div class="subheading">Level</div>
                        </v-flex>
                        <v-flex xs3>
                            <div class="subheading">HP</div>
                        </v-flex>
                        <v-flex xs3>
                            <div class="subheading">ATK</div>
                        </v-flex>
                        <v-flex xs3>
                            <div class="subheading">RCV</div>
                        </v-flex>
                    </v-layout>
                    <v-divider></v-divider>
                    <v-layout row>
                        <v-flex xs3>
                            <div class="header subheading">1</div>
                        </v-flex>
                        <v-flex xs3>
                            <div class="font-weight-thin tableRow title">{{selected_details.lvl1HP}}</div>
                        </v-flex>
                        <v-flex xs3>
                            <div class="font-weight-thin tableRow title">{{selected_details.lvl1ATK}}</div>
                        </v-flex>
                        <v-flex xs3>
                            <div class="font-weight-thin tableRow title">{{selected_details.lvl1RCV}}</div>
                        </v-flex>
                    </v-layout>              
                    <v-divider></v-divider>
                    <v-layout row>
                        <v-flex xs3>
                            <div class="header subheading">{{selected_details.maxlvl}}</div>
                        </v-flex>
                        <v-flex xs3>
                            <div class="font-weight-thin tableRow title">{{selected_details.hp}}</div>
                        </v-flex>
                        <v-flex xs3>
                            <div class="font-weight-thin tableRow title">{{selected_details.atk}}</div>
                        </v-flex>
                        <v-flex xs3>
                            <div class="font-weight-thin tableRow title">{{selected_details.rcv}}</div>
                        </v-flex>
                    </v-layout>
                    <v-divider></v-divider>
                    <v-layout row>
                        <v-flex xs3>
                            <div class="header subheading">L.Break</div>
                        </v-flex>
                        <v-flex xs3>
                            <div class="font-weight-thin tableRow title">{{selected_details.hp}}</div>
                        </v-flex>
                        <v-flex xs3>
                            <div class="font-weight-thin tableRow title">{{selected_details.atk}}</div>
                        </v-flex>
                        <v-flex xs3>
                            <div class="font-weight-thin tableRow title">{{selected_details.rcv}}</div>
                        </v-flex>
                    </v-layout>
                </div>
                <div class=" font-weight-thin display-1 text-xs-left" style="margin-top:10px;">Abilities</div>
                <div class="table-details elevation-4">
                    <v-layout row>
                        <v-flex xs12>
                            <div class="title header">Captain</div>
                        </v-flex>
                    </v-layout>
                    <v-divider></v-divider>
                    <v-layout row>
                        <v-flex xs12>
                            <div class="text-xs-left font-weight-thin subheading abilities" :inner-html.prop="selected_details.captain | decorate"></div>
                        </v-flex>
                    </v-layout>
                    <v-divider></v-divider>
                    <v-layout row>
                        <v-flex xs12>
                            <span><b>Notes:</b></span>
                            <div class="text-xs-left font-weight-thin body-1 abilities" :inner-html.prop="selected_details.captainNote | notes | decorate"></div>
                        </v-flex>
                    </v-layout>
                </div>
                <div class="table-details elevation-4">
                    <v-layout row>
                        <v-flex xs12>
                            <div class="title header">Special</div>
                        </v-flex>
                    </v-layout>
                    <v-divider></v-divider>
                    <v-layout row>
                        <v-flex xs12>
                            <div class="text-xs-left  subheading abilities" :inner-html.prop="selected_details.specialDesc.title | decorate"></div>
                            <div 
                            v-if="selected_details.specialEffect.constructor === Array" 
                            :v-for="(special, i) in selected_details.specialEffect"
                            class="text-xs-left font-weight-thin subheading abilities" :inner-html.prop="special.description | decorate">
                            </div>
                            <div v-else class="text-xs-left font-weight-thin subheading abilities" :inner-html.prop="selected_details.specialEffect | decorate"></div>
                        </v-flex>
                    </v-layout>
                    <v-divider></v-divider>
                    <v-layout row>
                        <v-flex xs12>
                            <span><b>Notes:</b></span>
                            <div class="text-xs-left font-weight-thin body-1 abilities" :inner-html.prop="selected_details.specialDesc.notes | notes | decorate"></div>
                        </v-flex>
                    </v-layout>
                    <v-divider></v-divider>
                    <v-layout row>
                        <v-flex xs12>
                            <div class="text-xs-left font-weight-thin subheading abilities"><span><b>Cooldown: </b></span>{{selected_details.cooldown.from}}<span><v-icon>arrow_forward</v-icon></span>{{selected_details.cooldown.to}}</div>
                        </v-flex>
                    </v-layout>
                </div>
            </div>
        </v-card-text>
    </v-card>
</v-dialog>
</template>

<script>
export default {
  props: ["selected_details"],
  data: function() {
    return {};
  },
  computed: {
    VuexDialog() {
      return this.$store.getters.getDialogDetails;
    }
  },
  methods: {
    disableDialog: function() {
      this.$store.commit("SET_DIALOG_DETAILS", {
        value: false
      });
    document.getElementById("dialogDetails").scrollTop=0;
    },
    formatter: function(num) {
      return CharaUtils.nFormatter(num, 2);
    }
  }
};
</script>

<style>
.table-details {
  margin-top: 10px;
  border-radius: 10px;
  border: 2px solid #cacaca;
  width: 100%;
}

.header {
  background-color: #eeeeee;
  padding-top: 5px;
  padding-bottom: 5px;
}
.tableRow{
    padding-top: 5px;
    padding-bottom: 5px;
}
.abilities {
  margin: 10px 10px 10px 10px;
}
.badge{
    color: white;
    font-weight: bold;
    margin: 2px;
    padding: 4px;
    border-radius: 6px;
}
</style>
