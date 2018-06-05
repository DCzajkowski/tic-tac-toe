import _ from 'lodash'

const PLAYER = 0
const COMPUTER = 1

export default class AI {
    /**
     * @param  Array<Array<Object<x: int, y: int, player: int?>>> board
     * @param  Array<Object<x: int, y: int, player: int?>> occupied
     */
    constructor(board, occupied) {
        this.board = board.map((cell) => {
            cell.value = 0
            return cell
        })
        this.occupied = occupied
    }

    /**
     * @return Object<x: int, y: int, moves: Array<Object<x: int, y: int, value: int, player: int?>>>
     */
    nextMove() {
        const moves = this._getMoves(this.occupied) // Array<Object<x: int, y: int>>

        const choices = [] // Array<Object<x: int, y: int, value: int>>

        moves.forEach((move) => {
            choices.push({
                x: move.x,
                y: move.y,
                value: this.minmax(move, 0),
            })
        })

        const bestMove = _.maxBy(choices, 'value') || choices[0] // Object<x: int, y: int, value: int>

        return {
            x: bestMove.x,
            y: bestMove.y,
            moves,
        }
    }

    /**
     * @param  Object<x: int, y: int> move
     * @param  int level Even means computer's move, odd player's move
     * @return int
     */
    minmax(move, level) {
        const m = {
            x: move.x,
            y: move.y,
            player: this._getPlayerFromLevel(level),
        }

        if (level === 2) {
            this._set(m)

            const value = this._heuristicValue(this.board)

            this._rm(m)

            return value
        }

        const moves = this._getMoves(this.occupied) // Array<Object<x: int, y: int>>

        this._set(m)

        const choices = [] // Array<Object<x: int, y: int, value: int>>

        moves.forEach((move) => {
            choices.push({
                x: move.x,
                y: move.y,
                value: this.minmax(move, level + 1),
            })
        })

        this._rm(m)

        const maxChoice = _.maxBy(choices, 'value')
        const minChoice = _.minBy(choices, 'value')

        if (level % 2 === 1) {
            return maxChoice ? maxChoice.value : choices[0]
        } else {
            return minChoice ? minChoice.value : choices[0]
        }
    }

    _heuristicValue(board) {
        return _.random(1, 100)
    }

    _getPlayerFromLevel(level) {
        return (level % 2 === 0) ? COMPUTER : PLAYER
    }

    _set(m) {
        this.occupied.push(m)
        this.board[m.x][m.y].player = m.player
    }

    _rm(m) {
        _.remove(this.occupied, m)
        this.board[m.x][m.y].player = null
    }

    /**
     * @param  int n Size of the board
     * @return Array<Array<Object<x: int, y: int, player: int?>>>
     */
    static generateBoard(n) {
        let board = []

        for (let x = 0; x < n; x++) {
            board[x] = []
            for (let y = 0; y < n; y++) {
                board[x][y] = { x, y, player: null }
            }
        }

        return board
    }

    /**
     * @param  Array<Object<x: int, y: int, player: int?>> occupied
     * @return Array<Object<x: int, y: int>>
     */
    _getMoves(occupied) {
        const around = [] // Array<Object<x: int, y: int>>

        for (const { x, y } of occupied) {
            for (let r = 1; r <= 1; r++) {
                if (this._isAvailable(x - r, y - r, around)) around.push({ x: x - r, y: y - r })
                if (this._isAvailable(x - r, y + r, around)) around.push({ x: x - r, y: y + r })
                if (this._isAvailable(x + r, y - r, around)) around.push({ x: x + r, y: y - r })
                if (this._isAvailable(x + r, y + r, around)) around.push({ x: x + r, y: y + r })
                if (this._isAvailable(x - r, y, around)) around.push({ x: x - r, y })
                if (this._isAvailable(x + r, y, around)) around.push({ x: x + r, y })
                if (this._isAvailable(x, y - r, around)) around.push({ x, y: y - r })
                if (this._isAvailable(x, y + r, around)) around.push({ x, y: y + r })
            }
        }

        return around
    }

    _isAvailable(x, y, occupied) {
        return x >= 0
            && y >= 0
            && x < process.env.BOARD_SIZE
            && y < process.env.BOARD_SIZE
            && this.board[x][y].player === null
            && ! _.some(occupied, { x, y })
    }
}
