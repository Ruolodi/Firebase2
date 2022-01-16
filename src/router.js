import {createRouter, createWebHistory} from 'vue-router'
import requestAnswer from './components/requestAnswer'
import cardsComp from './components/cardsComp'

export default createRouter({
    history: createWebHistory(),
    routes:[
        {path:'/requestAnswer', component: requestAnswer, alias: '/'},
        {path:'/cardscomp', component: cardsComp}, 
    ]

})