import React, { Component } from 'react'

// Material UI
import RaisedButton from 'material-ui/RaisedButton';
import HistoryIcon from 'material-ui/svg-icons/action/history.js'

export default class History extends Component {

  regress = (amt) => {
    this.props.regress(amt)
  }

  generateHistory = () => {
    var events = []
    var currentStatement = this.props.data.tree
    for(var i = 0; i < this.props.data.path.length; i++) {
      const k = i
      events.push(
          <RaisedButton
            label={currentStatement.title}
            labelPosition="after"
            primary={true}
            icon={<HistoryIcon />}
            onTouchTap={ (e) => this.regress(k) }
            key={"history-" + i}
      />
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
          { this.generateHistory() }
      </div>
    )
  }
}
