Feature: Gerenciamento de conta
  Para gerenciar minha conta
  Como usuário
  Eu quero poder gerenciar minha conta

  Scenario Outline: Gerar token
    Given Dado que eu esteja cadastrado
    When Quando eu enviar as credenciais <credenciais>
    Then Para obter o token eu devo obter a mensagem <mensagem>

    Examples:
      | credenciais                                                  | mensagem                    |
      | '{"email": "questionmock1@mail.com", "password": "123qwe" }' | 'Token gerado com sucesso.' |
      | '{"email": "questionmock1@mail.com"}'                        | 'Credenciais inválidas.'    |
      | '{"password": "123qwe"}'                                     | 'Credenciais inválidas.'    |
      | '{"email": "teste@mail.com", "password": "123qwee"}'         | 'Credenciais inválidas.'    |

  Scenario: Obter dados da conta
    Given Dado que eu queira obter os dados da minha conta
    When Quando eu buscar os dados
    Then Então eu devo obter a propriedade Email igual a "questionmock1@mail.com"

  Scenario Outline: Cadastrar usuário
    Given Dado que eu queira me cadastrar
    When Quando eu enviar <caso> atribuindo <propriedade>
    Then Então eu devo obter a mensagem <mensagem> ao tentar me cadastrar

    Examples:
      | caso              | propriedade                           | mensagem                                        |
      | 'sem email'       | '{"email": ""}'                       | "Email inválido."                               |
      | 'sem senha'       | '{"password": null}'                  | "A senha deve possuir pelo menos 6 caracteres." |
      | 'email existente' | '{"email": "questionmock1@mail.com"}' | "Este email já está em uso."                    |
      | 'nome existente'  | '{"name": "question_mock_1"}'         | "Este nome já está em uso."                     |
      | 'nome inválido'   | '{"name": "qw"}'                      | "O nome deve possuir pelo menos 3 caracteres."  |
      | 'email existente' | '{}'                                  | "Criado com sucesso."                           |


  Scenario Outline: Atualizar usuário
    Given Dado que eu queira atualizar meus dados
    When Quando eu atualizar meus dados <caso> atribuindo <propriedade>
    Then Então eu devo obter a mensagem <mensagem> ao tentar atualizar

    Examples:
      | caso                 | propriedade                           | mensagem                                        |
      | 'sem email'          | '{"email": ""}'                       | "Email inválido."                               |
      | 'sem senha'          | '{"password": null}'                  | "A senha deve possuir pelo menos 6 caracteres." |
      | 'senha insuficiente' | '{"password": "123"}'                 | "A senha deve possuir pelo menos 6 caracteres." |
      | 'email existente'    | '{"email": "questionmock2@mail.com"}' | "Este email já está em uso."                    |
      | 'nome existente'     | '{"name": "question_mock_2"}'         | "Este nome já está em uso."                     |
      | 'nome inválido'      | '{"name": "qw"}'                      | "O nome deve possuir pelo menos 3 caracteres."  |
      | 'dados ok'           | '{"password": "nome atualizado"}'     | "A senha informada é diferente da senha atual." |
      | 'dados ok'           | '{"name": "nome atualizado"}'         | "Atualizado com sucesso."                       |

  Scenario: Não enviar o token
    Given Dado que eu queira acessar um endpoint permissionado
    When Quando eu não enviar o token
    Then Então eu devo obter a mensagem "Forneça o token."