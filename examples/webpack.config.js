const fs = require('fs')
const path = require('path')
const webpack = require('webpack')


module.exports = {
  mode: 'development',
  /**
   * 会在 examples 目录下新建多个子目录
   * 会把每个部分的 demo放在不同的子目录下
   * 每个子目录下都会新建一个 app.ts
   * app.ts 作为webpack构建的入口文件
   * entries 收集了多个入口文件，并且每个入口文件还引用了用于热更新的文件
   * entries 是一个对象， key 为目录名
   */
  entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
    const fullDir = path.join(__dirname, dir)
    const entry = path.join(fullDir, 'app.ts')
    if(fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)){
      entries[dir] = ['webpack-hot-middleware/client', entry]
    }
    
    return entries
  }, {}),
  /**
   * 根据不同的目录名称。打包生成目标js， 名称和目录一致
   * 根据entries不同的key， 生成不同的filename
   */
  output:{
    path:path.join(__dirname, '__build__'),
    filename:'[name].js',
    publicPath: '/__build__/'
  },
  module:{
    rules: [
      {
        test:/\.ts$/,
        enforce:'pre',
        use:[
          {loader: 'tslint-loader'}
        ]
      },
      {
        test:/\.tsx?$/,
        use:[
          {
            loader:'ts-loader',
            options:{
              transpileOnly: true
            }
          }
        ]
      }
    ]
  },
  resolve:{
    extensions:['.ts','.tsx', '.js']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}