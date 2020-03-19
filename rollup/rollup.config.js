import { uglify } from 'rollup-plugin-uglify'

export default {
  input: 'ueditor.all.js',
  output: {
    format: 'iife',
    moduleName: 'ueditor',
    file: './dist/ueditor.all.iife.js',
    strict: false
  },
  plugins: [
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true
      }
    })
  ]
}
