import React from 'react';

const DummyButton = ({children}) => (
    <button>{children}</button>
);
DummyButton.defaultProps={
    color:'Blue',
    size:1
};

export default DummyButton;