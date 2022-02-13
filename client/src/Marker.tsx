import React from 'react';
import './App.css';

const Marker = (props: any) => {
    const { color, name, id } = props;
    return (
      <div>
        <div
          className="pin bounce"
          style={{ backgroundColor: color, cursor: 'pointer' }}
          title={name}
        />
        <div className="pulse" />
        <div className="coordinate"><p>Testing bro</p></div>
      </div>
    );
  };

  export default Marker;