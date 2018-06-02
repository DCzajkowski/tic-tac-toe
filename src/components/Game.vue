<template>
    <div class="flex flex-col">
        <div v-for="(row, i) in board" :key="i" class="flex">
            <div
                v-for="(cell, j) in row"
                :key="j"
                class="border flex items-center justify-center"
                :class="((isAvailable(i, j) && debug) ? 'bg-green-lightest ' : '') + ((cell.value === null) ? 'cursor-pointer' : 'cursor-default')"
                :style="cellSize"
                v-on="(cell.value === null) ? { click: () => setCell(i, j) } : {}"
            >
                {{ cell.value }}
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
                return (i, j) => _.some(this.$store.getters.available, { i, j })
            },
            debug() {
                return process.env.NODE_ENV !== 'production'
            },
        },
        methods: {
            setCell(i, j) {
                if (this.$store.getters.cell(i, j).value === null) {
                    this.$store.commit('cell', { i, j, value: 'x' })
                    this.$store.dispatch('calculateNextMove')
                }
            },
        },
        created() {
            this.$store.dispatch('initBoard')
        },
    }
</script>
