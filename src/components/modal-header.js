import React from 'react';

export const ModalHeader = ({ title, image }) => {
  return (
    <div className="modal-header">
      <img className="modal-header__image" src={image}/>
      <div className="modal-header__title">{title}</div>
    </div>
  )
}