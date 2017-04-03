import React, { Component } from 'react';
import Label from '../front-logo-leaf.svg'

// Material UI
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

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
      <Grid>
        <Row style={{marginTop: "35px"}}>
          <Col sm={4}/>
          <Col sm={4} xs={12}>
            <img src={Label} className="App-logo center" alt="logo" />
          </Col>
          <Col sm={4} />
        </Row>
        <Row style={{"text-align": "center"}}>
          <Col sm={5} xs={0}/>
          <Col sm={2} xs={12}>
            <TextField
              onChange={ (e, v) => this.setState({arg: v}) }
              hintText="Search for Arguments"
              underlineFocusStyle={styles.underlineStyle}
              />
          </Col>
          <Col sm={5} />
        </Row>
        <Row style={{"text-align": "center"}}>
          <Col sm={5} xs={0}/>
          <Col sm={2} xs={12}>
            <Link to={'/trav/' + this.state.arg}>
              <RaisedButton>Treedoff</RaisedButton>
            </Link>
          </Col>
          <Col sm={5} />
        </Row>
      </Grid>
    )
  }
}

export default AddArg
