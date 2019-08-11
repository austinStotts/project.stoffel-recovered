import React from 'react';

const StepLabel = (props) => {
  let color;
  props.color ? color = 'white' : color = 'black';
  return (
    <p 
    className="step-label"
    style={{
      color: color,
      borderColor: props.highlight || props.color || '#DDDDDD',
      backgroundColor: props.color ? props.color : props.highlight ? 'white' : '#DDDDDD',
    }}>{props.children}</p>
  )
}

export default StepLabel;