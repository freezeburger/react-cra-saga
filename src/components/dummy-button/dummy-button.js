import React from 'react';

const DummyButton = ({children}) => (
    <div>{children}</div>
);
DummyButton.defaultProps={
    color:'Blue',
    size:1
};

export default DummyButton;