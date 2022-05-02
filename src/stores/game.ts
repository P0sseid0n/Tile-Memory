import { defineStore } from 'pinia'

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
	'#2C3E50',
	'#F1C40F',
	'#E67E22',
	'#E74C3C',
	'#F39C12',
	'#D35400',
	'#C0392B',
]

function createBoard(size: number) {
	const board: Tile[][] = []
	for (let i = 0; i < size; i++) {
		board.push([])
		for (let j = 0; j < size; j++) {
			board[i].push(null)
		}
	}
	return board
}

type Tile = null | false | true

interface Types {
	theme: 'light' | 'dark'
	tileQtt: number
	paused: boolean
	tileActiveColor: string
	board: {
		result: Tile[][]
		real: Tile[][]
	}
	round: number
	canPlay: boolean
	time: number
	timeInterval: number
	screen: 'game' | 'menu'
	life: number
	maxLife: number
	points: number
}

/*
   Facil
   - maxLife: 5

   Médio
   - maxLife: 3

   Dificil
   - maxLife: 2
*/

function getTrueQttBoard(board: Tile[][]) {
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

export const useGameStore = defineStore({
	id: 'game',
	state: (): Types => ({
		theme: 'light',
		paused: false,
		tileQtt: 3,
		tileActiveColor: '',
		board: {
			result: [],
			real: [],
		},
		round: 1,
		canPlay: false,
		time: 0,
		timeInterval: 0,
		screen: 'game',
		life: 3,
		maxLife: 3,
		points: 0,
	}),
	actions: {
		toggleTheme() {
			return (this.theme = this.theme === 'light' ? 'dark' : 'light')
		},
		togglePaused() {
			return (this.paused = !this.paused)
		},
		startGame() {
			this.points = 0
			this.life = this.maxLife
			this.time = 0
			this.tileActiveColor = colors[Math.floor(Math.random() * colors.length)]
			this.canPlay = false
			this.paused = true

			this.generateBoard()
			setTimeout(this.startRound, 750)
		},

		generateBoard() {
			this.board.result = createBoard(this.tileQtt)
			this.toggleRealBoard(false)

			const maxTileQtt = Math.ceil((this.tileQtt * this.tileQtt) / 2)

			for (let i = 0; i < maxTileQtt; i++) {
				let x = Math.floor(Math.random() * this.tileQtt)
				let y = Math.floor(Math.random() * this.tileQtt)
				this.board.result[x][y] = true
			}
		},

		toggleRealBoard(copyResult: boolean) {
			if (copyResult) this.board.real = this.board.result
			else this.board.real = this.board.result.map(row => row.map(line => null))
		},

		async startRound() {
			clearTimeout(this.timeInterval)

			this.tileActiveColor = colors[Math.floor(Math.random() * colors.length)]
			this.toggleRealBoard(true)

			setTimeout(() => {
				this.toggleRealBoard(false)

				this.time = 2
				this.paused = false
				this.canPlay = true

				this.timeInterval = setInterval(() => {
					if (this.paused) return

					if (this.time <= 0) return this.decreaseLife()

					this.time -= 1
				}, 1000)
			}, 200)
		},

		activateTile(x: number, y: number) {
			if (!this.canPlay) return

			this.board.real[x][y] = this.board.result[x][y] == true

			if (getTrueQttBoard(this.board.real) === getTrueQttBoard(this.board.result)) {
				//* Adicionar pontos
				this.points += 10

				this.paused = true
				this.canPlay = false

				setTimeout(this.generateBoard, 250)

				setTimeout(this.startRound, 1000)
			}
		},

		decreaseLife() {
			this.life--

			if (this.life <= 0) {
				clearTimeout(this.timeInterval)
			} else {
				this.startRound()
			}
		},
	},

	getters: {
		timeDisplay(state) {
			const minutes = Math.floor(state.time / 60)
			const seconds = state.time - minutes * 60
			return minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0')
		},
	},
})
