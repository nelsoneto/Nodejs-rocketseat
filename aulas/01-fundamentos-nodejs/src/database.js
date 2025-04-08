import fs from 'node:fs/promises'

// Caminho onde é gerado o banco de dados (pasta raiz)
const databasePath = new URL('../db.json', import.meta.url)


export class Database {
  // # Torna privado, não tem acesso em arquivos externos
  #database = {}

  // Recupera os dados assim que terminar de ler o arquivo por completo.
  constructor() {
    fs.readFile(databasePath, 'utf8').then(data => {
      this.#database = JSON.parse(data)
    })
      // Cria o banco de dados mesmo que não tenha nenhum dado.
      .catch(() => {
        this.#persist()
      })
  }

  // Persistindo o banco de dados
  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table, search) {
    let data = this.#database[table] ?? []
    if (search) {
      data = data.find(row => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase())
        })
      })
    }
    return data
  }

  insert(table, data) {
    // Se não existir a tabela, cria um array vazio
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      // Adiciona o novo registro no array
      this.#database[table] = [data]
    }

    this.#persist() // Persiste as alterações
    return data;
  }


  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id);
    if (rowIndex > -1) {
      this.#database[table][rowIndex] = { id, ...data }; // Atualiza o registro do array
      this.#persist(); // Persiste as alterações
    }
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id);
    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1); // Remove o registro do array
      this.#persist(); // Persiste as alterações
    }
  }

}