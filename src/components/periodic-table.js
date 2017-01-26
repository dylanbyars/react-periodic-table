import React, { Component } from 'react';
import axios from 'axios';

import Spinner from 'react-spinkit';
import Modal from './modal';
import { Header } from './header';
import { Group } from './group';
import { Footer } from './footer';

class PeriodicTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // holds the element info when the ajax request launched when the component mounts returns data
      // null to start
      elements: null,
      // this is where the elements broken into groups will be stored
      group1: null,
      group2: null,
      group3: null,
      group4: null,
      group5: null,
      group6: null,
      group7: null,
      group8: null,
      group9: null,
      group10: null,
      group11: null,
      group12: null,
      group13: null,
      group14: null,
      group15: null,
      group16: null,
      group17: null,
      group18: null,
      lanthanoids: null,
      actinoids: null,
      // the active element, if one's selected by the user. Null to start.
      activeElement: null,
      activeElementWiki: null,
      activeElementSymbol: null,
      activeElementMass: null,
      activeElementNumber: null,
      activeElementState: null,
      activeElementGroup: null,
      // boolean to determine if the modal is/should be open or not. False to start
      modalOpen: false
    }

    this.setModalElement = this.setModalElement.bind(this)
    this.closeModal = this.closeModal.bind(this)

  }

  // launches an ajax request to the element data and stores that info in the PeriodicTable componenent's state
  componentDidMount() {
    const dataUrl = 'https://rawgit.com/dbyars/periodic-table-1/master/data.json'
    axios.get(dataUrl).then(response => {
      let returnedData = response.data.map(({
        atomicMass,
        atomicNumber,
        groupBlock,
        name,
        standardState,
        symbol,
        yearDiscovered,
        wiki
      }) => {
        return {
          mass: atomicMass,
          number: atomicNumber,
          group: groupBlock,
          name: name,
          state: standardState,
          symbol: symbol,
          yearDiscovered: yearDiscovered,
          wiki: wiki
        }
      })

      this.setState({
        elements: returnedData
      })

      // now that all of the element data is stored in state, create the groups
      const groups = [
        [1, 3, 11, 19, 37, 55, 87],
        [4, 12, 20, 38, 56, 88],
        [21, 39],
        [22, 40, 72, 104],
        [23, 41, 73, 105],
        [24, 42, 74, 106],
        [25, 43, 75, 107],
        [26, 44, 76, 108],
        [27, 45, 77, 109],
        [28, 46, 78, 110],
        [29, 47, 79, 111],
        [30, 48, 80, 112],
        [5, 13, 31, 49, 81, 113],
        [6, 14, 32, 50, 82, 114],
        [7, 15, 33, 51, 83, 115],
        [8, 16, 34, 52, 84, 116],
        [9, 17, 35, 53, 85, 117],
        [2, 10, 18, 36, 54, 86, 118]
      ]

      const fBlock = [
        [57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71],
        [89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103]
      ]

      const getGroupElements = groupElements => {
        return this.state.elements.filter(element => {
          return groupElements.includes(element.number)
        })
      }

      //for the 2 empty spots in group 3
      const fillerElement = () => {
        return {
          mass: null,
          number: null,
          group: null,
          name: null,
          state: null,
          symbol: null,
          yearDiscovered: null,
          wiki: null
        }
      }

      this.setState({
        group1: getGroupElements(groups[0]),
        group2: getGroupElements(groups[1]),
        group3: [...getGroupElements(groups[2]), fillerElement, fillerElement],
        group4: getGroupElements(groups[3]),
        group5: getGroupElements(groups[4]),
        group6: getGroupElements(groups[5]),
        group7: getGroupElements(groups[6]),
        group8: getGroupElements(groups[7]),
        group9: getGroupElements(groups[8]),
        group10: getGroupElements(groups[9]),
        group11: getGroupElements(groups[10]),
        group12: getGroupElements(groups[11]),
        group13: getGroupElements(groups[12]),
        group14: getGroupElements(groups[13]),
        group15: getGroupElements(groups[14]),
        group16: getGroupElements(groups[15]),
        group17: getGroupElements(groups[16]),
        group18: getGroupElements(groups[17]),
        lanthanoids: getGroupElements(fBlock[0]),
        actinoids: getGroupElements(fBlock[1])
      })

    })
  }

  setModalElement(element, wiki, symbol, mass, number, state, group) {
    this.setState({
      activeElement: element,
      activeElementWiki: wiki,
      activeElementSymbol: symbol,
      activeElementMass: mass,
      activeElementNumber: number,
      activeElementState: state,
      activeElementGroup: group,
      modalOpen: true
    })
  }

  closeModal() {
    this.setState({
      modalOpen: false
    })
  }

  render() {

    if (!this.state.group1) {
      return (
        <div className="spinner-container">
          <Spinner spinnerName="wandering-cubes" />
        </div>
      )
    } else {
      return (
        <div className="periodic-table">

          {this.state.modalOpen && <Modal onClose={this.closeModal} element={this.state.activeElement} wiki={this.state.activeElementWiki} symbol={this.state.activeElementSymbol} mass={this.state.activeElementMass} number={this.state.activeElementNumber} state={this.state.activeElementState} group={this.state.activeElementGroup} />}
          
          <Header />
          <div className="main-block">
            <Group elements={this.state.group1} setModalElement={this.setModalElement} />
            <Group elements={this.state.group2} setModalElement={this.setModalElement} />
            <Group elements={this.state.group3} setModalElement={this.setModalElement} />
            <Group elements={this.state.group4} setModalElement={this.setModalElement} />
            <Group elements={this.state.group5} setModalElement={this.setModalElement} />
            <Group elements={this.state.group6} setModalElement={this.setModalElement} />
            <Group elements={this.state.group7} setModalElement={this.setModalElement} />
            <Group elements={this.state.group8} setModalElement={this.setModalElement} />
            <Group elements={this.state.group9} setModalElement={this.setModalElement} />
            <Group elements={this.state.group10} setModalElement={this.setModalElement} />
            <Group elements={this.state.group11} setModalElement={this.setModalElement} />
            <Group elements={this.state.group12} setModalElement={this.setModalElement} />
            <Group elements={this.state.group13} setModalElement={this.setModalElement} />
            <Group elements={this.state.group14} setModalElement={this.setModalElement} />
            <Group elements={this.state.group15} setModalElement={this.setModalElement} />
            <Group elements={this.state.group16} setModalElement={this.setModalElement} />
            <Group elements={this.state.group17} setModalElement={this.setModalElement} />
            <Group elements={this.state.group18} setModalElement={this.setModalElement} />
          </div>
          <div className="f-block">
            <Group elements={this.state.lanthanoids} setModalElement={this.setModalElement} />
            <Group elements={this.state.actinoids} setModalElement={this.setModalElement} />
          </div>
          <Footer />
        </div>
      )
    }
  }
}

export default PeriodicTable;