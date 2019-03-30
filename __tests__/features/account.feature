Feature: Gerenciamento de conta
  Para gerenciar minha conta
  Como usuário
  Eu quero poder gerenciar minha conta

  Scenario Outline: Gerar token
    Given Dado que eu esteja cadastrado
    When Quando eu enviar as credenciais <credenciais>
    Then Para obter o token eu devo obter a mensagem <mensagem>

    Examples:
      | credenciais                                                  | mensagem                                                                       |
      | '{"email": "questionmock1@mail.com", "password": "123qwe" }' | ' { "en": "Token successfully generated", "br": "Token gerado com sucesso." }' |
      | '{"email": "questionmock1@mail.com"}'                        | ' { "en": "Invalid credentials.", "br": "Credenciais inválidas." }'            |
      | '{"password": "123qwe"}'                                     | ' { "en": "Invalid credentials.", "br": "Credenciais inválidas." }'            |
      | '{"email": "teste@mail.com", "password": "123qwee"}'         | ' { "en": "Invalid credentials.", "br": "Credenciais inválidas." }'            |

  Scenario: Obter dados da conta
    Given Dado que eu queira obter os dados da minha conta
    When Quando eu buscar os dados
    Then Então eu devo obter a propriedade Email igual a "questionmock1@mail.com"

  Scenario Outline: Cadastrar usuário
    Given Dado que eu queira me cadastrar
    When Quando eu enviar <caso> atribuindo <propriedade>
    Then Então eu devo obter a mensagem <mensagem> ao tentar me cadastrar

    Examples:
      | caso              | propriedade                           | mensagem                                                                                                             |
      | 'sem email'       | '{"email": ""}'                       | '{"br": "Email inválido.", "en": "Invalid email."}'                                                                  |
      | 'sem senha'       | '{"password": null}'                  | '{"br": "A senha deve possuir pelo menos 6 caracteres.", "en": "The password must be at least 6 characters long." }' |
      | 'email existente' | '{"email": "questionmock1@mail.com"}' | '{"br": "Este email já está em uso.", "en": "This email is already in use." }'                                       |
      | 'nome existente'  | '{"name": "question_mock_1"}'         | '{"br": "Este nome já está em uso.", "en": "This name is already in use." }'                                         |
      | 'nome inválido'   | '{"name": "qw"}'                      | '{"br": "O nome deve possuir pelo menos 3 caracteres.", "en": "The name must be at least 3 characters long." }'      |
      | 'email existente' | '{}'                                  | '{"br": "Criado com sucesso.", "en": "Created successfully" }'                                                       |


  Scenario Outline: Atualizar usuário
    Given Dado que eu queira atualizar meus dados
    When Quando eu atualizar meus dados <caso> atribuindo <propriedade>
    Then Então eu devo obter a mensagem <mensagem> ao tentar atualizar

    Examples:
      | caso              | propriedade                           | mensagem                                                                                                        |
      | 'sem email'       | '{"email": ""}'                       | '{"br": "Email inválido.", "en": "Invalid email."}'                                                             |
      | 'email existente' | '{"email": "questionmock2@mail.com"}' | '{"br": "Este email já está em uso.", "en": "This email is already in use." }'                                  |
      | 'nome existente'  | '{"name": "question_mock_2"}'         | '{"br": "Este nome já está em uso.", "en": "This name is already in use." }'                                    |
      | 'nome inválido'   | '{"name": "qw"}'                      | '{"br": "O nome deve possuir pelo menos 3 caracteres.", "en": "The name must be at least 3 characters long." }' |
      | 'dados ok'        | '{"name": "nome atualizado"}'         | '{"br": "Atualizado com sucesso.", "en": "Updated successfully." }'                                              |

  Scenario: Não enviar o token
    Given Dado que eu queira acessar um endpoint permissionado
    When Quando eu não enviar o token
    Then Então eu devo obter o retorno '{ "en": "Provide the token.", "br": "Forneça o token." }'