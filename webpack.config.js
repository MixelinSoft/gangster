import { resolve } from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export const entry = './src/main.js';
export const output = {
  filename: 'bundle.js',
  path: resolve(__dirname, 'dist')
};
export const devServer = {
  static: {
    directory: resolve(__dirname, 'dist')
  },
  open: true
};
export const plugins = [
  new CopyWebpackPlugin({
    patterns: [
      { from: 'assets', to: 'assets' }, // Копируем папку assets в dist
      { from: 'index.html', to: '' } // Копируем index.html в dist
    ]
  })
];
export const module = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
};
export const mode = 'development';
