import Vue from 'vue'
Vue.config.devtools = true

import Vuex from 'vuex'
Vue.use(Vuex)

import AI from '@/modules/AI'

export default new Vuex.Store({
    state: {
        board: [],
        available: [],
    },
    mutations: {
        board(state, board) {
            state.board = board
        },
        available(state, available) {
            state.available = available
        },
        cell(state, { i, j, value }) {
            state.board[i][j].value = value
        },
    },
    getters: {
        available(state) {
            return state.available
        },
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

            for (let i = 0; i < process.env.BOARD_SIZE; i++) {
                board[i] = []
                for (let j = 0; j < process.env.BOARD_SIZE; j++) {
                    board[i][j] = { value: null }
                }
            }

            commit('board', board)
        },
        calculateNextMove(store) {
            const { i, j } = AI.nextMove(store.getters.board)

            store.commit('available', AI.getMoves())

            store.commit('cell', {
                i,
                j,
                value: 'o',
            })
        },
    },
})
