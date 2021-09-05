import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import html from '@rollup/plugin-html';
import serve from 'rollup-plugin-serve';
import replace from '@rollup/plugin-replace';
import external from 'rollup-plugin-peer-deps-external';
import livereload from 'rollup-plugin-livereload';
import commonjs from '@rollup/plugin-commonjs';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  input: 'src/index.tsx',
  output: {
    file: 'dist/index.js',
    format: 'iife',
  },
  plugins: [
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    resolve({ extensions }),
    external(),
    typescript({
      rollupCommonJSResolveHack: true,
      exclude: '**/__tests__/**',
      clean: true,
    }),
    commonjs({
      include: ['node_modules/**'],
      extensions: [...extensions],
    }),
    html(),
    process.env.NODE_ENV === 'development' && livereload(),
    process.env.NODE_ENV === 'development' && serve('dist'),
  ],
};
