// import componentAcss from './componentA.css'
import componentAcss from './componentA.module.css'
// import componentAless from './componentA.module.less' 
console.log('componentAcss', componentAcss)
const div = document.createElement('div')

document.body.appendChild(div)

div.className = componentAcss.footer
