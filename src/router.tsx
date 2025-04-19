import { createBrowserRouter } from 'react-router'

import Layout from './components/Layout/Layout'
import Index from './pages/Table'
import Notfound from './pages/Notfound'

const router = createBrowserRouter([
  {
    path: '/index',
    element: (
      <Layout>
        <Index />
      </Layout>
    ),
  },
  {
    path: '/',
    element: (
      <Layout>
        <Index />
      </Layout>
    ),
  },
  {
    path: '*',
    element: (
      <Layout>
        <Notfound />
      </Layout>
    ),
  },
])

export default router
