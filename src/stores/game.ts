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
	}),
	actions: {
		toggleTheme() {
			return (this.theme = this.theme === 'light' ? 'dark' : 'light')
		},
		togglePaused() {
			return (this.paused = !this.paused)
		},
		startGame() {
			this.tileActiveColor = colors[Math.floor(Math.random() * colors.length)]
			this.generateBoard()
			this.startRound()
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

			console.log(this.board.result)
		},

		toggleRealBoard(copyResult: boolean) {
			if (copyResult) this.board.real = this.board.result
			else this.board.real = this.board.result.map(row => row.map(line => null))
		},

		async startRound() {
			this.paused = true
			this.tileActiveColor = colors[Math.floor(Math.random() * colors.length)]
			this.canPlay = false
			this.toggleRealBoard(true)

			setTimeout(() => {
				this.toggleRealBoard(false)

				console.log('Inicia')
				this.canPlay = true
				// this.tileActiveColor = '#2ECC71'
				this.time += 90
				this.paused = false
			}, 1000)

			// Começar contar o tempo
			// Permitir que o jogador clique em um valor
		},

		activateTile(x: number, y: number) {
			if (!this.canPlay) return

			this.board.real[x][y] = this.board.result[x][y] == true
		},
	},

	getters: {
		timeDisplay(state) {
			// Secods to minute
			const minutes = Math.floor(state.time / 60)
			const seconds = state.time - minutes * 60
			return minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0')
		},
	},
})

/*
   Logica para gerar o tabuleiro
   1. Gera o tabuleiro como array de arrays
   2. Seta como true posições aleatórias no tabuleiro (Maximo: (tileQtt * tileQtt) / 2)
*/

/*

   Campo vazio: false
   Campo certo: true
   Campo errado: false
*/
