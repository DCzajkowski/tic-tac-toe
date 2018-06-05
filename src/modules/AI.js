import _ from 'lodash'

export default class AI {
    /**
     * @param  Array<Array<Object<x: int, y: int>>> board
     */
    construct(board) {
        this.board = board
    }

    nextMove() {
        const moves = this._getMoves()

        return { x: 1, y: 1, moves }
    }

    /**
     * @return Array<Object<x: int, y: int>>
     */
    _getMoves() {
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
            if (this._isAvailable(x - 1, y - 1, around)) around.push({ x: x - 1, y: y - 1 })
            if (this._isAvailable(x - 1, y + 1, around)) around.push({ x: x - 1, y: y + 1 })
            if (this._isAvailable(x + 1, y - 1, around)) around.push({ x: x + 1, y: y - 1 })
            if (this._isAvailable(x + 1, y + 1, around)) around.push({ x: x + 1, y: y + 1 })
            if (this._isAvailable(x - 1, y, around)) around.push({ x: x - 1, y })
            if (this._isAvailable(x + 1, y, around)) around.push({ x: x + 1, y })
            if (this._isAvailable(x, y - 1, around)) around.push({ x, y: y - 1 })
            if (this._isAvailable(x, y + 1, around)) around.push({ x, y: y + 1 })
        }

        return around
    }

    _isAvailable(x, y, selected) {
        return x >= 0
            && y >= 0
            && x < process.env.BOARD_SIZE
            && y < process.env.BOARD_SIZE
            && this.board[x][y].value === null
            && ! _.some(selected, { x, y })
    }
}
