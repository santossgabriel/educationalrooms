Feature: Gerenciamento de questões
  Para gerenciamento de questões
  Como usuário
  Eu quero poder criar, atualizar e buscar questões

  Scenario Outline: Criar questão
    Given Dado que eu tenha criado uma questão
    When Quando eu criar <caso> atribuindo <propriedade>
    Then Então eu devo obter a mensagem <mensagem> depois de tentar criar

    Examples:
      | caso                                | propriedade                                                                                                                                                                                                                                           | mensagem                                                                                                                            |
      | 'sem descrição'                     | '{"description": ""}'                                                                                                                                                                                                                                 | '{"en": "Invalid description.", "br": "Descrição inválida."}'                                                                       |
      | 'sem respostas'                     | '{"answers": null}'                                                                                                                                                                                                                                   | '{"en": "The question must be between 2 and 6 answers.", "br": "A questão deve ter entre 2 e 6 respostas."}'                        |
      | 'com um número menor de respostas'  | '{"answers": [{}]}'                                                                                                                                                                                                                                   | '{"en": "The question must be between 2 and 6 answers.", "br": "A questão deve ter entre 2 e 6 respostas."}'                        |
      | 'com um númerio maior de respostas' | '{"answers": [{}, {}, {}, {}, {}, {}, {}]}'                                                                                                                                                                                                           | '{"en": "The question must be between 2 and 6 answers.", "br": "A questão deve ter entre 2 e 6 respostas."}'                        |
      | 'com alguma resposta sem descrição' | '{"answers": [{"description": "", "classification": "A"}, {"description": "teste", "classification": "B"}, {"description": "teste", "classification": "C"}, {"description": "teste", "classification": "D"}]}'                                        | '{"en": "The question has answers without description.", "br": "A questão possui respostas sem descrição."}'                        |
      | 'sem resposta correta'              | '{"answers": [{"description": "teste", "classification": "A"}, {"description": "teste", "classification": "B"}, {"description": "teste", "classification": "C"}, {"description": "teste", "classification": "D"}]}'                                   | '{"en": "The question must have one and only one correct answer.", "br": "A questão deve possuir 1 e apenas 1 resposta correta."}'  |
      | 'mais de um resposta correta'       | '{"answers": [{"description": "teste", "classification": "A", "correct": true}, {"description": "teste", "classification": "B", "correct": true}, {"description": "teste", "classification": "C"}, {"description": "teste", "classification": "D"}]}' | '{"en": "The question must have one and only one correct answer.", "br": "A questão deve possuir 1 e apenas 1 resposta correta."}'  |
      | 'respostas repetidas'               | '{"answers": [{"description": "teste1", "classification": "A"}, {"description": "teste2", "classification": "B", "correct": true}, {"description": "teste3", "classification": "C"}, {"description": "teste3", "classification": "D"}]}'              | '{"en": "There are repeated answers.", "br": "Existem respostas repetidas."}'                                                       |
      | 'sem classificação necessária'      | '{"answers": [{"description": "teste1", "classification": "A"}, {"description": "teste2", "classification": "B", "correct": true}, {"description": "teste3", "classification": "C"}, {"description": "teste4", "classification": "C"}]}'              | '{"en": "The answers do not have the necessary classifications.", "br": "As respostas não possuem as classificações necessárias."}' |
      | 'sem área'                          | '{"area": ""}'                                                                                                                                                                                                                                        | '{"en": "The question should have an area.", "br": "A questão deve ter uma área."}'                                                 |
      | 'sem dificuldade'                   | '{"difficulty": 0}'                                                                                                                                                                                                                                   | '{"en": "The difficulty must be between 1 and 5.", "br": "A dificuldade deve estar entre 1 e 5." }'                                 |
      | 'a questão completa'                | '{}'                                                                                                                                                                                                                                                  | '{"en": "Created successfully.", "br": "Criado com sucesso." }'                                                                     |

  Scenario Outline: Atualizar questão
    Given Dado que eu tenha atualizado uma questão
    When Quando eu atualizar <caso> atribuindo <propriedade>
    Then Então eu devo obter a mensagem <mensagem> depois de tentar atualizar

    Examples:
      | caso                                | propriedade                                                                                                                                                                                                                                               | mensagem                                                                                                                            |
      | 'sem descrição'                     | '{"description": ""}'                                                                                                                                                                                                                                     | '{"en": "Invalid description.", "br": "Descrição inválida."}'                                                                       |
      | 'sem respostas'                     | '{"answers": null}'                                                                                                                                                                                                                                       | '{"en": "The question must be between 2 and 6 answers.", "br": "A questão deve ter entre 2 e 6 respostas."}'                        |
      | 'com um número menor de respostas'  | '{"answers": [{}]}'                                                                                                                                                                                                                                       | '{"en": "The question must be between 2 and 6 answers.", "br": "A questão deve ter entre 2 e 6 respostas."}'                        |
      | 'com um número maior de respostas'  | '{"answers": [{}, {}, {}, {}, {}, {}, {}]}'                                                                                                                                                                                                               | '{"en": "The question must be between 2 and 6 answers.", "br": "A questão deve ter entre 2 e 6 respostas."}'                        |
      | 'com alguma resposta sem descrição' | '{"answers": [{"description": "", "classification": "A"}, {"description": "teste", "classification": "B"}, {"description": "teste", "classification": "C"}, {"description": "teste", "classification": "D"}]}'                                            | '{"en": "The question has answers without description.", "br": "A questão possui respostas sem descrição."}'                        |
      | 'mais de uma resposta correta'      | '{"answers": [{"description": "teste1", "classification": "A"}, {"description": "teste2", "classification": "B"}, {"description": "teste3", "classification": "C"}, {"description": "teste4", "classification": "D"}]}'                                   | '{"en": "The question must have one and only one correct answer.", "br": "A questão deve possuir 1 e apenas 1 resposta correta."}'  |
      | 'sem resposta correta'              | '{"answers": [{"description": "teste1", "classification": "A", "correct": true}, {"description": "teste2", "classification": "B", "correct": true}, {"description": "teste3", "classification": "C"}, {"description": "teste4", "classification": "D"}]}' | '{"en": "The question must have one and only one correct answer.", "br": "A questão deve possuir 1 e apenas 1 resposta correta."}'  |
      | 'respostas repetidas'               | '{"answers": [{"description": "teste1", "classification": "A"}, {"description": "teste2", "classification": "B", "correct": true}, {"description": "teste3", "classification": "C"}, {"description": "teste3", "classification": "D"}]}'                  | '{"en": "There are repeated answers.", "br": "Existem respostas repetidas."}'                                                       |
      | 'sem classificação necessária'      | '{"answers": [{"description": "teste1", "classification": "A"}, {"description": "teste2", "classification": "B", "correct": true}, {"description": "teste3", "classification": "C"}, {"description": "teste4", "classification": "C"}]}'                  | '{"en": "The answers do not have the necessary classifications.", "br": "As respostas não possuem as classificações necessárias."}' |
      | 'com outro usuário'                 | '{"id": 2}'                                                                                                                                                                                                                                               | '{"en": "Not allowed to change this question.", "br": "Sem permissão para alterar esta questão." }'                                 |
      | 'sem área'                          | '{"area": ""}'                                                                                                                                                                                                                                            | '{"en": "The question should have an area.", "br": "A questão deve ter uma área."}'                                                 |
      | 'sem dificuldade'                   | '{"difficulty": 0}'                                                                                                                                                                                                                                       | '{"en": "The difficulty must be between 1 and 5.", "br": "A dificuldade deve estar entre 1 e 5." }'                                 |
      | 'a questão completa'                | '{}'                                                                                                                                                                                                                                                      | '{"en": "Updated successfully.", "br": "Atualizada com sucesso." }'                                                                 |
      | 'questão inexistente'               | '{"id": 99}'                                                                                                                                                                                                                                              | '{"en": "The question was not found.", "br": "A questão não foi encontrada." }'                                                     |

  Scenario: Obter questões do usuário logado
    Given Dado que eu esteja logado e queira obter minhas questões
    When Quando eu buscar as questões
    Then Então eu devo obter somente as minhas questões

  Scenario: Obter as questões compartilhadas por outros usuários
    Given Dado que eu queira obter as questões compartilhadas por outros usuários
    When Quando eu buscar as questões compartilhadas
    Then Então eu devo obter somente as questões compartilhadas por outros usuários

  Scenario: Obter questão por id
    Given Dado que eu queira obter uma questão pelo id
    When Quando eu buscar a questão
    Then Então eu devo obter uma questão

  Scenario: Obter minhas áreas
    Given Dado que eu queira obter áreas já cadastradas
    When Quando eu buscar as áreas
    Then Então eu quero obter uma lista das áreas

  Scenario Outline: Remover questão
    Given Dado que eu queira remover uma questão
    When Quando eu enviar o id de uma questão <caso> <id>
    Then Então eu devo obter a mensagem <mensagem> depois de tentar remover a questão

    Examples:
      | id | caso                  | mensagem                                                                                                     |
      | 4  | 'que me pertence'     | '{ "en": "Question removed successfully.", "br":"Questão removida com sucesso." }'                           |
      | 2  | 'que não me pertence' | '{ "en": "Not allowed to remove this question.", "br": "Sem permissão para remover esta questão." }' |
      | 99 | 'que não existe'      | '{ "en": "The question was not found.", "br": "A questão não foi encontrada." }'                             |

  Scenario Outline: Compartilhamento da questão
    Given Dado que eu queira alterar o compartilhamento de uma questão
    When Quando eu enviar o id de uma <caso> <id> a ser ou não compartilhada
    Then Então eu devo obter a mensagem <mensagem> depois de alterar o compartilhamento

    Examples:
      | id | caso                          | mensagem                                                                                           |
      | 6  | 'questão que me pertence'     | '{"en": "Shared successfully.", "br": "Compartilhada com sucesso." }'                              |
      | 5  | 'questão que não me pertence' | '{"en": "Not allowed to change this question.", "br": "Sem permissão para alterar esta questão." }' |
      | 99 | 'questão que não existe'      | '{"en": "The question was not found.", "br": "A questão não foi encontrada." }'                    |