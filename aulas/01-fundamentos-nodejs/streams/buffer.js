// Buffer são espaços armazenados na memória em binário de forma hexadecimal, que Node consegue trabalhar de uma maneira muito mais performatica.

const buf = Buffer.from("nelson")

console.log(buf)
console.log(buf.toJSON())
console.log(buf.toString())