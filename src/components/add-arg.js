import React, { Component } from 'react';
import Label from '../front-logo-leaf.svg'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import '../App.css'

import {
  Link
} from 'react-router-dom'

const styles = {
  underlineStyle: {
    borderColor: '#00c04A',
  }
}

class AddArg extends Component {

  constructor(props) {
    super(props)

    this.state = {
      arg: ""
    }
  }

  render() {
    return (
      <div>
        <img src={Label} className="App-logo center" alt="logo" />
        <br/>
        <div className="center">
          <TextField
            onChange={ (e, v) => this.setState({arg: v}) }
            hintText="Search"
            underlineFocusStyle={styles.underlineStyle}
          />
        </div>
        <div>
          <Link to={'/trav/' + this.state.arg}>
            <RaisedButton>Go to Arguement</RaisedButton>
          </Link>
        </div>
      </div>
    )
  }
}

export default AddArg
