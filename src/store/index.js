import Vue from 'vue'
import Vuex from 'vuex'
import Config from './modules/Config'

Vue.use(Vuex);
const debug = process.env.NODE_ENV != 'production'

export default new Vuex.Store({
    modules:{
        Config
    },
    strict:debug
});