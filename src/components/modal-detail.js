import React from 'react';

export const ModalDetail = ({
  symbol,
  mass,
  number,
  state,
  group
}) => {

  const setGroupWiki = (group) => {
    switch (group) {
      case 'nonmetal':
        return 'https://en.wikipedia.org/wiki/Nonmetal'
        break
      case 'alkali metal':
        return 'https://en.wikipedia.org/wiki/Alkali_metal'
        break
      case 'alkaline earth metal':
        return 'https://en.wikipedia.org/wiki/Alkaline_earth_metal'
        break
      case 'transition metal':
        return 'https://en.wikipedia.org/wiki/Transition_metal'
        break
      case 'metal':
        return 'https://en.wikipedia.org/wiki/Post-transition_metal'
        break
      case 'metalloid':
        return 'https://en.wikipedia.org/wiki/Metalloid'
        break
      case 'halogen':
        return 'https://en.wikipedia.org/wiki/Halogen'
        break
      case 'noble gas':
        return 'https://en.wikipedia.org/wiki/Noble_gas'
        break
      case 'lanthanoid':
        return 'https://en.wikipedia.org/wiki/Lanthanide'
        break
      case 'actinoid':
        return 'https://en.wikipedia.org/wiki/Actinide'
        break
      default:
        return null
    }
  }

  return (
    <div className="modal-details">
      <div className="modal-detail modal-details__number">
        <div className="modal-detail__label">Atomic Number:</div>
        <div className="modal-detail__value">{number}</div>
      </div>
      <div className="modal-detail modal-details__symbol">
        <div className="modal-detail__label">Symbol:</div>
        <div className="modal-detail__value">{symbol}</div>
      </div>
      <div className="modal-detail modal-details__mass">
        <div className="modal-detail__label">Atomic Mass:</div>
        <div className="modal-detail__value">
          <a href="https://en.wikipedia.org/wiki/Unified_atomic_mass_unit" className="detail-link">{mass} u</a>
        </div>
      </div>
      <div className="modal-detail modal-details__group">
        <div className="modal-detail__label">Group:</div>
        <div className="modal-detail__value">
          <a href={setGroupWiki(group)} className="detail-link">{group}</a>
        </div>
      </div>
      <div className="modal-detail modal-details__state">
        <div className="modal-detail__label">State:</div>
        <div className="modal-detail__value">{state}</div>
      </div>
    </div>
  )
}