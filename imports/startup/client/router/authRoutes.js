import SignUp from '/imports/ui/pages/auth/SignUp'
import SignIn from '/imports/ui/pages/auth/SignIn'
import SignOut from '/imports/ui/pages/auth/SignOut'
import VerifyEmail from '/imports/ui/pages/auth/VerifyEmail'
import RecoverPassword from '/imports/ui/pages/auth/RecoverPassword'
import ResetPassword from '/imports/ui/pages/auth/ResetPassword'

import Profile from '/imports/ui/pages/auth/Profile'

const authRoutes = [{
        path: '/sign-up',
        component: SignUp,
        name: 'auth.signup'
    },
    {
        path: '/sign-in',
        component: SignIn,
        name: 'auth.signin'
    },
    {
        path: '/sign-out',
        component: SignOut,
        name: 'auth.signout',
        meta: {
            needAuth: true
        }
    },
    {
        path: '/verify-email/:token',
        component: VerifyEmail,
        name: 'auth.verifyEmail'
    },
    {
        path: '/recover-password',
        component: RecoverPassword,
        name: 'auth.recoverPassword'
    },
    {
        path: '/reset-password/:token',
        component: ResetPassword,
        name: 'auth.resetPassword'
    },
    {
        path: '/me',
        component: Profile,
        name: 'auth.profile',
        meta: {
            needAuth: true
        }
    }
]

export default authRoutes