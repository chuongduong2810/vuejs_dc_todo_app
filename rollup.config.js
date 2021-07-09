import vue from 'rollup-plugin-vue'
import css from 'rollup-plugin-css-only'

export default {
    input: 'src/components/TodoItem.vue',
    output: {
      format: 'esm',
      file: 'dist/js/bundle.js'
    },
    plugins: [
        vue(),
        css({ output: 'bundle.css' })
    ]
  }