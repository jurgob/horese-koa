import React from 'react';

const jsonize = res => res.json()


class App extends React.Component {
  render(){
    const {redditRes} = this.props
    console.log('App render: ',this.props)

    return (
      <div>
        <h1>Reddit Feeds</h1>
        {redditRes && redditRes.data
        ? <FeedList feeds={redditRes.data.children} />
        : <LoadingFeeds />}
      </div>
    )
  }
}

const FeedList = ({feeds}) =>
  <div>
    {feeds.map( (feed, idx) => <Feed key={idx}  feed={feed} /> ) }
  </div>

const Feed = ({feed}) => {
  const {data} = feed;
  const {title} = data;

  return (
    <div>
      <h3>{title}</h3>
    </div>
  )
  }

const LoadingFeeds = () => <div>Loading...</div>

// const horese_func = (initial_state) =>


export default function (initial_state){
  console.log('££££ calcinitial_state: ',typeof(initial_state))
  return (<App redditRes={initial_state.redditRes} />)
}
