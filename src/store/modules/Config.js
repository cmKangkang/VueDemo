import Vue from 'vue'
import commonJs from '@/utils/Common'

const config = {
    state: {
        testInfo: {
            a: 1,
        }
    },

    mutations: {
        setTestInfo: (state, testInfo) => {
            let info = commonJs.clone(testInfo);
            Vue.set(state,"testInfo",info)
        },
    },

    actions: {
        setTestInfo: function (context, status) {
          context.commit("setTestInfo", status)
        },
    },

    getters: {
        configMode: (state) => state.testInfo,
    }
}

export default config