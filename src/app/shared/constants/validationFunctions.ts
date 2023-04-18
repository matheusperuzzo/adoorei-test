import { emailRegex } from './email-regex'

export const emailValidation = (value: string) => emailRegex.test(value)
export const passwordValidation = (value: string) => value.length >= 6
