Feature: Notificações
  Para obter notificações logs
  Como usuário do sistema
  Quero poder obter minhas notificações

  Scenario: Obter minhas notificações
    Given Dado que eu queira obter minhas notificações
    When Quando eu buscar minhas notificações
    Then Então eu devo obter uma lista de notificações

  Scenario Outline: Remover notificação
    Given Dado que eu queira remover a notificação
    When Quando eu remover uma notificação de id <id>
    Then Então eu devo receber a mensagem <mensagem> depois de remover a notificação

    Examples:
      | id | mensagem                             |
      | 99 | 'A notificação não existe..'         |
      | 3  | 'Sem permissão para remover o item.' |
      | 4  | 'Removido com sucesso.'              |