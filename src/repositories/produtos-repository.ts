import produtos from '../models/produtos'
import database from './database'

const itensRepository = {
	criar: (produto: produtos, callback: (id?: number) => void) => {
		const sql = 'INSERT INTO produtos (nome, descricao) VALUES (?, ?)'
		const params = [produto.nome, produto.descricao]
		database.run(sql, params, function(_err) {
			callback(this?.lastID)
		})
	},

	lerTodos: (callback: (produtos: produtos[]) => void) => {
		const sql = 'SELECT * FROM produtos'
		const params: any[] = []
		database.all(sql, params, (_err, rows) => callback(rows))
	},

	ler: (id: number, callback: (produto?: produtos) => void) => {
		const sql = 'SELECT * FROM produtos WHERE id = ?'
		const params = [id]
		database.get(sql, params, (_err, row) => callback(row))
	},

	atualizar: (id: number, produto: produtos, callback: (notFound: boolean) => void) => {
		const sql = 'UPDATE produtos SET nome = ?, descricao = ? WHERE id = ?'
		const params = [produto.nome, produto.descricao, id]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},

	apagar: (id: number, callback: (notFound: boolean) => void) => {
		const sql = 'DELETE FROM produtos WHERE id = ?'
		const params = [id]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},
}

export default itensRepository