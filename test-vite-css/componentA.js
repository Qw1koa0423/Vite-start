import componentAcss from './componentA.module.css'
// import componentAless from './componentA.module.less' 
console.log("componentAcss", componentAcss)
// console.log("componentAless", componentAless)
const div = document.createElement('div')

document.body.appendChild(div)

div.className = componentAcss.footer
