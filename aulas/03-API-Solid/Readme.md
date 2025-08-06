API - SOLID

# dica clean code
  * Vaiáveis
    - semântica das variáveis com Booleans, usar com    preferencia "is", "has", "does" => doesPasswordMatches em authenticate.ts exemplo. 

   Rotas
    - colocar nomes das rotas com entidades de fácil semântica 
    ex: 
      app.post('/authenticate', authenticate) => sem sentido
      app.post('/sessions', authenticate) => mais semântico
  
# sut
  "SUT" significa System Under Test (Sistema Sob Teste). Em testes unitários, o SUT é o componente, função, classe ou módulo que você está testando diretamente.

  - SUT = o alvo principal do seu teste.
  - Ajuda a focar no comportamento de uma unidade específica do código.
  - Facilita a identificação de falhas e regressões.

# Coverage
  O Coverage é uma métrica utilizada para medir a quantidade de código que está sendo testado em uma aplicação.
  Mostra quanto dos arquivos foram encoberto com os testes.
  Não precisa estar 100% os testes, coverage te ajuda a enxergar os testes de maneira mais visual e dinamica.

# Factory pattern
  - Ajuda na instaciação de objetos de forma organizada e flexível
  - É como uma fabrica que cria objetos para vc
  - Em vez de instanciar um objeto diretamente com new, você chama uma função ou classe factory que cria e retorna o objeto pronto.
  
✅ Por que usar?
  - Encapsula a lógica de criação: evita repetição de código e facilita mudanças no processo de criação.
  - Facilita testes: você pode criar diferentes instâncias com configurações específicas, como mocks.
  - Mantém o código limpo e organizado, seguindo princípios como o SOLID (especialmente o Single Responsibility).

# TDD e Mocking
  TDD (Test Driven Development) é uma abordagem de desenvolvimento de software em que os testes são escritos antes do código.
  Primeiramente, será criado o teste unitário e em seguida, o código será desenvolvido para que esse teste passe.

✅ Red, green and Refactor:

  O conceito "red, green and refactor" é uma abordagem do TDD (Test-Driven Development) para desenvolvimento de software. Consiste em três etapas:

  🟥 Red (Vermelho): nesta fase, o desenvolvedor escreve um teste que deve falhar, ou seja, ele garante que o teste não passará sem implementar o código necessário.

  🟩 Green (Verde): aqui, o desenvolvedor escreve a quantidade mínima de código necessária para fazer o teste passar.

  ♻️ Refactor (Refatorar): após o teste passar, o desenvolvedor refatora o código para melhorar a qualidade, sem alterar seu comportamento.

  Essa abordagem garante que o código seja desenvolvido com base em testes confiáveis, resultando em um código mais limpo, seguro e fácil de manter.

# this
  Em JavaScript (e TypeScript), this é uma palavra-chave que se refere ao contexto de execução atual. O valor de this depende de como a função é chamada. No contexto da sua classe InMemoryCheckInRepository, this se refere à instância da classe que está sendo utilizada.

 Dentro de um objeto (instância de uma classe), o this é usado para manipular os dados (como um array de dados) que pertencem a essa instância específica. Ele permite acessar e modificar as propriedades e métodos desse objeto.

# Padrão de requisição http:
  Quando é uma requisição GET por exemplo, criar um caso de uso com descrição get-exemplo.ts e se for com vários o ideal seria fetch-exemplo.ts.

  