import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>hello wolrd! {new Date().toLocaleString()}</div>
    );
  }
}
ReactDOM.render(<App></App>, document.getElementById('reactapp'));
