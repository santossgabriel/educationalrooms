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
      | id | mensagem                                                                                                   |
      | 99 | { "br": "A notificação não existe.", "en": "Notification does not exist." }                                |
      | 3  | { "br": "Sem permissão para remover esta notificação.", "en": "Not allowed to remove this notification." } |
      | 4  | { "br": "Removido com sucesso.", "en": "Removed successfully." }                                           |

  Scenario: Marcar notificações como lidas
    Given Dado que eu queira marcar minhas notificações como lidas
    When Quando eu marcar minhas notificações como lidas
    Then Então eu devo obter um retorno de sucesso de notificações lidas { "br": "Todas as notificações foram marcadas como lidas.", "en": "All notifications were marked as read." }

  Scenario: Remover todas as notificações
    Given Dado remover todas minhas notificações
    When Quando eu remover todas minhas notificações
    Then Então eu devo obter um retorno de sucesso de notificações removidas { "br": "Removidas com sucesso.", "en": "Removed successfully." }