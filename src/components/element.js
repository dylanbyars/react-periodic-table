import React from 'react';

const classNames = require('classnames');

export const Element = ({
  mass,
  number,
  group,
  name,
  state,
  symbol,
  yearDiscovered,
  wiki,
  setModalElement
}) => {

  let groupStyle = (group) => {
    if (!group) {
      return ''
    } else {
      return group.split(' ').join('-')
    }
  }

  let stateStyle = (state) => {
    if (state === '') {
      return 'state-unknown'
    } else {
      return state
    }
  }

  let styles = classNames('element', groupStyle(group), stateStyle(state))

  return (
    <div className={styles} onClick={() => setModalElement(name, wiki, symbol, mass, number, state, group)}>
      <div className="symbol">{symbol}</div>
      <div className="number">{number}</div>
    </div>
  )
}