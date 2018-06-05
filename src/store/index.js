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
            commit('board', AI.generateBoard(process.env.BOARD_SIZE))
        },
        calculateNextMove(store) {
            const ai = new AI(store.getters.board)
            const { x, y, moves } = ai.nextMove()

            store.commit('available', moves)

            store.commit('cell', {
                x,
                y,
                value: 1,
            })
        },
    },
})
