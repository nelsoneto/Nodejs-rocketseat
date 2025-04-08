// Middleware (interceptador)
export async function json(req, res) {

  // função do Node - Espera receber as informações do corpo da requisição e armazena em um array
  const buffers = []
  for await (const chunk of req) {
    buffers.push(chunk)
  }

  // Converte em JSON para objeto JavaScript
  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    req.body = null
  }

  // Metadata
  res.setHeader("Content-type", "application/json")
}