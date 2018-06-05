import _ from 'lodash'

export default class AI {
    static nextMove(board) {
        this.board = board

        return { x: 1, y: 1 }
    }

    /**
     * @return Array<Object<x: int, y: int>>
     */
    static getMoves() {
        const occupied = []

        this.board.forEach((row) => {
            row.forEach(({ value, x, y }) => {
                if (value !== null) {
                    occupied.push({ x, y })
                }
            })
        })

        const around = []

        for (const { x, y } of occupied) {
            if (this.isAvailable(x - 1, y - 1, around)) around.push({ x: x - 1, y: y - 1 })
            if (this.isAvailable(x - 1, y + 1, around)) around.push({ x: x - 1, y: y + 1 })
            if (this.isAvailable(x + 1, y - 1, around)) around.push({ x: x + 1, y: y - 1 })
            if (this.isAvailable(x + 1, y + 1, around)) around.push({ x: x + 1, y: y + 1 })
            if (this.isAvailable(x - 1, y, around)) around.push({ x: x - 1, y })
            if (this.isAvailable(x + 1, y, around)) around.push({ x: x + 1, y })
            if (this.isAvailable(x, y - 1, around)) around.push({ x, y: y - 1 })
            if (this.isAvailable(x, y + 1, around)) around.push({ x, y: y + 1 })
        }

        return around
    }

    static isAvailable(x, y, selected) {
        return x >= 0
            && y >= 0
            && x < process.env.BOARD_SIZE
            && y < process.env.BOARD_SIZE
            && this.board[x][y].value === null
            && ! _.some(selected, { x, y })
    }
}
