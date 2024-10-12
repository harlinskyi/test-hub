import { useState } from 'react'
import storageProvider from '../localStorage/LocalStorageProvider'
import MockTests from '../mock'
import { LocalStorageMenuListItem, TestListItem } from '../types'
import { generateUUID } from '../utils'

type AddTestType = {
  test: TestListItem[]
  title: string
}

const useManageTests = () => {
  const [tests, setTests] = useState<LocalStorageMenuListItem[]>([
    ...MockTests,
    ...(storageProvider.getItem('tests') || []),
  ])

  const addTest = ({ test, title }: AddTestType) => {
    const UUID = generateUUID()
    const newTest: LocalStorageMenuListItem = {
      id: UUID,
      title: title,
      count: test.length,
      test,
      icon: null,
    }

    setTests([...tests, newTest])
    storageProvider.setItem(
      'tests',
      [...tests, newTest].filter((test) => test.id)
    )
  }

  const removeTest = (id: string) => {
    const updatedTests = tests.filter((test) => test.id !== id)
    setTests(updatedTests)
    storageProvider.setItem(
      'tests',
      updatedTests.filter((test) => test.id)
    )
  }

  const updateTest = (id: string, updatedTest: TestListItem) => {
    const updatedTests = tests.map((test) => {
      if (test.id === id) {
        return {
          ...test,
          test: test.test.map((t) => {
            if (t.question === updatedTest.question) {
              return updatedTest
            }
            return t
          }),
        }
      }
      return test
    })

    setTests(updatedTests)
    storageProvider.setItem(
      'tests',
      updatedTests.filter((test) => test.id)
    )
  }

  return { tests, addTest, removeTest, updateTest }
}

export default useManageTests
