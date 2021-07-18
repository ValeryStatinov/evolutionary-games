import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import url from '@rollup/plugin-url'
import html from '@rollup/plugin-html'

import postcss from 'rollup-plugin-postcss'
import postcssImport from 'postcss-import'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

import { generateHTML } from './tools/generateHTML'

const plugins = [
  resolve(),
  commonjs(),
  typescript(),
  url({ limit: 0 }),
  postcss({
    extract: true,
    plugins: [postcssImport()],
  }),
  html({ template: generateHTML }),
]

if (process.env.NODE_ENV === 'development') {
  plugins.push(
    serve({
      open: true,
      verbose: true,
      contentBase: './build',
      host: 'localhost',
      port: 3000,
      historyApiFallback: true,
    }),
  )

  plugins.push(livereload({ watch: 'build' }))
}

export default {
  input: 'src/index.ts',
  output: {
    dir: 'build',
    entryFileNames: '[name].[hash].js',
    format: 'umd',
    sourcemap: true,
  },
  plugins,
}
