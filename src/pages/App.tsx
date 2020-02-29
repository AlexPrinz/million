// import * as theme from '@/styles/main.scss';
import { ENV } from '@/constants';
import Login from '@/pages/Login';
import { inject, observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import * as React from 'react';



class App extends React.Component {

  private showDevTools(): JSX.Element {
    if (ENV === 'development' && false) {

      return (
        <div>
          <DevTools />
        </div>
      );

    }

    return null;
  }

  render() {
    return (
      <div>
        {this.showDevTools()}
        <Login />
      </div>
    );
  }
}

export default App;
