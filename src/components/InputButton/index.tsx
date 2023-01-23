import React from 'react';
import './styles.css';

interface IInputButton {
  onClick: React.MouseEventHandler<HTMLButtonElement>,
  children: React.ReactNode,
}

function InputButton(props: IInputButton) {
  return (
    <div>
      <button onClick={props.onClick}>
        {props.children}
      </button>
    </div>
  );
}

export default InputButton;