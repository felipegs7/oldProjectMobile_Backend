import usuarios from '../models/usuarios'
import database from './database'

const usuariosRepository = {
	criar: (usuarios: usuarios, callback: (id?: number) => void) => {
		const sql = 'INSERT INTO usuarios (nome,cpf,email,senha) VALUES (?, ?, ?, ?)'
		const params = [usuarios.nome, usuarios.CPF, usuarios.email, usuarios.senha]
		database.run(sql, params, function(_err) {
			callback(this?.lastID)
		})
	},


	lerTodos: (callback: (usuarios: usuarios[]) => void) => {
		const sql = 'SELECT * FROM usuarios'
		const params: any[] = []
		database.all(sql, params, (_err, rows) => callback(rows)) 
	},

	ler: (id: number, callback: (produto?: usuarios) => void) => {
		const sql = 'SELECT * FROM usuarios WHERE id = ?'
		const params = [id]
		database.get(sql, params, (_err, row) => callback(row))
	},

	atualizar: (id: number, usuarios: usuarios, callback: (notFound: boolean) => void) => {
		const sql = 'UPDATE usuarios SET senha = ? WHERE id = ?'
		const params = [usuarios.senha, id]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},

	apagar: (id: number, callback: (notFound: boolean) => void) => {
		const sql = 'DELETE FROM usuarios WHERE id = ?'
		const params = [id]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},
}

export default usuariosRepository