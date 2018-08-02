<template>
<v-card>
    <v-jumbotron  height="auto" :gradient="getTypeColorGradient(item.type)">
        <v-card-title class="characterTitle elevation-5">
            <div class="idBadge subheading">
                #{{item.id}}
            </div>
            <div class="cardName">
                <div class="title">{{item.name}}</div>
                <div class="body-1" v-if="item.subname!=null">{{item.subname}}</div>
            </div>
        </v-card-title>
    </v-jumbotron>
    <v-divider></v-divider>
    <v-layout>
        <v-flex xs4 >
            <v-card-media :src="item.image" height="150px" class="hidden-md-and-up"></v-card-media>
            <v-card-media :src="item.image" height="150px" contain class="hidden-sm-and-down"></v-card-media>
        </v-flex>
        <v-flex xs4>
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
        <v-flex xs4 class="classType-card">
            <img :src="item.class1_image" height="40px" />
            <img v-if="item.class2_image !== null" :src="item.class2_image" height="40px" />
            <v-layout row>
                <v-flex class="text-xs-center" style="font-size:15px">
                    <span 
                    v-for="(stars,n) in [1,2,3,4,5,6]"
                    :key="n"
                    >
                        <span v-if="stars <= Number.parseInt(item.stars)" style="color:#ffdd00;">★</span>
                        <span v-else-if="item.stars !== '5+' && item.stars !== '6+'" style="color:#999999;" >★</span>
                    </span>
                    <span v-if="item.stars === '5+' || item.stars === '6+'" style="color:#999999;">+</span>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row>
                <v-flex xs6>
                    <div class="font-weight-thin subheading">COST</div>
                </v-flex>
                <v-flex xs6>
                    <div class="font-weight-thin subheading">{{item.cost}}</div>
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
    data: function () {
        return {
            title_bg: require("./../../assets/img/bg-title.png"),
        };
    },
    methods: {
        getUnitDetails: function (id) {
            this.dialog = !this.dialog;
            return UnitsModule.getUnitDetails(id);
        },
        getTypeColorGradient: function (type) {
            switch (type) {
                case 'STR':
                    return 'to top right, rgb(255,0,0), rgb(255,123,123)';
                case 'QCK':
                    return 'to top right, rgb(4,62,167), rgb(137,180,212)';
                case 'DEX':
                    return 'to top right, rgb(49,85,39), rgb(78,138,62)';
                case 'INT':
                    return 'to top right, rgb(178,0,152), rgb(217,72,255)';
                case 'PSY':
                    return 'to top left,rgb(255,226,5), rgb(255,195,11)';
                case 'STR/QCK':
                    return 'to  right, rgb(255,0,0), rgb(137,180,212)';
                case 'STR/DEX':
                    return 'to right, rgb(255,0,0), rgb(78,138,62)';
                case 'QCK/STR':
                    return 'to right, rgb(4,62,167), rgb(255,0,0)';
                case 'QCK/DEX':
                    return 'to right, rgb(4,62,167), rgb(78,138,62)';
                case 'DEX/STR':
                    return 'to right, rgb(49,85,39), rgb(255,123,123)';
                case 'DEX/QCK':
                    return 'to right, rgb(49,85,39), rgb(4,62,167)';
                case 'INT/PSY':
                    return 'to right, rgb(178,0,152),rgb(255,226,5)';
                case 'PSY/INT':
                    return 'to right,rgb(255,226,5),rgb(217,72,255)';
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
    box-shadow: 0 4px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(.25, .8, .25, 1);
}

.classType-card {
    margin-top: 11px;
}

.cardBody {
    height: 130px;
    min-height: 130px;
}

.height-3 {
    height: 25%;
}

.idBadge{
    color: white;
    font-weight: bold;
    width: 100%;
    margin-top: -15px;
    margin-bottom: 5px;
    text-align: center;
}
</style>
