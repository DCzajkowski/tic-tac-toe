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
        cell(state, { x, y, value }) {
            state.board[x][y].value = value
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
            return (x, y) => state.board[x][y]
        },
    },
    actions: {
        initBoard({ commit }) {
            let board = []

            for (let x = 0; x < process.env.BOARD_SIZE; x++) {
                board[x] = []
                for (let y = 0; y < process.env.BOARD_SIZE; y++) {
                    board[x][y] = { x, y, value: null }
                }
            }

            commit('board', board)
        },
        calculateNextMove(store) {
            const { x, y } = AI.nextMove(store.getters.board)

            store.commit('available', AI.getMoves())

            store.commit('cell', {
                x,
                y,
                value: 1,
            })
        },
    },
})
