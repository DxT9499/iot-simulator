import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        data_api: {
            base_url: '',
            api_token: 'Bearer '
        }
    },
    getters: {
        baseUrl: state => {
            return state.data_api.base_url
        },
        apiToken: state => {
            return state.data_api.api_token
        }
    },
    mutations: {
        changeDataApiUrl(state, payload) {
            state.data_api.base_url = payload
        },
        changeDataApiToken(state, payload) {
            state.data_api.api_token += payload
        }
    },
    actions: {}
});