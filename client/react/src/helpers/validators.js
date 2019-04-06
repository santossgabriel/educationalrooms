export const formValidator = (form, prop) => {
  if (!prop.name)
    throw 'Field does not contain the name property.'
  if (!form)
    throw 'Enter the form object.'
  form.valid = prop.valid
  for (let key in form)
    if (key !== prop.name && !prop.valid)
      form.valid = false
  form[prop.name] = prop.value
  return form
}