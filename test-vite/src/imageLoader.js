//如何加载动态资源
import imgUrl from './assets/images/1.jpg'
const img = document.createElement('img')
img.src = imgUrl
document.body.appendChild(img)