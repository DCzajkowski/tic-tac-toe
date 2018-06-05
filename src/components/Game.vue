<template>
    <div class="flex flex-col">
        <div v-for="(row, x) in board" :key="x" class="flex">
            <div
                v-for="(cell, y) in row"
                :key="y"
                class="border flex items-center justify-center"
                :class="((isAvailable(x, y) && debug) ? 'bg-green-lightest ' : '') + ((cell.player === null) ? 'cursor-pointer hover:bg-grey-light' : 'cursor-default')"
                :style="cellSize"
                v-on="(cell.player === null) ? { click: () => setCell(x, y) } : {}"
            >
                {{ (cell.player === 0) ? 'x' : ((cell.player === 1) ? 'o' : '') }}
            </div>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash'

    export default {
        name: 'Game',
        computed: {
            board() {
                return this.$store.getters.board
            },
            cellSize() {
                const size = window.innerWidth / 100 + 'px'

                return `width: ${size}; height: ${size}`
            },
            isAvailable() {
                return (x, y) => _.some(this.$store.getters.available, { x, y })
            },
            debug() {
                return process.env.NODE_ENV !== 'production'
            },
        },
        methods: {
            setCell(x, y) {
                this.$store.commit('cell', { x, y, player: 0 })
                this.$store.dispatch('calculateNextMove')
            },
        },
        created() {
            this.$store.dispatch('initBoard')
        },
    }
</script>
