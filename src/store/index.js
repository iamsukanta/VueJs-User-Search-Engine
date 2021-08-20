import { createStore } from 'vuex';
import axios from 'axios';

export default createStore ({
    state: {
        users: [],
    },

    getters : {
        users: state => state.users
    },

    mutations: {
        setUsers(state, payload) {
            state.users = payload;
        }
    },

    actions: {
        getUsers({ commit }) {
            axios.get("https://6103057679ed680017482413.mockapi.io/users")
            .then(response => {
                console.log(response.data, 'llll');
                commit('setUsers', response.data);
            }).catch(() => {
                commit('setUsers', []);
            });
        },

        searchUserByName({ commit }, payload) {
            axios.get(`https://6103057679ed680017482413.mockapi.io/users?name=${payload}`)
            .then(response => {
                console.log(response.data, 'llll');
                commit('setUsers', response.data);
            }).catch(() => {
                commit('setUsers', []);
            });
        },

        updateUser({ dispatch }, payload) {
            axios.put(`https://6103057679ed680017482413.mockapi.io/users/${payload.id}`, payload)
            .then(() => {
                dispatch('getUsers');
            }).catch(() => {
                dispatch('getUsers');
            });
        },

        deleteUser({ dispatch }, payload) {
            axios.delete(`https://6103057679ed680017482413.mockapi.io/users/${payload}`)
            .then(() => {
                dispatch('getUsers');
            }).catch(() => {
                dispatch('getUsers');
            });
        }
    }   
})
