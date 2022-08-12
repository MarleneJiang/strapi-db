import strapiDb from './index.vue'

strapiDb.install = (app) => {
  app.component(strapiDb.name, strapiDb)
}
export default strapiDb