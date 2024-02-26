import React from 'react'

import './Modal.css'

const Modal = (props) => {
  console.log(props);
  return (
    <div className="overlay">
      <div className={`overlay-content ${props.className}`}>
        <header style={{ display: "flex", justifyContent: "center" }}>
          <h1>{props.header}</h1>
        </header>
        <form
          className={`${props.className} form`}
          onSubmit={(e)=>{e.preventDefault()}}
        >
          <div className={`modal-content`}>{props.children}</div>
          <footer className="modal-footer">{props.footer}</footer>
        </form>
      </div>
    </div>
  );

}

export default Modal