// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Home from './views/home.vue'
import NotFound from './views/404.vue'
import Login from './views/login.vue'
import Table from './views/nav1/table.vue'
import Form from './views/nav1/form.vue'
import Charts from './views/charts/echarts.vue'

const routes = [{
  path: '/login',
  name: 'login',
  component: Login,
  hidden: true
}, {
  path: '/',
  name: 'home',
  component: Home,
  iconCls: 'fa fa-id-card-o',
  children: [
    { path: '/table', component: Table, name: 'table' },
    { path: '/form', component: Form, name: 'form' }
  ]
}, {
  path: '/',
  name: 'Charts',
  component: Home,
  iconCls: 'fa fa-bar-chart',
  children: [
    { path: '/echarts', component: Charts, name: 'echarts' }
  ]
}, {
  path: '*',
  name: '404',
  component: NotFound,
  hidden: true
}]

export default routes
