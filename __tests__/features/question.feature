Feature: Gerenciamento de questões
  Para gerenciamento de questões
  Como usuário
  Eu quero poder criar, atualizar e buscar questões

  Scenario Outline: Criar questão
    Given Dado que eu tenha criado uma questão
    When Quando eu criar <caso> atribuindo <propriedade>
    Then Então eu devo obter a mensagem <mensagem> depois de tentar criar

    Examples:
      | caso                                | propriedade                                                                                                                                               | mensagem                                     |
      | 'sem descrição'                     | '{"description": ""}'                                                                                                                                     | "Descrição inválida."                        |
      | 'sem respostas'                     | '{"answers": null}'                                                                                                                                       | "A questão deve ter 4 respostas."            |
      | 'com um número menor de respostas'  | '{"answers": [{}, {}, {}, {}, {}]}'                                                                                                                       | "A questão deve ter 4 respostas."            |
      | 'com um númerio maior de respostas' | '{"answers": [{}, {}, {}, {}, {}]}'                                                                                                                       | "A questão deve ter 4 respostas."            |
      | 'com alguma resposta sem descrição' | '{"answers": [{"description": ""}, {"description": "teste"}, {"description": "teste"}, {"description": "teste"}]}'                                        | "A questão possui respostas sem descrição."  |
      | 'sem resposta correta'              | '{"answers": [{"description": "teste"}, {"description": "teste"}, {"description": "teste"}, {"description": "teste"}]}'                                   | "A questão deve possuir 1 resposta correta." |
      | 'sem resposta correta'              | '{"answers": [{"description": "teste", "correct": true}, {"description": "teste", "correct": true}, {"description": "teste"}, {"description": "teste"}]}' | "A questão deve possuir 1 resposta correta." |
      | 'a questão completa'                | '{}'                                                                                                                                                      | "Criado com sucesso."                        |
      | 'com pontos fora do intervalo'      | '{"points": 0}'                                                                                                                                           | "Os pontos devem estar entre 1 and 10."      |
      | 'com pontos fora do intervalo'      | '{"points": 11}'                                                                                                                                          | "Os pontos devem estar entre 1 and 10."      |



  Scenario Outline: Atualizar questão
    Given Dado que eu tenha atualizado uma questão
    When Quando eu atualizar <caso> atribuindo <propriedade>
    Then Então eu devo obter a mensagem <mensagem> depois de tentar atualizar

    Examples:
      | caso                                | propriedade                                                                                                                                               | mensagem                                     |
      | 'sem descrição'                     | '{"description": ""}'                                                                                                                                     | "Descrição inválida."                        |
      | 'sem respostas'                     | '{"answers": null}'                                                                                                                                       | "A questão deve ter 4 respostas."            |
      | 'com um número menor de respostas'  | '{"answers": [{}, {}, {}, {}, {}]}'                                                                                                                       | "A questão deve ter 4 respostas."            |
      | 'com um número maior de respostas'  | '{"answers": [{}, {}, {}, {}, {}]}'                                                                                                                       | "A questão deve ter 4 respostas."            |
      | 'com alguma resposta sem descrição' | '{"answers": [{"description": ""}, {"description": "teste"}, {"description": "teste"}, {"description": "teste"}]}'                                        | "A questão possui respostas sem descrição."  |
      | 'sem resposta correta'              | '{"answers": [{"description": "teste"}, {"description": "teste"}, {"description": "teste"}, {"description": "teste"}]}'                                   | "A questão deve possuir 1 resposta correta." |
      | 'sem resposta correta'              | '{"answers": [{"description": "teste", "correct": true}, {"description": "teste", "correct": true}, {"description": "teste"}, {"description": "teste"}]}' | "A questão deve possuir 1 resposta correta." |
      | 'a questão completa'                | '{}'                                                                                                                                                      | "Atualizado com sucesso."                    |
      | 'com pontos fora do intervalo'      | '{"points": 0}'                                                                                                                                           | "Os pontos devem estar entre 1 and 10."      |
      | 'com pontos fora do intervalo'      | '{"points": 11}'                                                                                                                                          | "Os pontos devem estar entre 1 and 10."      |
      | 'com outro usuário'                 | '{"userId": 2}'                                                                                                                                           | "Usuário sem permissão para alterar o item." |