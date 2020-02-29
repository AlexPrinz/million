import 'babel-polyfill';
import * as webpack from 'webpack';
import * as webpackDevServer from 'webpack-dev-server';
import envConfig from './config/envConfig';
import webpackConfig from './webpack.config';

new webpackDevServer(webpack(webpackConfig), {
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  historyApiFallback: true,
}).listen(envConfig.webserver.port, envConfig.webserver.host);
