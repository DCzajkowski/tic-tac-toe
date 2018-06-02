import _ from 'lodash'

export default class AI {
    static nextMove(board) {
        this.board = board

        return { i: 1, j: 1 }
    }

    /**
     * @return Array<Object<i: int, j: int>>
     */
    static getMoves() {
        const occupied = []

        for (let i = 0; i < process.env.BOARD_SIZE; i++) {
            for (let j = 0; j < process.env.BOARD_SIZE; j++) {
                if (this.board[i][j].value !== null) {
                    occupied.push({ i, j })
                }
            }
        }

        const around = []

        for (const cell of occupied) {
            if (this.isAvailable(cell.i - 1, cell.j - 1, around)) around.push({ i: cell.i - 1, j: cell.j - 1 })
            if (this.isAvailable(cell.i - 1, cell.j + 1, around)) around.push({ i: cell.i - 1, j: cell.j + 1 })
            if (this.isAvailable(cell.i + 1, cell.j - 1, around)) around.push({ i: cell.i + 1, j: cell.j - 1 })
            if (this.isAvailable(cell.i + 1, cell.j + 1, around)) around.push({ i: cell.i + 1, j: cell.j + 1 })
            if (this.isAvailable(cell.i - 1, cell.j, around)) around.push({ i: cell.i - 1, j: cell.j })
            if (this.isAvailable(cell.i + 1, cell.j, around)) around.push({ i: cell.i + 1, j: cell.j })
            if (this.isAvailable(cell.i, cell.j - 1, around)) around.push({ i: cell.i, j: cell.j - 1 })
            if (this.isAvailable(cell.i, cell.j + 1, around)) around.push({ i: cell.i, j: cell.j + 1 })
        }

        return around
    }

    static isAvailable(i, j, selected) {
        return i >= 0
            && j >= 0
            && i < process.env.BOARD_SIZE
            && j < process.env.BOARD_SIZE
            && this.board[i][j].value === null
            && ! _.some(selected, { i, j })
    }
}
