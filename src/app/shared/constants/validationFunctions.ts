import { emailRegex } from './regex'

export const emailValidation = (value: string) => emailRegex.test(value)
export const passwordValidation = (value: string) => value.length >= 6
