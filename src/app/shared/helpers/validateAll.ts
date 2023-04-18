import type { FormFields, ValidationFns } from '../models'

export function validateAll(
  fields: FormFields,
  validationFns: ValidationFns,
  extraValidations?: [() => boolean]
): boolean {
  let isAllValid = true
  for (const data in fields) {
    if (Object.prototype.hasOwnProperty.call(fields, data)) {
      const isValid = validationFns[`${data}Validation`](fields[data].value)

      if (!isValid) {
        isAllValid = false
      }
    }
  }

  if (extraValidations) {
    extraValidations.forEach((validation) => {
      const isValid = validation()
      if (!isValid) {
        isAllValid = false
      }
    })
  }

  return isAllValid
}
