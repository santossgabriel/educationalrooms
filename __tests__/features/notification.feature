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

  Scenario: Marcar notificações como lidas
    Given Dado que eu queira marcar minhas notificações como lidas
    When Quando eu marcar minhas notificações como lidas
    Then Então eu devo obter um retorno de sucesso de notificações lidas

  Scenario: Remover todas as notificações
    Given Dado remover todas minhas notificações
    When Quando eu remover todas minhas notificações
    Then Então eu devo obter um retorno de sucesso de notificações removidas