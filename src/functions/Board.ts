import type { Tile } from '@/Types'

export function createBoard(size: number) {
	const board: Tile[][] = []
	for (let i = 0; i < size; i++) {
		board[i] = new Array(size).fill(null)
	}
	return board
}

export function getTrueQttBoard(board: Tile[][]) {
	let qtt = 0
	board.forEach(row => {
		row.forEach(tile => {
			if (tile === true) {
				qtt++
			}
		})
	})
	return qtt
}
