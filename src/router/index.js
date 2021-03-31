import Vue from 'vue'
import VueRouter from 'vue-router'
import ProjectPage from '../components/ProjectPage'
import UnitPage from '../components/UnitPage'
import WorkPage from '../components/WorkPage'

Vue.use(VueRouter);

export default new VueRouter({
  // routes:[{
  //   path:'/projects',
  //   name:'projects',
  //   component:ProjectPage,
  //   chidren:[{
  //     path:':p-id/units',
  //     name:'units',
  //     component:UnitPage,
  //     children:[{
  //       path:':u-id/works',
  //       name:'works',
  //       component:WorkPage
  //     }]
  //   }]
  // },]
  
  // routes:[
  //   {
  //     path:'/projects/:pid/units/:u-id/works',
  //     name:'works',
  //     component:WorkPage
  //   },
  //   {
  //     path:'/projects/:pid/units',
  //     name:'units',
  //     component:UnitPage,
  //   },
  //   {
  //     path:'/projects',
  //     name:'projects',
  //     component:ProjectPage
  //   },
  //   {
  //     path:'/',
  //     name:'/',
  //     redirect:'/projects',
  //     component:ProjectPage
  //   }
  // ],

  // routes:[
  //   {
  //     path:'/projects/units/works',
  //     name:'works',
  //     component:WorkPage
  //   },
  //   {
  //     path:'/projects/units',
  //     name:'units',
  //     component:UnitPage,
  //   },
  //   {
  //     path:'/projects',
  //     name:'projects',
  //     component:ProjectPage
  //   },
  //   {
  //     path:'/',
  //     name:'/',
  //     redirect:'/projects',
  //     component:ProjectPage
  //   }
  // ],

  routes:[
    {
      path:'/works',
      name:'works',
      component:WorkPage
    },
    {
      path:'/units',
      name:'units',
      component:UnitPage,
    },
    {
      path:'/projects',
      name:'projects',
      component:ProjectPage
    },
    {
      path:'/',
      name:'/',
      redirect:'/projects',
      component:ProjectPage
    }
  ],
})