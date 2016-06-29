import React from 'react';
import ReactDOM from 'react-dom';
import App from 'app'
// const DIR = process.cwd()
// console.log("INSIDE index.js: "+DIR)

console.log('test')

class AppHorese extends React.Component {
  render(){
    return <App />
  }
}

ReactDOM.render(
    (<AppHorese />),
    document.getElementById('horese_body')
);
