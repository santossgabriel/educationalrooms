Feature: Logs
  Para visualizar logs
  Como usuário administrador do sistema
  Quero poder obter lista de logs

  Scenario Outline: Obter logs gerados
    Given Dado que eu esteja logado com usuário <usuario> e senha <senha>
    When Quando eu buscar os logs
    Then Então eu devo obter dos logs a mansagem <mensagem>

    Examples:
      | usuario                  | senha    | mensagem                              |
      | 'questionmock3@mail.com' | '123qwe' | "Sem permissão para visualizar logs." |
      | 'questionmock4@mail.com' | '123qwe' | "Logs retornados com sucesso."        |
