import React from 'react'
import ReactDom from 'react-dom'
import App from './App.jsx'

// let todos = [
//     {id:1,do:'learn vue',bool:false},
//     {id:2,do:'learn react',bool:false},
//     {id:3,do:'learn angular',bool:false},
// ]

let todos = JSON.parse(localStorage.getItem('todos') || '[]')

// ReactDom.render(<App {...todos}></App>,document.querySelector('#app'))
// ReactDom.render(<App data={todos}></App>,document.querySelector('#app'))
ReactDom.render(<App data={todos}></App>,document.querySelector('#app'))
