import { Button, Result } from 'antd'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import QuestionsConfigurationPage from '../pages/QuestionsConfigurationPage'
import WelcomePage from '../pages/WelcomePage'
import TestRunner from '../pages/TestRunnerPage/TestRunnerPage'
import TestRunnerContextProvider from '../context/TestRunnerContext/TestRunnerContextProvider'
import SelectTestListPage from '../pages/SelectTestListPage'
import {
  CREATE_ROUTE,
  HOME_ROUTE,
  RUN_ROUTE,
  SELECT_TEST_ROUTE,
} from './routeConstants'

export const Router = () => {
  const router = createBrowserRouter([
    {
      path: HOME_ROUTE,
      element: <WelcomePage />,
    },
    {
      path: CREATE_ROUTE,
      element: <QuestionsConfigurationPage />,
    },
    {
      path: RUN_ROUTE,
      element: (
        <TestRunnerContextProvider>
          <TestRunner />
        </TestRunnerContextProvider>
      ),
    },
    {
      path: SELECT_TEST_ROUTE,
      element: <SelectTestListPage />,
    },
    {
      path: '*',
      element: (
        <Result
          status="404"
          title="404"
          subTitle="Вибачте, але такої сторінки не існує"
          extra={
            <Button type="primary" onClick={() => (location.href = '/')}>
              На головну
            </Button>
          }
        />
      ),
    },
  ])

  return <RouterProvider router={router} />
}
