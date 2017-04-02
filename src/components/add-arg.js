import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Label from '../front-logo-leaf.svg'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import '../App.css'

const styles = {
  underlineStyle: {
    borderColor: '#00c04A',
  }
};



class AddArg extends Component {

  render() {
    return (
      <div>
        <img src={Label} className="App-logo center" alt="logo" />
        <br/>
        <div className="center">
          <TextField
            hintText="Custom Underline Focus Color"
            underlineFocusStyle={styles.underlineStyle}
          />
        </div>
        <div className="centerButton">
          <RaisedButton label="Input" />
        </div>
      </div>
    )
  }
}

export default AddArg
