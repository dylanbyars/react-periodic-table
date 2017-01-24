import React, { Component } from 'react';

class Modal extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      wikiData: null
    }
    
  }
  
  getWikiData() {
    if (this.props.isOpen) {
      // make a call to wikipedia
      
      // pull the last bit of the wiki url off 
      
      // api: https://en.wikipedia.org/w/api.php?action=opensearch&search=Platinum
      
    }
  }

  close(e) {
    if (this.props.onClose) {
      e.preventDefault()
      this.props.onClose()
    }
  }

  render() {

    if (!this.props.isOpen) {
      return null
    } else {
      return (
        <div>
          <div className="modal">
            <div className="modal__header">
              <div className="modal__header--title">{this.props.element}</div>
              <button className="modal__header--close-btn" onClick={e => this.close(e)}>Close</button>
            </div>
            <div className="modal__content">
              <div className="modal__content--summary">
                <p>Summary</p>
                <a href={this.props.wiki}>wikipedia</a>
              </div>
              <img className="modal__content--image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Bismuth_crystals_and_1cm3_cube.jpg/1024px-Bismuth_crystals_and_1cm3_cube.jpg"/>
            </div>
          </div>
          <div className="backdrop" onClick={e => this.close(e)}></div>
        </div>
      )
    }
  }
}

export default Modal;