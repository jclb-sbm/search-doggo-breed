import React from "react";
import "./styles.css";

export interface IFlexContainerProps {
  children: React.ReactNode;
}

function FlexContainer(props: IFlexContainerProps) {
  return (
    <div className="container">
      {props.children}
    </div>
  );
}

export default FlexContainer;