import React, { Component } from 'react';
import jsonp from 'b-jsonp';

import Spinner from 'react-spinkit';

class Modal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      wikiSummary: null,
      wikiImage: null
    }

    this.checkKeycode = this.checkKeycode.bind(this)

  }

  componentDidMount() {
    // listen for the escape key and close modal if it's heard
    window.addEventListener('keydown', this.checkKeycode)

    // make a call to wikipedia using b-jsonp library

    // pull the last bit of the wiki url off 
    let regex = /wiki\/(.*)/g
    let url = this.props.wiki
    let wikiTitle = regex.exec(url)[1]

    // build the url to send the request to
    const wikiSummaryUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${wikiTitle}&format=json`

    // a function to update the modal's state
    const updateWikiSummary = (data) => {
      this.setState({
        wikiSummary: data
      })
    }

    // get first sentence of wiki page
    jsonp(wikiSummaryUrl, function(err, response) {
      if (wikiTitle === response[0]) {
        updateWikiSummary(response[2][0])
      } else {
        console.log(response)
      }
    })
    
    // get an image from the wiki page
    
    const wikiImageUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${wikiTitle}&prop=pageimages&format=json&pithumbsize=100`
    
    // a function to update the modal's state
    const updateWikiImage = (data) => {
      this.setState({
        wikiImage: data
      })
    }

    // get thumbnail image from wiki page
    jsonp(wikiImageUrl, function(err, response) {
      let pageId = Object.keys(response.query.pages)
      updateWikiImage(response.query.pages[pageId].thumbnail.source)
    })
    
  }

  componentWillUnmount() {
    // remove the escape-key-closes-the-modal listener
    window.removeEventListener('keydown', this.checkKeycode)
  }

  // Closes the modal if user hits the escape key when modal is open
  checkKeycode(e) {
    if (e.code === 'Escape') {
      this.props.onClose()
    }
  }

  close(e) {
    if (this.props.onClose) {
      e.preventDefault()
      this.props.onClose()
    }
  }

  render() {

    if (!this.state.wikiSummary || !this.state.wikiImage) {
      return (
        <div>
          <div className="modal">
            <Spinner spinnerName="cube-grid" />
          </div>
          <div className="backdrop" onClick={e => this.close(e)}></div>
        </div>
      )
    } else {
      return (
        <div>
          <div className="modal">
            <button className="modal__close-btn" onClick={e => this.close(e)}>&#10006;</button>
            <div className="modal__header">
              <div className="modal__header--title">{this.props.element}</div>
              <img className="modal__header--image" src={this.state.wikiImage}/>
            </div>
            <div className="modal__content">
              <div className="modal__content--summary">
                <p>{this.state.wikiSummary}</p>
              </div>
              <a className="modal__content--wiki-link" href={this.props.wiki}>wikipedia</a>
            </div>
          </div>
          <div className="backdrop" onClick={e => this.close(e)}></div>
        </div>
      )
    }
  }
}

export default Modal;