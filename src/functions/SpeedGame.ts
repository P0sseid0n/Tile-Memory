import { GameController, type Tile } from '@/Types'
import { createBoard } from '@/functions/Board'

export class SpeedGameController extends GameController {
	private fakeBoard: Tile[][]
	constructor(private readonly boardSize: number) {
		super()
		this.fakeBoard = createBoard(boardSize)
	}

	showResultBoard(board: Tile[][], updateViewBoard: (newViewBoard: Tile[][]) => void): Promise<boolean> {
		return new Promise(resolve => {
			const realBoard = [...board]

			updateViewBoard(this.fakeBoard)

			setTimeout(() => {
				updateViewBoard(realBoard)
				resolve(true)
			}, 10)
		})
	}

	checkResult(board: Tile[][]): boolean {
		let win = true

		this.fakeBoard.forEach((row, i) => {
			row.forEach((tile, j) => {
				if (tile !== board[i][j]) win = false
			})
		})

		return win
	}

	private generateFakeBoard() {
		this.fakeBoard = createBoard(this.boardSize)
		const activeQtt = Math.round(this.boardSize * this.boardSize * 0.7)
		let activated = 0

		while (activated < activeQtt) {
			const x = Math.floor(Math.random() * this.boardSize)
			const y = Math.floor(Math.random() * this.boardSize)

			if (this.fakeBoard[x][y] === null) {
				this.fakeBoard[x][y] = true
				activated++
			}
		}
	}

	activateTile(x: number, y: number) {
		return this.fakeBoard[x][y] === true
	}

	public startRound() {
		this.generateFakeBoard()
	}
}
