export type Tile = null | false | true

export interface IState {
	theme: 'light' | 'dark'
	tileQtt: number
	paused: boolean
	tileActiveColor: string
	board: Tile[][]
	round: number
	canPlay: boolean
	time: number
	endRoundInterval: number
	screen: 'start' | 'game'
	game: 'speed' | 'memory'
	life: number
	maxLife: number
	points: number
}

/*
   Easy
   - activeTileQtt: 0.7

   Medium
   - activeTileQtt: 0.5

   Hard
   - activeTileQtt: 0.3
*/

export abstract class GameController {
	/* Show FakeBoard */
	abstract showResultBoard(board: Tile[][], updateViewBoard: (fakeBoard: Tile[][]) => void): Promise<boolean>

	/* Compare board with fakeBoard
      If is equal, return true
      Else, return false
   */
	abstract checkResult(board: Tile[][]): boolean

	/* Called when round start */
	abstract startRound(): void

	/* Check if clicked right */
	abstract activateTile(x: number, y: number): boolean
}
