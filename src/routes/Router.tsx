import { Button, Result } from 'antd'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import QuestionsConfigurationPage from '../pages/QuestionsConfigurationPage'
import WelcomePage from '../pages/WelcomePage'

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <WelcomePage />,
    },
    {
      path: '/create',
      element: <QuestionsConfigurationPage />,
    },
    {
      path: '*',
      element: (
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button type="primary" onClick={() => (location.href = '/')}>
              Back Home
            </Button>
          }
        />
      ),
    },
  ])

  return <RouterProvider router={router} />
}

export default Router
