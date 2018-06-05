import Vue from 'vue'
Vue.config.devtools = true

import Vuex from 'vuex'
Vue.use(Vuex)

import AI from '@/modules/AI'

export default new Vuex.Store({
    state: {
        board: [],
        available: [],
        occupied: [],
    },
    mutations: {
        board(state, board) {
            state.board = board
        },
        available(state, available) {
            state.available = available
        },
        occupied(state, occupied) {
            state.occupied = occupied
        },
        cell(state, { x, y, player }) {
            state.board[x][y].player = player
            state.occupied.push({ x, y, player })
        },
    },
    getters: {
        available(state) {
            return state.available
        },
        board(state) {
            return state.board
        },
        occupied(state) {
            return state.occupied
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
            const ai = new AI(
                JSON.parse(JSON.stringify(store.getters.board)),
                JSON.parse(JSON.stringify(store.getters.occupied))
            )
            const { x, y, moves } = ai.nextMove()

            store.commit('available', moves)

            store.commit('cell', {
                x,
                y,
                player: 1,
            })
        },
    },
})
