import Leilao from "../models/leilao";
import Lance from "../models/lance";
import database from "./database";

const lanceRepository = {
    criar: (lance: Lance, callback: (id?: number) => void) => {
		const sql = 'INSERT INTO leiloes (id,preco_minimo,lance_arremate ) VALUES (?, ?, ?)'
		const params = [lance.id_leilao,lance.id_usuario ,lance.preco ]
		database.run(sql, params, function(_err) {
			callback(this?.lastID)
		})
	},
	ler: (lance: Lance, callback: (id?: number) => void) => {
		const sql = 'INSERT INTO leiloes (id,preco_minimo,lance_arremate ) VALUES (?, ?, ?)'
		const params = [lance.id_leilao,lance.id_usuario ,lance.preco ]
		database.run(sql, params, function(_err) {
			callback(this?.lastID)
		})
	},
}

export default lanceRepository
