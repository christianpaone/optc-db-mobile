<template>
<v-dialog v-model="VuexDialog" fullscreen class="details" hide-overlay scrollable>
    <v-card>
        <v-toolbar dark class="white--text primary">
            <v-btn icon dark v-on:click.native.stop.stop="disableDialog">
                <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>
                <div class="subheading text-xs-left">{{selected_details.name}}</div>
                <div class="body-1" v-if="selected_details.subname!=null">{{selected_details.subname}}</div>
            </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <div>
                <v-card-media :src="selected_details.image_full" height="300px" class="hidden-md-and-up"></v-card-media>
                <div class="font-weight-thin display-1 text-xs-left" style="margin-top:10px;">Details</div>
                <v-layout class="table-details elevation-4">
                    <v-layout row>
                        <v-flex xs3>
                            <div class="headline header">Class</div>
                            <v-divider></v-divider>
                            <img :src="selected_details.class1_image" height="30px" />
                            <img v-if="selected_details.class2_image !== null" :src="selected_details.class2_image" height="30px" />
                        </v-flex>
                        <v-flex xs3>
                            <div class="headline header">Type</div>
                            <v-divider></v-divider>
                            <img :src="selected_details.type1_image" height="30px" />
                            <img v-if="selected_details.type2_image !== null" :src="selected_details.type2_image" height="30px" />
                        </v-flex>
                        <v-flex xs3>
                            <div class="headline header">Stars</div>
                            <v-divider></v-divider>
                            <div class="font-weight-thin headline">{{selected_details.stars}}</div>
                        </v-flex>
                        <v-flex xs3>
                            <div class=" headline header">Cost</div>
                            <v-divider></v-divider>
                            <div class="font-weight-thin headline">{{selected_details.cost}}</div>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs3>
                            <div class="headline header">Combo</div>
                            <v-divider></v-divider>
                            <div class="font-weight-thin headline">{{selected_details.combo}}</div>
                        </v-flex>
                        <v-flex xs3>
                            <div class="headline header">Slots</div>
                            <v-divider></v-divider>
                            <div class="font-weight-thin headline">{{selected_details.slots}}</div>
                        </v-flex>
                        <v-flex xs3>
                            <div class="headline header">MAX lvl</div>
                            <v-divider></v-divider>
                            <div class="font-weight-thin headline">{{selected_details.maxlvl}}</div>
                        </v-flex>
                        <v-flex xs3>
                            <div class=" headline header">EXP</div>
                            <v-divider></v-divider>
                            <div class="font-weight-thin headline">{{formatter(selected_details.maxExp)}}</div>
                        </v-flex>
                    </v-layout>
                </v-layout>
                <div class=" font-weight-thin display-1 text-xs-left" style="margin-top:10px;">Stats</div>
                <v-layout class="table-details elevation-4">
                    <v-layout row>
                        <v-flex xs3>
                            <div class="headline header">Level</div>
                            <v-divider></v-divider>
                            <div class="headline">1</div>
                            <v-divider></v-divider>
                            <div class="headline">99</div>
                            <v-divider></v-divider>
                            <div class="headline">L.Break</div>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs3>
                            <div class="headline header">HP</div>
                            <v-divider></v-divider>
                            <div class="font-weight-thin headline">{{selected_details.lvl1HP}}</div>
                            <v-divider></v-divider>
                            <div class="font-weight-thin headline">{{selected_details.hp}}</div>
                            <v-divider></v-divider>
                            <div class="font-weight-thin headline">...</div>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs3>
                            <div class="headline header">ATK</div>
                            <v-divider></v-divider>
                            <div class="font-weight-thin headline">{{selected_details.lvl1ATK}}</div>
                            <v-divider></v-divider>
                            <div class="font-weight-thin headline">{{selected_details.atk}}</div>
                            <v-divider></v-divider>
                            <div class="font-weight-thin headline">...</div>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs3>
                            <div class=" headline header">RCV</div>
                            <v-divider></v-divider>
                            <div class="font-weight-thin headline">{{selected_details.lvl1RCV}}</div>
                            <v-divider></v-divider>
                            <div class="font-weight-thin headline">{{selected_details.rcv}}</div>
                            <v-divider></v-divider>
                            <div class="font-weight-thin headline">...</div>
                            <v-divider></v-divider>
                        </v-flex>
                    </v-layout>
                </v-layout>
                <div class=" font-weight-thin display-1 text-xs-left" style="margin-top:10px;">Abilities</div>
                <v-layout class="table-details elevation-4">
                    <v-layout row>
                        <v-flex xs12>
                            <div class="headline header">Captain</div>
                            <v-divider></v-divider>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12>
                            <div class="text-xs-left font-weight-thin subheading abilities">{{selected_details.captain}}</div>
                        </v-flex>
                    </v-layout>
                </v-layout>
                <v-layout class="table-details elevation-4">
                    <v-layout row>
                        <v-flex xs12>
                            <div class="headline header">Special</div>
                            <v-divider></v-divider>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12>
                            <div class="text-xs-left  subheading abilities abilitiesLabel">{{selected_details.special.title}}</div>
                            <div class="text-xs-left font-weight-thin subheading abilities">{{selected_details.special.effect}}</div>
                        </v-flex>
                    </v-layout>
                </v-layout>
            </div>
        </v-card-text>
    </v-card>
</v-dialog>
</template>

<script>
import Utilities from './../../assets/js/utilities.js';
export default {
    props: ["selected_details"],
    data: function () {
        return {}
    },
    computed: {
        VuexDialog() {
            return this.$store.getters.getDialogDetails;
        }
    },
    methods: {
        disableDialog: function () {
            this.$store.commit('SET_DIALOG_DETAILS', {
                value: false
            })
        },
        formatter: function (num) {
            return Utilities.nFormatter(num, 2);
        }
    }
};
</script>

<style>
.table-details {
    margin-top: 10px;
    border-radius: 10px;
    border: 2px solid #cacaca;
    display: inline-block;
    width: 100%;
}

.header {
    background-color: #f9f9f9;
}
.abilities{
    margin-left: 10px;
    margin-bottom: 10px;
    margin-top: 10px;
}
.abilitiesLabel{

}
</style>
