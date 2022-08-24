import sqlite3 from 'sqlite3'

const DBSOURCE = 'db.sqlite'

const SQL_itens_CREATE = `
	CREATE TABLE itens (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		nome TEXT,
		descricao TEXT
	)`


	const SQL_PRODUTOS_CREATE = `
	CREATE TABLE produtos (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		nome TEXT,
		descricao TEXT,
		preco INT
	)`

	const SQL_clientes_CREATE = `
	CREATE TABLE clientes (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		nome TEXT,
		cpf INT,
		email TEXT,
		senha INT
	)`

//
// const Inserir = 'insert into itens (nome,descricao) values("wesker","descricao")'
const Inserir = 'select * from itens'

const database = new sqlite3.Database(DBSOURCE, (err) => {
	if (err) {
		console.error(err.message)
		throw err
	} else {
		console.log('Base de dados conectada com sucesso.')
		// database.run(SQL_clientes_CREATE , (err) => {
		// if (err) {
		// console.log(err)	// Possivelmente a tabela já foi criada
		// } else {
		// 	// console.log(rows)
		// 	console.log('Tabela produtos criada com sucesso.')
		// }
	}
	
})

export default database 