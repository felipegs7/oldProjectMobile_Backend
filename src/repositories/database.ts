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

	const SQL_usuarios_CREATE = `
	CREATE TABLE usuarios (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		nome TEXT,
		cpf INT,
		email TEXT,
		senha INT
	)`
	const SQL_leiloes_CREATE = `
	CREATE TABLE leiloes (
		id INT PRIMARY KEY AUTOINCREMENT NOT NULL AUTO_INCREMENT,
		id_produto INT NULL,
		id_usuario INT NULL,
		preco_minimo INT NULL,
		inicio DATETIME NULL,
		termino DATETIME NULL,
		registro DATETIME NULL DEFAULT NOW(),
		preco_arremate INT NULL,
		PRIMARY KEY (id))
		INDEX fk_leiloes_usuarios_idx (id_usuario ASC) VISIBLE,
  		INDEX fk_leiloes_produtos_idx (id_produto ASC) VISIBLE,
  		CONSTRAINT fk_leiloes_usuarios
    	FOREIGN KEY (id_usuario)
		REFERENCES usuarios (id)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION,
		CONSTRAINT fk_leiloes_produtos
		FOREIGN KEY (id_produto)
		REFERENCES produtos (id)
		ON DELETE CASCADE
		ON UPDATE NO ACTION);
	)`

// const Inserir = 'insert into itens (nome,descricao) values("wesker","descricao")'
const Inserir = 'select * from itens'

const database = new sqlite3.Database(DBSOURCE, (err) => {
	if (err) {
		console.error(err.message)
		throw err
	} else {
		console.log('Base de dados conectada com sucesso.')
		// database.run(SQL_leiloes_CREATE , (err) => {
		// if (err) {
		// console.log(err)	// Possivelmente a tabela já foi criada
		// } else {
		// 	// console.log(rows)
		// 	console.log('Tabela produtos criada com sucesso.')
		// }
	//})
	}
	
})

export default database 