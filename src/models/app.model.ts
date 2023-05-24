import { Request, Response } from 'express'

interface Claim {
    id: number
    type: string
    name: string
}

export interface AppRequest extends Request {
    claims: Claim
}

export interface AppResponse extends Response {
    claims: Claim
}