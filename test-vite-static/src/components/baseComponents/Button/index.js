import img1Url from '../../../assets/images/1.jpg'
import img2Url from '@assets/images/1.jpg'
const img = document.createElement('img')
img.src = img2Url
document.body.appendChild(img)
console.log('img1Url', img1Url)
console.log('img2Url', img2Url)