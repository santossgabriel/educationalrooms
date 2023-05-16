export interface CreateAccountModel {
    name: string
    email: string
    password: string
}

export class AccountModel {

    id: number | undefined
    name: string | undefined
    email: string | undefined
    password: string | undefined
    updatedAt: Date | undefined | null

    constructor(id: number | undefined, name: string | undefined, email: string | undefined, password: string | undefined, updatedAt: Date) {
        this.id = id
        this.name = name
        this.email = email
        this.password = password
    }
}