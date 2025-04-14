import { createMemoryHistory, createRouter, createWebHistory } from "vue-router";
import LoginPage from "./components/pages/login_page.vue";
import RegisterPage from "./components/pages/register_page.vue"
import HomePage from "./components/pages/home_page.vue"
import ComplaintPage from "./components/pages/complaint_page.vue"
import ReportPage from "./components/pages/report_page.vue";
import ProfilePage from "./components/pages/profile_page.vue"
import {isAuth,isGuest} from "./guard/guard"

const router = createRouter({
    history : createWebHistory(""),
    routes: [
        {
            path:"/",
            component:HomePage,
            beforeEnter:isAuth
        },
        {
            path:"/login",
            component:LoginPage,
            beforeEnter:isGuest
        },
        {
            path:"/complaint",
            component: ComplaintPage,
            beforeEnter:isAuth
        },
        {
            path:"/register",
            component:RegisterPage,
            beforeEnter: isGuest
        },
        {
            path:"/report",
            component:ReportPage,
            beforeEnter:isAuth
        },
        {
            path:"/profile",
            component:ProfilePage,
            beforeEnter:isAuth
        }
    ]
})

export default router