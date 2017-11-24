import Vue from 'vue'
import { RouterFactory, nativeScrollBehavior } from 'meteor/akryum:vue-router2'

import routes from './routes'

const router = new RouterFactory({
    mode: 'history',
    scrollBehavior: nativeScrollBehavior,
    routes,
}).create()

router.beforeEach((to, from, next) => {
    // If `to` route requires auth then check it
    if (to.meta.needAuth) {
        if (Meteor.userId()) {
            next()
        } else {
            next({
                name: 'auth.signin',
                query: { redirect: to.fullPath }
            })
        }
    }
    next()
})

export default router