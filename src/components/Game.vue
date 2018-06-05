<template>
    <div class="flex flex-col">
        <div v-for="(row, x) in board" :key="x" class="flex">
            <div
                v-for="(cell, y) in row"
                :key="y"
                class="border flex items-center justify-center hover:bg-grey-light"
                :class="((isAvailable(x, y) && debug) ? 'bg-green-lightest ' : '') + ((cell.value === null) ? 'cursor-pointer' : 'cursor-default')"
                :style="cellSize"
                v-on="(cell.value === null) ? { click: () => setCell(x, y) } : {}"
            >
                {{ (cell.value === 0) ? 'x' : ((cell.value === 1) ? 'o' : '') }}
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
                if (this.$store.getters.cell(x, y).value === null) {
                    this.$store.commit('cell', { x, y, value: 0 })
                    this.$store.dispatch('calculateNextMove')
                }
            },
        },
        created() {
            this.$store.dispatch('initBoard')
        },
    }
</script>
