import { randomUUID } from "node:crypto"
import { Database } from "./database.js"
import { buildRoutePath } from "./utils/build-route-path.js"

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (_req, res) => {
      const tasks = database.select('tasks')
      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      }
      database.insert('tasks', task)
      return res.writeHead(201).end()
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      const task = database.select('tasks', id)
      if (!task) {
        return res.writeHead(404).end('Task not found')
      }

      const updatedTask = {
        ...task,
        title,
        description,
        updated_at: new Date(), // servidor controla isso
      }

      database.update('tasks', id, updatedTask)

      return res.writeHead(200).end(JSON.stringify(updatedTask))
    }
  }
  ,
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      database.delete('tasks', id)


      return res.writeHead(204).end('Tarefa deletada com sucesso')
    }
  },

  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params;

      // Verifica se a task existe no banco de dados
      const task = database.select('tasks', id);
      if (!task) {
        return res.writeHead(404).end(JSON.stringify({ error: 'Task not found' }));
      }

      // Alterna o estado de `completed_at`
      const isCompleted = task.completed_at !== null;
      const updatedTask = {
        ...task,
        completed_at: isCompleted ? null : new Date(),
        updated_at: new Date(),
      };

      // Atualiza a task no banco de dados
      database.update('tasks', id, updatedTask);

      return res.writeHead(200).end(JSON.stringify(updatedTask));
    }
  }
]