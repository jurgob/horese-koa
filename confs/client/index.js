import React from 'react';
import ReactDOM from 'react-dom';
import App from 'app'

class AppHorese extends React.Component {
  render(){
    return <App />
  }
}

ReactDOM.render(
    (<AppHorese />),
    document.getElementById('horese_body')
);
