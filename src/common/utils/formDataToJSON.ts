export function formDataToJSON(formData: FormData): { [key: string]: any } {
  const jsonObject: { [key: string]: any } = {}

  formData.forEach((value, key) => {
    jsonObject[key] = value
  })

  return jsonObject
}
