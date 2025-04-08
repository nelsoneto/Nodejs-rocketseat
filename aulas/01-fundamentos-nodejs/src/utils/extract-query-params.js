export function extractQueryParams(query) {
  // tira o primeiro caractere da string  (o ?) e separa por & e depois transforma em um array
  // reduce() é uma função que transforma um array em um único valor  
  return query.substr(1).split('&').reduce((queryParams, param) => {
    const [key, value] = param.split('=')
    queryParams[key] = value
    return queryParams
  }, {})
}