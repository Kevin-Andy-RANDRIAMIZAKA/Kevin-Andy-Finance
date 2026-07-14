export function validateTransaction(data) {
  const errors = {}

  if (!data.title || data.title.trim().length === 0) {
    errors.title = 'validation.titleRequired'
  } else if (data.title.trim().length > 100) {
    errors.title = 'validation.titleTooLong'
  }

  if (!data.amount || isNaN(Number(data.amount)) || Number(data.amount) <= 0) {
    errors.amount = 'validation.amountRequired'
  }

  if (!data.type || !['income', 'expense'].includes(data.type)) {
    errors.type = 'validation.typeRequired'
  }

  if (!data.category) {
    errors.category = 'validation.categoryRequired'
  }

  if (!data.date) {
    errors.date = 'validation.dateRequired'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
