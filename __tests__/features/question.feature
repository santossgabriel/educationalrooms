Feature: Gerenciamento de questões
  For management questions
  As a teacher
  I want to manage questions

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
      | 'a questão completa'                | 'nenhuma alteração'                                                                                                                                       | "Criado com sucesso."                        |


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
      | 'a questão completa'                | 'nenhuma alteração'                                                                                                                                       | "Atualizado com sucesso."                    |