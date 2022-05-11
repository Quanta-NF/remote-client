import React, { Component } from 'react';
import './App.css';
import ConnectionDialog from './ConnectionDialog';
import { Colors } from '@blueprintjs/core';

/*
  use with local tcp-ts:
  $ npm link ../rcp-ts

  unlink with:
  $ npm unlink rabbitcontrol
  $ npm install
*/


interface Props {
};

interface State {
  height: number;
};

class App extends React.Component<Props, State> {

  static VERBOSE_LOG = false;

  constructor(props: Props) {
    super(props);

    this.state = {
      height: window.innerHeight,
    };

    console.log("rabbitcontrol web client - version: 0.1.4");
  }

  componentDidMount() 
  {
    window.addEventListener('resize', this.onWindowResize);
  }

  componentWillUnmount() 
  {
    window.removeEventListener('resize', this.onWindowResize);
  }

  onWindowResize = () => 
  {
    this.setState({ height: window.innerHeight });
  }

  render() {

    return (
      <section className={"bp3-dark"}>

        <div className="App" 
          style={{            
            minHeight: this.state.height-40
        }}>

          <ConnectionDialog />

          <div style={{
            flex: 2
          }}></div>

          
        </div>

      </section>
    );
  }
}

export default App;
