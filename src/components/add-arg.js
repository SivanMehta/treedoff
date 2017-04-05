import React, { Component } from 'react'
import Logo from '../front-logo-leaf.svg'

// Material UI
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'

// grid
import { Grid, Row, Col } from 'react-flexbox-grid'

import { Link } from 'react-router-dom'



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
        <AppBar title="Treedoff"
                  showMenuIconButton={ false }
                  iconElementRight={
                  <div>
                    <Link to={'/login'}>
                      <FlatButton label="Login"/>
                    </Link>

                    <Link to={'/signup'}>
                      <FlatButton label="Signup"/>
                    </Link>
                  </div>
                  } />

      
        <Grid fluid>

          <br/>
          <br/>
       
          <Row center="xs">
            <Col xs={4}>
              <Logo/>
            </Col>
          </Row>

          <Row center="xs">
            <Col xs={4}>
              <TextField
                onChange={ (e, v) => this.setState({arg: v}) }
                hintText="What do you want to argue?"
                underlineFocusStyle={styles.underlineStyle}
                />
              <Link to={'/trav/' + this.state.arg}>
                <RaisedButton>Treedoff</RaisedButton>
              </Link>
            </Col>
          </Row>
       
        </Grid>
      
      </div>
    )
  }
}

export default AddArg
