import React from 'react';

const jsonize = res => res.json()


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      redditRes: {}
    }
  }

  componentDidMount(){
    fetch("https://www.reddit.com/r/all.json")
      .then(jsonize)
      .then( json =>  this.setState({redditRes: json}))
  }

  render(){
    const {redditRes} = this.state
    return (
      <div>
        <h1>Reddit Feeds</h1>
        {redditRes.data
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


export default () => <App />
