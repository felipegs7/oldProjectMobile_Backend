import clientes from '../models/clientes'
import database from './database'

const clientesRepository = {
	criar: (clientes: clientes, callback: (id?: number) => void) => {
		const sql = 'INSERT INTO produtos (nome, descricao) VALUES (?, ?)'
		const params = [clientes.nome, clientes.CPF]
		database.run(sql, params, function(_err) {
			callback(this?.lastID)
		})
	},

	lerTodos: (callback: (clientes: clientes[]) => void) => {
		const sql = 'SELECT * FROM clientes'
		const params: any[] = []
		database.all(sql, params, (_err, rows) => callback(rows))
	},

	ler: (id: number, callback: (produto?: clientes) => void) => {
		const sql = 'SELECT * FROM produtos WHERE id = ?'
		const params = [id]
		database.get(sql, params, (_err, row) => callback(row))
	},

	atualizar: (id: number, clientes: clientes, callback: (notFound: boolean) => void) => {
		const sql = 'UPDATE clientes SET nome = ?, descricao = ? WHERE id = ?'
		const params = [clientes.nome, clientes.CPF, id]
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

export default clientesRepository