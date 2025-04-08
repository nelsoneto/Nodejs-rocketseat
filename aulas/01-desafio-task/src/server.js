import http from 'node:http'
import { json } from './middleware/json.js'
import { routes } from './routes.js'

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  // Middleware (interceptador)
  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path)
    // const params = { ...routeParams.groups }
    req.params = { ...routeParams.groups }
    console.log(req.params)
    return route.handler(req, res)
  }

  return res.writeHead(404).end('Rota não encontrada')
})

server.listen(3333)