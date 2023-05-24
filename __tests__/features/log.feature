Feature: Logs
    Para visualizar logs
    Como usuário administrador do sistema
    Quero poder obter lista de logs

    Scenario Outline: Obter logs gerados
        Given Dado que eu esteja logado com email <email> e senha <senha>
        When Quando eu buscar os logs
        Then Então eu devo obter dos logs a mensagem <mensagem>

        Examples:
            | email                  | senha  | mensagem                                                                        |
            | questionmock3@mail.com | 123qwe | {"en": "Now allowed to view logs", "br": "Sem permissão para visualizar logs."} |
            | questionmock4@mail.com | 123qwe | Logs retornados com sucesso.                                                    |
