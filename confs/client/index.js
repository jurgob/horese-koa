import React from 'react';
import ReactDOM from 'react-dom';
import App from 'app'

class AppHorese extends React.Component {
  render(){
    return App(window.horese.initial_state)
  }
}

ReactDOM.render(
    (<AppHorese />),
    document.getElementById('horese_body')
);
