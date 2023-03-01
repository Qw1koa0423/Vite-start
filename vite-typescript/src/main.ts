console.log('Hello from main.js')
let str: string = 'Hello from main.ts'

// str = 123
interface PersonFields {
  name: string
  age: number
}
function demo(params: PersonFields) {
  console.log('name', params.name, 'age', params.age)
}

console.log(
  str,
  demo({
    name: 'zhangsan',
    age: 18,
  })
)
console.log('import.meta.env', import.meta.env.VITE_PROXY_URL)
