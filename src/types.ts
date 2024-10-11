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
    ? Array<{ value: string; isAnswer: boolean }>
    : never
  answer?: T extends FormTypeFields.Text | FormTypeFields.Number
    ? string
    : never
}

export type TestListRunnerItem<T = FormTypeFields> = TestListItem<T> & {
  id: number
  clientAnswer?: T extends FormTypeFields.Checkbox ? string[] : string
}

export type TestListRunnerItemCalculated<T = FormTypeFields> =
  TestListRunnerItem<T> & {
    isCorrect: boolean
    rating: number
  }

export type CalculateData = {
  questions: TestListRunnerItemCalculated[]
  totalRating: number
  totalQuestions: number
}

export type MockDataType = {
  title: string
  count: number
  tests: TestListItem[]
  icon: string
}
