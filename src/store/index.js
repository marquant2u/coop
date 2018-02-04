import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'
import createPersistedState from 'vuex-persistedstate'

import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()],
    modules: {
        auth,
    },
    
    state: {
        channels_post: {},
        channel_actuel: 0,
        channels: {},
        members: {}
    },

    getters: {
        getChannelActuel: (state) => {
            return state.channel_actuel
        },
    },

    mutations: {
        renderpost(state, post) {
            state.channels_post = post
        },
        initchan(state, chan) {
            state.channel_actuel = chan
        },
        initchannel(state, chan) {
            state.channels = chan
        },
        initMembers(state, mem) {
            state.members = mem
        }
    },
    actions: {

        co_channel({
            commit
        }, channels) {
            commit('initchan', channels)
            api.get('/channels/' + channels._id + '/posts', {}).then(response => {
                commit('renderpost', response.data)
            })

        },

        create_channel({
            commit,
            dispatch
        }) {
            var value = prompt("Entrer le nom de votre channel:", "");
            var value1 = prompt("Entrer le topic de votre channel:", "");
            if (value == null || value == "") {
                alert("mauvaise valeur")
            } else {
                api.post('/channels', {
                    label: value,
                    topic: value1
                }).then(response => {
                    api.get('/channels').then((response) => {
                        commit('initchannel', response.data)
                    });
                })
            }

        },

        fillChannel({
            commit
        }, data) {
            commit('initchannel', data)
        },

        fillMembers({
            commit
        }, data) {
            commit('initMembers', data)
        },

        supp_channel({
            commit
        }, channels) {
            commit('initchan', 0)
            api.delete('/channels/' + channels._id, {}).then(response => {
                api.get('/channels').then((response) => {
                    commit('initchannel', response.data)
                });
            })
        },

        send_channel({
            commit,
            state
        }, txt) {
            console.log(txt)
            api.post('/channels/' + state.channel_actuel._id + '/posts', {
                message: txt
            }).then(response => {
                console.log('message envoyé')
                api.get('/channels/' + state.channel_actuel._id + '/posts', {}).then(response => {
                    commit('renderpost', response.data)
                })
            })
        },

        delete_post({
            commit,
            state
        }, post) {
            api.delete('/channels/' + post.channel_id + '/posts/' + post._id, {}).then(response => {
                api.get('/channels/' + post.channel_id + '/posts', {}).then(response => {
                    commit('renderpost', response.data)
                })
            })
        },

        update_post({
            commit,
            state
        }) {
            api.get('/channels/' + state.channel_actuel._id + '/posts', {}).then(response => {
                commit('renderpost', response.data)
            })
        }
    }
});
