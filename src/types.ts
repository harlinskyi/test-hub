export enum FormTypeFields {
  Text = 'text',
  Checkbox = 'checkbox',
  Radio = 'radio',
  Number = 'number',
}

export type TestListItem<T = FormTypeFields> = {
  question: string
  field_type: T
  options?: T extends FormTypeFields.Checkbox | FormTypeFields.Radio
    ? string[]
    : never
  answer: T extends FormTypeFields.Number
    ? number
    : T extends FormTypeFields.Checkbox
    ? string[]
    : T extends FormTypeFields.Radio
    ? string
    : T extends FormTypeFields.Text
    ? string
    : never
}
