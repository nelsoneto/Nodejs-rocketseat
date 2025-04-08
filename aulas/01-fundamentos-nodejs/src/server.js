import http from 'node:http'

import { json } from './middleware/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  // Middleware
  await json(req, res)

  // Busca a rota verificando se o metodo e caminho são iguais a informações vindo da req.
  // test() é uma função do regex que retorna boolean
  // route.path: É uma expressão regular (regex) que verifica se o url da requisição corresponde ao caminho esperado.
  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  // Tratamento da Rota Encontrada
  // Esta fazendo a condicional acima e transformando
  if (route) {
    const routeParams = req.url.match(route.path)
    const { query, ...params } = routeParams.groups

    req.params = params
    req.query = query ? extractQueryParams(query) : {}


    return route.handler(req, res)
  }

})

server.listen(3333)

// Resumo do Funcionamento
// O servidor recebe uma requisição HTTP.
// O middleware json processa o corpo da requisição.
// O servidor verifica se existe uma rota correspondente ao método e ao caminho da requisição.
// Se uma rota for encontrada:
// Os parâmetros da URL são extraídos e armazenados em req.params.
// O manipulador da rota é chamado para processar a requisição.
// Se nenhuma rota for encontrada, o servidor não faz nada (você pode adicionar um tratamento para isso, como retornar um erro 404).