import { initialData } from './seed'

async function main() {
  console.log(initialData)
  console.log('Seed executed successfully!')
}

(() => {
  console.log("NODE_ENV: " + process.env.NODE_ENV)
  if (process.env.NODE_ENV === 'production') return
  main()
})()