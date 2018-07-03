Feature: Sala
  Para visualizar as salas
  Como usuário do sistema
  Quero gerenciar minhas salas e entrar em outras salas

  Scenario: Obter salas disponíveis
    Given Dado eu que queira obter as salas disponiveis
    When Quando eu buscar as salas disponíveis
    Then Então eu devo obter uma lista de salas disponíveis

  Scenario: Obter salas que me pertencem
    Given Dado que eu queira obter as salas que me pertencem
    When Quando eu buscar as salas que me pertencem
    Then Então eu devo obter uma lista de salas que me pertencem

  Scenario: Obter salas que participei
    Given Dado eu que queira obter as salas que participei
    When Quando eu buscar as salas que participei
    Then Então eu devo obter uma lista de salas que participei

  Scenario Outline: Criar salas
    Given Dado eu que queira criar uma sala
    When Quando eu criar a sala <caso> com nome <nome>
    Then Então eu devo obter a mensagem <mensagem> depois de tentar criar a sala

    Examples:
      | caso       | nome                | mensagem                   |
      | 'Sem nome' | ''                  | "A sala deve ter um nome." |
      | 'Completa' | 'nome da sala mock' | "Sala criada com sucesso." |

  Scenario Outline: Entrar em uma sala
    Given Dado eu que queira entrar em uma sala
    When Quando eu entrar em uma sala <caso> usando id <id>
    Then Então eu devo obter a mensagem <mensagem> depois de tentar entrar na sala

    Examples:
      | caso                  | id | mensagem                      |
      | 'Que eu já esteja'    | 1  | "Usuário já incluso na sala." |
      | 'Que não exista'      | 99 | "A sala não existe."          |
      | 'Que eu possa entrar' | 2  | "Entrou na sala."             |

  Scenario Outline: Adicionar questões
    Given Dado eu que queira adicionar questões à uma sala
    When Quando adicionar as questões <caso> atribuindo <propriedades>
    Then Então eu devo obter a mensagem <mensagem> depois de tentar adicionar as questões

    Examples:
      | caso                                      | propriedades                     | mensagem                                               |
      | 'sem nome da sala'                        | '{"name": ""}'                   | "Informe o nome da sala."                              |
      | 'sem id da sala'                          | '{"roomId": 0}'                  | "Informe a sala."                                      |
      | 'sem as questões'                         | '{"questions": []}'              | "Informe as questões."                                 |
      | 'que não existem'                         | '{"questions": [{ "id": 99 }] }' | "Há questões informadas que não existem."              |
      | 'que não pertencem ao usuário'            | '{"questions": [{ "id": 1 }] }'  | "Há questões informadas que não pertencem ao usuário." |
      | 'à uma sala que não existe'               | '{"roomId": 99}'                 | "A sala não existe."                                   |
      | 'à uma sala que não pertencem ao usuário' | '{"roomId": 3}'                  | "A sala informada não pertence ao usuário."            |
      | 'questão completa'                        | '{}'                             | "Questões adicionadas com sucesso."                    |

  Scenario Outline: Remover sala
    Given Dado que eu queira remover uma sala
    When Quando eu enviar o id de uma sala <caso> <id>
    Then Então eu devo obter a mensagem <mensagem> depois de tentar remover a sala

    Examples:
      | id | caso                  | mensagem                                     |
      | 2  | 'que me pertence'     | "Sala removida com sucesso."                 |
      | 3  | 'que não me pertence' | "Usuário sem permissão para remover o item." |
      | 99 | 'que não existe'      | "A sala não existe."                         |