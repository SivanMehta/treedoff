import React, { Component } from 'react'

// Material UI
import IconButton from 'material-ui/IconButton'
import HistoryIcon from 'material-ui/svg-icons/action/history.js'
import Drawer from 'material-ui/Drawer'
import { List, ListItem } from 'material-ui/List'

export default class History extends Component {

  constructor(props) {
    super(props)

    this.state = {
      open: false
    }

    this.close = this.close.bind(this)
    this.open = this.open.bind(this)
    this.regress = this.regress.bind(this)
    this.generateHistory = this.generateHistory.bind(this)
  }

  close() { this.setState({open: false}) }
  open() {
    if(this.props.data.path.length > 0) {
      this.setState({open: true})
    }
  }
  regress(amt) {
    this.close()
    this.props.regress(amt)
  }

  generateHistory() {
    var events = []
    var currentStatement = this.props.data.tree
    for(var i = 0; i < this.props.data.path.length; i++) {
      const k = i
      events.push(
        <ListItem primaryText={ currentStatement.title }
                  onTouchTap={ (e) => this.regress(k) }
                  key={"history-" + i}/>
      )

      const prop = this.props.data.path[i].substr(0, 4)
      const index = this.props.data.path[i].substr(4)
      currentStatement = currentStatement[prop][index]
    }

    return events
  }

  render() {
    return(
      <div>
        <IconButton onTouchTap={ this.open }>
          <HistoryIcon />
        </IconButton>
        <Drawer
          docked={ false }
          open={ this.state.open }
          onRequestChange={ this.close } >
            <List>
              { this.generateHistory() }
            </List>
        </Drawer>
      </div>
    )
  }
}
