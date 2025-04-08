import fs from 'node:fs/promises';

const databasePath = new URL('../db.json', import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, 'utf8')
      .then(data => {
        this.#database = JSON.parse(data);
        console.log('Database connected.');
      })
      .catch(() => {
        console.log('Database file not found.');
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
      .catch(err => {
        console.error('Erro ao persistir os dados', err);
      });
  }

  select(table, id) {
    const data = this.#database[table] ?? [];
    if (id) {
      return data.find(row => row.id === id) ?? null;
    }
    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }
    this.#persist();
    return data;
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id);
    if (rowIndex > -1) {
      this.#database[table][rowIndex] = {
        ...this.#database[table][rowIndex], // Dados existentes
        ...data, // Dados novos
      };
      this.#persist();
    }
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id);
    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);
      this.#persist();
    }
  }
}