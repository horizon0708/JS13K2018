const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const path = require('path')
const isProduction = process.env.npm_lifecycle_event === 'build'
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ClosureCompilerPlugin = require('webpack-closure-compiler');
const reservedNames = require("uglify-js/tools/domprops.json")

module.exports = {
  entry: './src',
  devtool: !isProduction && 'source-map',
  // output:{
  //   publicPath: 'assets/'
  // },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          }
        ]
      },
      // {
      //   test: /\.(png|jpg|gif)$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {}
      //     }
      //   ]
      // }
    ]
  },
  // optimization: { 
  //   minimizer: [
  //     new UglifyJsPlugin({
  //       uglifyOptions: {
  //         // compress: true
  //         // keep_fnames: true,
  //         // mangle: {
  //         //   properties: {
  //         //     reserved: reservedNames
  //         //   }
  //         // }
  //       }
  //     }),
  //   ]
  // },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: isProduction && {
        collapseWhitespace: true
      },
      inlineSource: isProduction && '\.(js|css)$'
    }),
    new ClosureCompilerPlugin({
      compiler: {
        language_in: 'ECMASCRIPT6',
        language_out: 'ECMASCRIPT5',
        compilation_level: 'ADVANCED'
      },
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new OptimizeCssAssetsPlugin({}),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
    
  ],
  devServer: {
    stats: 'minimal',
    overlay: true,
    // publicPath: '.src/',
    // contentBase: path.join(__dirname, 'assets'),
  }
}
