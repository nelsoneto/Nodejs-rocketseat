// import-tasks-from-csv.ts
import { parse } from 'csv-parse';
import fs from 'fs';
import fetch from 'node-fetch';

async function importTasksFromCSV(filePath) {
  const stream = fs.createReadStream(filePath);

  const parser = parse({
    columns: true, // já transforma cada linha em objeto com base no header
    skip_empty_lines: true,
    trim: true,
  });

  const csvStream = stream.pipe(parser);

  for await (const record of csvStream) {
    const { title, description } = record;

    try {
      const response = await fetch('http://localhost:3333/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        console.error(`Erro ao criar task: ${title} - Status: ${response.status}`);
      } else {
        console.log(`Task criada com sucesso: ${title}`);
      }
    } catch (error) {
      console.error(`Erro na requisição da task ${title}:`, error);
    }
  }

  console.log('Importação finalizada!');
}

const csvPath = './tasks.csv'; // caminho para o arquivo CSV
importTasksFromCSV(csvPath);
