import leiloes from '../models/leiloes'
import database from './database'

const itensRepository = {
	criar: (leilao: leiloes, callback: (id?: number) => void) => {
		const sql = 'INSERT INTO leiloes (id_produto,preco_minimo,preco_arremate ) VALUES (?, ?, ?)'
		const params = [leilao.id_produto, leilao.preco_minimo, leilao.preco_arremate]
		database.run(sql, params, function(_err) {
			callback(this?.lastID)
		})
	},

	lerTodos: (callback: (leiloes: leiloes[]) => void) => {
		const sql = 'SELECT * FROM leiloes'
		const params: any[] = []
		database.all(sql, params, (_err, rows) => callback(rows))
	},

	ler: (id: number, callback: (leilao?: leiloes) => void) => {
		const sql = 'SELECT * FROM leiloes WHERE id = ?'
		const params = [id]
		database.get(sql, params, (_err, row) => callback(row))
	},

	atualizar: (id: number, leilao: leiloes, callback: (notFound: boolean) => void) => {
		const sql = 'UPDATE leiloes SET id_produto = ?, preco_minimo = ?, preco_arremate  = ? WHERE id = ?'
		const params = [leilao.id_produto, leilao.preco_minimo, leilao.preco_arremate]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},
//
	apagar: (id: number, callback: (notFound: boolean) => void) => {
		const sql = 'DELETE FROM leiloes WHERE id = ?'
		const params = [id]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},
}

export default itensRepository