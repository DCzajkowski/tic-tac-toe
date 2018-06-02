import Vue from 'vue'
Vue.config.devtools = true

import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        board: [],
    },
    mutations: {
        board(state, board) {
            state.board = board
        },
        cell(state, { i, j, value }) {
            state.board[i][j].value = value
        },
    },
    getters: {
        board(state) {
            return state.board
        },
        cell(state) {
            return (i, j) => state.board[i][j]
        },
    },
    actions: {
        initBoard({ commit }) {
            let board = []

            for (let i = 0; i < 100; i++) {
                board[i] = []
                for (let j = 0; j < 100; j++) {
                    board[i][j] = { value: null }
                }
            }

            commit('board', board)
        },
        calculateNextMove({ commit }) {
            commit('cell', {
                i: 0,
                j: 0,
                value: 'o',
            })
        },
    },
})
