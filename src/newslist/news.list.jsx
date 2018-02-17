import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import PropTypes from 'prop-types';

import { Service } from './news.service';

import './news.list.css';

export class AllStories extends Component {
  render() {
    return (
      <div className="allStories">
        <Route path="/" render={() => (
          <Redirect to="stories" />
        )} />
        <Route path="/stories" render={() => (
          <StoriesList type="topstories"/>
        )} />
        <Route path="/comments" render={() => (
          <StoriesList type="comments"/>
        )} />
        <Route path="/jobs" render={() => (
          <StoriesList type="jobstories"/>
        )} />
        <Route path="/askHn" render={() => (
          <StoriesList type="askstories"/>
        )} />
      </div>
    );
  }
}

class StoriesList extends Component{
  static propTypes = {
    type: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      stories: []
    }
    this.getStoryList(this.props.type);
  }

  getStoryList(storyType) {
    Service.getStories(storyType)
      .then((stories) => {
        this.setState({ stories: stories.slice(0,20) })
      })
      .catch((err) => {
        console.log(`Failed to get stories ${storyType}`);
      })
  }

  getItem(itemId) {
    Service.getItem(itemId)
      .then((stories) => {

      })
      .catch((err) => {
        console.log(`Failed to get stories ${itemId}`);
      });
  }

  render() {
    return (
      <div className="storyList">
        <ul className="header">
            <li onClick={this.getStoryList.bind(this, 'topstories')}>Top stories</li>
            <li onClick={this.getStoryList.bind(this, 'newstories')}>New stories</li>
            <li onClick={this.getStoryList.bind(this, 'beststories')}>Best stories</li>
        </ul>
        <ul className="stories">
          {
            this.state.stories.map((storyItem) => {
              return <Story key={storyItem} itemId={storyItem} />
            })
          }
        </ul>
      </div>
    );
  }
}

class Story extends Component {
  static propTypes = {
    itemId: PropTypes.number.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {
      story: {}
    }
    this.getItem(this.props.itemId);
  }

  getItem(itemId) {
    Service.getItem(itemId)
      .then((story) => {
        this.setState({ story });
      })
      .catch((err) => {
        console.log(`Failed to get stories ${itemId}`);
      });
  }

  openComment(evt) {
    let detailElem = evt.target.parentElement;
    if(detailElem.open) {
      
    }
  }

  render() {
    return (
      <li>
        <div>
          <h3>{this.state.story.title}</h3>
          <div>{this.state.story.text}</div>
          {
            this.state.story.descendants > 0 ? (
              <details onClick={this.openComment}>
                <summary>Comments - {this.state.story.descendants}</summary>
                {
                  this.state.story.kids.slice(0,1).map((commentId) => {
                    return <Comment key={commentId} commentId={commentId} />
                  })
                }
              </details>
            ) : ""
          }
          
        </div>
        <div className="score">score - {this.state.story.score}</div>
        <div className="commentCount">comments - {this.state.story.descendants}</div>
      </li>
    )
  }
}

class Comment extends Component{
  static propTypes = {
    commentId: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);
    this.state= {
      comment: {}
    };
    this.getComment(this.props.commentId)
  }

  getComment(commentId) {
    Service.getItem(commentId)
      .then((comment) => {
        this.setState({comment});
      })
      .catch((err) => {
        console.log('Failed to get comment ', commentId);
      });
  }

  render() {
    return (
      <div className="comment">{this.state.comment.text}</div>
    );
  }
}
