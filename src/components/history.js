import React, { Component } from 'react'

// Material UI
import RaisedButton from 'material-ui/RaisedButton';
import UndoIcon from 'material-ui/svg-icons/content/undo.js'

export default class History extends Component {

  constructor(props) {
    super(props)

    this.regress = this.regress.bind(this)
    this.generateHistory = this.generateHistory.bind(this)
  }

  regress(amt) {
    this.props.regress(amt)
  }

  generateHistory() {
    var events = []
    var currentStatement = this.props.data.tree
    for(var i = 0; i < this.props.data.path.length; i++) {
      const k = i
      events.push(
          <RaisedButton
            label={currentStatement.title}
            labelPosition="before"
            primary={true}
            icon={<UndoIcon />}
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
