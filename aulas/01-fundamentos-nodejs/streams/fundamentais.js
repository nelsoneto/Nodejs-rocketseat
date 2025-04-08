//process é uma variável global do node
//stdin é uma string de escrita retorna tudo que o usuario digitar no terminal
//stdout é uma string de leitura. 
//Buffer é um formato do nodejs para transicionar informações entre streams
//tudo isso geralmente não vamos codar, mas é interessante saber como funciona por debaixo dos panos  
//dentro de uma String de escrita serve apenas para processar os dados 

import { Readable, Transform, Writable } from 'node:stream'
//Leitura dos dados
class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(i))
        this.push(buf)
      }
    }, 1000)
  }
}

//Ler os dados e Transform os dados lidos em escrita
class InverseNumberStream extends Transform {
  _transform(chunk, _encoding, callback) {
    const transformed = Number(chunk.toString()) * -1
    //primeiro param de um callback é o erro, nesse caso estou enviado null
    callback(null, Buffer.from(String(transformed)))
  }
}

//Processa os dados lidos e escreve pro cliente
class MultiplyByTenStream extends Writable {
  _write(chunk, _encoding, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream()) //antes de multiplicar os números, está transformando em negativos
  .pipe(new MultiplyByTenStream())