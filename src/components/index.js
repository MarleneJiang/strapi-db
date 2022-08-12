import strapiDb from './strapi-db'
const components = [
  strapiDb,
]
const install = ((app) => {
  components.forEach(component => {
    app.use(component)
  })
})
export default install 
