import { defineStore } from 'pinia'
import type { GameController, IState, Tile } from '@/Types'
import SpeedGameController from '@/functions/SpeedGame'
import { createBoard } from '@/functions/Board'

const colors = [
	'#1ABC9C',
	'#2ECC71',
	'#3498DB',
	'#9B59B6',
	'#34495E',
	'#16A085',
	'#27AE60',
	'#2980B9',
	'#8E44AD',
	'#512DA8',
	'#2C3E50',
	'#F1C40F',
	'#E67E22',
	'#E74C3C',
	'#F39C12',
	'#D35400',
	'#C0392B',
]

export const useGameStore = defineStore({
	id: 'game',
	state: (): IState => ({
		theme: 'light',
		paused: false,
		tileQtt: 4,
		tileActiveColor: '',
		board: [],
		round: 1,
		canPlay: false,
		time: 0,
		endRoundInterval: 0,
		screen: 'start',
		game: 'speed',
		life: 3,
		maxLife: 3,
		points: 0,
	}),
	actions: {
		changeScreen(screen: IState['screen']) {
			this.screen = screen
		},
		toggleTheme() {
			return (this.theme = this.theme === 'light' ? 'dark' : 'light')
		},
		togglePaused() {
			return (this.paused = !this.paused)
		},
		startGame(options?: { tileQtt?: number; game?: IState['game'] }) {
			this.screen = 'game'

			this.tileQtt = options?.tileQtt ?? this.tileQtt
			this.points = 0
			this.life = this.maxLife
			this.time = 0
			this.tileActiveColor = colors[Math.floor(Math.random() * colors.length)]
			this.canPlay = false
			this.paused = true
			this.game = options?.game ?? this.game

			this.board = createBoard(this.tileQtt)
			setTimeout(() => this.startRound(), 750)
		},

		async startRound() {
			this.gameController.startRound()
			clearTimeout(this.endRoundInterval)

			this.tileActiveColor = colors[Math.floor(Math.random() * colors.length)]

			await this.gameController.showResultBoard(this.board, newViewBoard => {
				this.board = newViewBoard
			})

			this.time = 3
			this.paused = false
			this.canPlay = true

			this.endRoundInterval = setInterval(() => {
				if (this.paused) return

				if (this.time <= 0) {
					this.decreaseLife()
					if (this.life > 0) this.startRound()
					return
				}

				this.time -= 1
			}, 1000)
		},

		activateTile(x: number, y: number) {
			if (!this.canPlay) return

			this.board[x][y] = this.gameController.activateTile(x, y)

			if (!this.board[x][y]) this.decreaseLife()

			if (this.gameController.checkResult(this.board)) {
				//* Adicionar pontos
				this.points += 10

				this.paused = true
				this.canPlay = false

				setTimeout(() => {
					this.board = createBoard(this.tileQtt)
					setTimeout(this.startRound, 1000)
				}, 500)
			}
		},

		decreaseLife() {
			this.life--

			if (this.life <= 0) {
				clearTimeout(this.endRoundInterval)
			}
		},
	},

	getters: {
		timeDisplay(state) {
			const minutes = Math.floor(state.time / 60)
			const seconds = state.time - minutes * 60
			return minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0')
		},

		gameController(state): GameController {
			return new SpeedGameController(state.tileQtt)
		},
	},
})
