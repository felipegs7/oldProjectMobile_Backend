import Produtos from '../models/produtos'
import database from './database'

const itensRepository = {
	criar: (produto: Produtos, callback: (id?: number) => void) => {
		const sql = 'INSERT INTO produtos (nome, descricao, preco) VALUES (?, ?, ?)'
		const params = [produto.nome, produto.descricao, produto.preco]
		database.run(sql, params, function(err) {
			console.error(err);
			callback(this?.lastID)
		})
	},

	lerTodos: (callback: (produtos: Produtos[]) => void) => {
		const sql = 'SELECT * FROM produtos'
		const params: any[] = []
		database.all(sql, params, (_err, rows) => callback(rows))
	},

	ler: (id: number, callback: (produto?: Produtos) => void) => {
		const sql = 'SELECT * FROM produtos WHERE id = ?'
		const params = [id]
		database.get(sql, params, (_err, row) => callback(row))
	},

	atualizar: (id: number, produto: Produtos, callback: (notFound: boolean) => void) => {
		const sql = 'UPDATE produtos SET nome = ?, descricao = ?, preco = ? WHERE id = ?'
		const params = [produto.nome, produto.descricao, produto.preco, id]
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