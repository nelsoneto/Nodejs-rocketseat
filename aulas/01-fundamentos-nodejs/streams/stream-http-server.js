import http from 'node:http'

//Ler os dados e Transform os dados lidos em escrita

// res => Readable Stream
// req => Writeable Stream

const server = http.createServer(async (req, res) => {
  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }
  const fullStreamContent = Buffer.concat(buffers).toString()

  // return req
  //   .pipe(new InverseNumberStream())
  //   .pipe(res)

  return res.end(`Você enviou: ${fullStreamContent}`)
})

server.listen(3334)

