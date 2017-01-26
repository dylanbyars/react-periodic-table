import React, { Component } from 'react';
import jsonp from 'b-jsonp';

import { ModalHeader } from './modal-header';
import { ModalDetail } from './modal-detail';
import { ModalContent } from './modal-content';

class Modal extends Component {
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

  // Closes the modal if user hits the escape key when the modal is open
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
    if (this.props.element === "fillerElement") {
      return null
    } else {
      return (
        <div>
          <div className="modal">
            <div className="modal__close-btn" onClick={e => this.close(e)}>
              <img src="https://image.flaticon.com/icons/svg/148/148766.svg" />
            </div>
            <ModalHeader title={this.props.element} image={this.state.wikiImage} />
            <ModalDetail symbol={this.props.symbol} mass={this.props.mass} number={this.props.number} state={this.props.state} group={this.props.group} />
            <ModalContent summary={this.state.wikiSummary} link={this.props.wiki} /> 
          </div>
          <div className="backdrop" onClick={e => this.close(e)}></div>
        </div>
      )
    }
  }
}

export default Modal;