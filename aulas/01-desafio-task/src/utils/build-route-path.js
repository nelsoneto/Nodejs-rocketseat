// /tasks/:id

export function buildRoutePath(path) {
  // regex expressão regular
  // ( ) no regex cria um subgrupos 
  // g é global
  // ?<> nomeias as regex
  // ?<$1> nomeia todos os ids. Ele retorna na posição 1 e coloca como nome. 

  const routeParametersRegex = /:([a-zA-z]+)/g
  const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')
  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

  return pathRegex
  // Array.from() para ficar fácil de entender
  // console.log(Array.from(path.matchAll(routeParametersRegex)))
}