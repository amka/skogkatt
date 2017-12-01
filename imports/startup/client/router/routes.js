import Index from '/imports/ui/pages/Index'
import Dashboard from '/imports/ui/pages/Dashboard'
import ExamplePage from '/imports/ui/pages/examplePage/ExamplePage'
import NotFound from '/imports/ui/pages/NotFound'

import authRoutes from './authRoutes'

const routes = [{
        path: '/',
        component: Index,
        name: 'index'
    },
    {
        path: '/board',
        component: Dashboard,
        name: 'dashboard',
        meta: {
            needAuth: true
        }
    },
    {
        path: '/example-page',
        component: ExamplePage,
        name: 'example-page'
    },
    {
        path: '*',
        component: NotFound
    },
    ...authRoutes,
]

export default routes