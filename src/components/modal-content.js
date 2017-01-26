import React from 'react';

export const ModalContent = ({ summary, link }) => {
  return (
    <div className="modal-content">
      <p className="modal-content__summary">{summary}</p>
      <a className="modal-content__wiki-link" href={link}>wikipedia</a>
    </div>
  )
}