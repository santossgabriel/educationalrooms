export const formValidator = (form, prop) => {
  if (!prop.name)
    throw 'Field does not contain the name property.'
  if (!form)
    throw 'Enter the form object.'
  form.valid = true
  form[prop.name] = prop.valid
  for (let key in form)
    if (!form[key])
      form.valid = false
  return form
}