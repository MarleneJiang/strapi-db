import { define } from 'no-bump'
import Vue from '@vitejs/plugin-vue'

export default define({
  input:{
    main:['./index.js']
  },
  output:{
    dir:'dist'
  },
  plugins:{
    Vue
  }
})