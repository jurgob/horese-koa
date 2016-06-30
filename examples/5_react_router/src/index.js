import React from 'react';
import App from './components/App'

export default function (initial_state){
  return (<App redditRes={initial_state.redditRes} />)
}
