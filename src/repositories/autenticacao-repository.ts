import autenticacao from "../models/autenticacao"
import database from "./database"
import usuarios from "../models/usuarios"



const autenticacaoRepository = {
    criar: (usuarios: usuarios, callback: (id?: number) => void) => {
		const sql = 'INSERT INTO autenticacao () VALUES (?, ?)'
		const params = [usuarios.nome, usuarios.sobrenome]
		database.run(sql, params, function(_err) {
			callback(this?.lastID)
		})
	},
}



export default autenticacaoRepository