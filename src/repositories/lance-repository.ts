import Leilao from "../models/leilao";
import Lance from "../models/lance";
import database from "./database";
import leiloesRepository from "./leiloes-repository";


const lanceRepository = {
    criar: (lance: Lance, callback: (id?: number) => void) => {
		const sql = 'INSERT INTO lances (id_leilao, id_usuario, preco, tempo) VALUES (?, ?, ?, DATETIME("now"))'
		const params = [lance.id_leilao, lance.id_usuario, lance.preco]
		database.run(sql, params, function(_err) {
			callback(this?.lastID)
		})
	},
	
	ler: (id: number, callback: (lance?: Lance) => void) => {
		const sql = 'SELECT * FROM lances WHERE id = ?';
		const params = [id]
		database.get(sql, params, function(_err, row) {
			callback(row)
		})
	},

	lerAlto: (id: number, callback: (lance?: Lance) => void) => {
		const sql = `SELECT * FROM lances WHERE id_leilao = ? ORDER BY preco DESC`;
		const params = [id]
		database.get (sql, params,(erro, lance) =>{
			callback(lance)
		})
			
	},

	

	
}

export default lanceRepository
