import {  ReactElement } from 'react';
import './index.less'

function LinkButton (props : any): ReactElement {
  return (
    <button {...props} className="link-button"></button>
  );
}

export default LinkButton;