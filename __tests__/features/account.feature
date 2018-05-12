Feature: Gerenciamento de conta
  Para gerenciar minha conta
  Como usuário
  Eu quero poder gerenciar minha conta

  Scenario: Não enviar o token
    Given Dado que eu queira acessar um endpoint permissionado
    When Quando eu não enviar o token
    Then Então eu devo obter a mensagem "Forneça o token."

  Scenario Outline: Cadastrar usuário
    Given Dado que eu queira me cadastrar
    When Quando eu enviar <caso> atribuindo <propriedade>
    Then Então eu devo obter a mensagem <mensagem> ao tentar me cadastrar

    Examples:
      | caso        | propriedade          | mensagem                                        |
      | 'sem email' | '{"email": ""}'      | "Email inválido."                               |
      | 'sem senha' | '{"password": null}' | "A senha deve possuir pelo menos 6 caracteres." |

  Scenario Outline: Atualizar usuário
    Given Dado que eu queira atualizar meus dados
    When Quando eu atualizar meus dados <caso> atribuindo <propriedade>
    Then Então eu devo obter a mensagem <mensagem> ao tentar atualizar

    Examples:
      | caso                 | propriedade           | mensagem                                        |
      | 'sem email'          | '{"email": ""}'       | "Email inválido."                               |
      | 'sem senha'          | '{"password": null}'  | "A senha deve possuir pelo menos 6 caracteres." |
      | 'senha insuficiente' | '{"password": "123"}' | "A senha deve possuir pelo menos 6 caracteres." |