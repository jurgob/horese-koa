import React from 'react';

const jsonize = res => res.json()


class App extends React.Component {
  render(){
    const {redditRes} = this.props

    return (
      <div>
        <h1>Reddit Feeds Simple</h1>
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

export default function (initial_state){
  return (<App redditRes={initial_state.redditRes} />)
}
