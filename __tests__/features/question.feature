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
      | 'com outro usuário'                 | '{"id": 2}'                                                                                                                                           | "Usuário sem permissão para alterar o item." |

  Scenario: Obter questões do usuário logado
    Given Dado que eu esteja logado e queira obter minhas questões
    When Quando eu buscar as questões
    Then Então eu devo obter somente as minhas questões

  Scenario: Obter minhas questões e as compartilhadas por outros usuários
    Given Dado que eu queira obter minhas questões e as compartilhadas por outros usuários
    When Quando eu buscar as questões compartilhadas
    Then Então eu devo obter minhas questões e as compartilhadas

  Scenario: Obter questão por id
    Given Dado que eu queira obter uma questão pelo id
    When Quando eu buscar a questão
    Then Então eu devo obter uma questão


  Scenario Outline: Remover questão
    Given Dado que eu queira remover uma questão
    When Quando eu enviar o id de uma questão <caso> <id>
    Then Então eu devo obter a mensagem <mensagem> depois de tentar remover a questão

    Examples:
      | id | caso                  | mensagem                                     |
      | 4  | 'que me pertence'     | "Questão removida com sucesso."              |
      | 2  | 'que não me pertence' | "Usuário sem permissão para remover o item." |
      | 10 | 'que não existe'      | "A questão não existe."                      |