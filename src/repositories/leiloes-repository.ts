import lance from '../models/lance'
import leilao from '../models/leilao'
import leiloes from '../models/leilao'
import database from './database'

const leiloesRepository = {
	criar: (leilao: leiloes, callback: (id?: number) => void) => {
		const sql = 'INSERT INTO leiloes (id_produto,inicio,termino, preco_minimo) VALUES (?, ?, ?, ?)'
		const params = [leilao.id_produto, leilao.inicio, leilao.termino, leilao.preco_minimo ]
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
		const sql = 'SELECT *FROM leiloes WHERE id = ?'
		const params = [id]
		database.get(sql, params, (_err, row) => callback(row))
	},

	lerAtivo: (callback: (leilao?: leiloes) => void) => {
		const sql = 'SELECT * FROM leiloes WHERE DATETIME("now") < DATETIME(termino) ORDER BY termino';
		database.get(sql, (err, row) => {
			if (err) {
				console.error(err);
			}
			callback(row)
		})
	},

	lerAlto: (id: number, callback: (lance?: lance) => void) => {
		const sql = `SELECT * FROM lances WHERE id_leilao = ? ORDER BY preco DESC`;
		const params = [id]
		database.get (sql, params,(erro, lance) =>{
			callback(lance)
		})
			
	},


	atualizar: (id: number, leilao: leiloes, callback: (notFound: boolean) => void) => {
		const sql = 'UPDATE leiloes SET id_produto = ?, preco_minimo = ? WHERE id = ?'
		const params = [leilao.id_produto, leilao.preco_minimo, id ]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},

	apagar: (id: number, callback: (notFound: boolean) => void) => {
		const sql = 'DELETE FROM leiloes WHERE id = ?'
		const params = [id]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},
}


export default leiloesRepository