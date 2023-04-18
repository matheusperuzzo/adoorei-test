export interface FormFieldValidation {
  isTouched: boolean
  isValid: boolean
  validate: (event: Event) => void
}
