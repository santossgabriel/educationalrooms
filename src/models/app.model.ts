import { Request } from 'express'

interface Claim {
    id: number
}

export interface AppRequest extends Request {
    claims: Claim
}