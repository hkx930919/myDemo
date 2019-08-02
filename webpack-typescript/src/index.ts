import './styles/index.css'
import { logPerson, Person } from './utils'
logPerson({ name: 'h', age: 11 })
let p1 = { age: 1, name: '222', height: 165 }
let p: Person = p1
logPerson(p)
