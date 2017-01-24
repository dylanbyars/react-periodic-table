import React from 'react';

import { Element } from './element';

export const Group = ({
  elements,
  setModalElement
}) => {

  const group = elements.map(({
    mass,
    number,
    group,
    name,
    state,
    symbol,
    yearDiscovered,
    wiki
  }) => {

    return <Element key={number} mass={mass} number={number} group={group} name={name} state={state} symbol={symbol} yearDiscovered={yearDiscovered} wiki={wiki} setModalElement={setModalElement} />

  })

  return (
    <div className="group">{group}</div>
  )
}