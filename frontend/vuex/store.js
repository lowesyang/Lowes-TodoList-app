import Vue from "vue/dist/vue.min";
import Vuex from "vuex";
import Todos from "./modules/Todos";
import User from "./modules/User";
import * as actions from "./actions";
import * as getters from "./getters";

Vue.use(Vuex);

export default new Vuex.Store({
    actions,
    getters,
    modules:{
        Todos,
        User
    }
})