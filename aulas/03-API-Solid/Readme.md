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

