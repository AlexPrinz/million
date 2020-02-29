import * as constants from '@/constants';
import { each } from 'lodash';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './pages/App';


function createRootClass(vars: Record<string, string>) {
  const style: HTMLStyleElement = document.createElement('style');
  style.type = 'text/css';
  let styleString = JSON.stringify(vars);
  styleString = styleString.replace(/\"([^(\")"]+)\":\"([^(\")"]+)\"[,]?/g, '$1:$2;\n');
  style.innerHTML = `:root${styleString}`;
  document.getElementsByTagName('head')[0].appendChild(style);
}

function getConstantsStyle(
  style: Record<string, string> = {},
  consts: Object = constants,
): Object {
  each(consts, (value, key: string) => {
    if (typeof value === 'object') {
      getConstantsStyle(style, value);
    } else if (typeof value === 'string') {
      style[`--${key.replace(/_/g, '-').toLowerCase()}`] = value;
    }
  });
  createRootClass(style);
  return style;
}

ReactDOM.render(
  <Fabric style={getConstantsStyle()}>
    <App />
  </Fabric>,
  document.getElementById('root'));
