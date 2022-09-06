import sqlite3 from 'sqlite3'

const DBSOURCE = 'db.sqlite'

	const SQL_PRODUTOS_CREATE = `
	CREATE TABLE produtos (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		nome TEXT,
		descricao TEXT,
		preco INT,
		imagem TEXT
	)`

	const SQL_USUARIOS_CREATE = `
	CREATE TABLE usuarios (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		nome TEXT,
		CPF INT,
		email TEXT,
		senha INT
	)`
	const SQL_LEILOES_CREATE = `
	CREATE TABLE leiloes (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		id_produto INT NULL,
		preco_minimo INT NULL,
		inicio DATETIME NULL,
		termino DATETIME NULL,
		CONSTRAINT fk_leiloes_produtos
		FOREIGN KEY (id_produto)
		REFERENCES produtos (id)
	)`

	const SQL_LANCES_CREATE = `
	CREATE TABLE lances (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		id_leilao INT NOT NULL,
		id_usuario INT NOT NULL,
		preco INT NOT NULL,
		tempo TEXT NOT NULL,
		CONSTRAINT fk_id_leilao
		FOREIGN KEY (id_leilao)
		References leiloes (id),
		CONSTRAINT fk_id_usuario
		FOREIGN KEY (id_usuario)
		References usuarios (id)
		
	)`
		

// const Inserir = 'insert into itens (nome,descricao) values("wesker","descricao")'
const Inserir = 'select * from itens'

const database = new sqlite3.Database(DBSOURCE, (err) => {
	if (err) {
		console.error(err.message)
		throw err
	} else {
		console.log('Base de dados conectada com sucesso.')

		database.run(SQL_PRODUTOS_CREATE , (err) => {
			if (err) {
				console.log(err)	// Possivelmente a tabela já foi criada
			} else {
				console.log('Tabela produtos criada com sucesso.')
			}
		})

		database.run(SQL_USUARIOS_CREATE , (err) => {
			if (err) {
				console.log(err)	// Possivelmente a tabela já foi criada
			} else {
				console.log('Tabela usuarios criada com sucesso.')
			}
		})

		database.run(SQL_LEILOES_CREATE , (err) => {
			if (err) {
				console.log(`ERROR TABELA LEILOES: ${err}`)	// Possivelmente a tabela já foi criada
			} else {
				console.log('Tabela leiloes criada com sucesso.')
			}
		})

		database.run(SQL_LANCES_CREATE, (err) => {
			if (err) {
				console.log(err)	// Possivelmente a tabela já foi criada
			} else {
				console.log('Tabela lances criada com sucesso.')
			}
		})
	}
	
})

export default database 