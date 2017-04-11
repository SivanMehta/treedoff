import React, { PropTypes } from 'react';
import LoginForm from './login-form';
import Auth from '../../modules/Auth';
import {
  Redirect
} from 'react-router-dom';



class LoginPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    // set the initial component state
    this.state = {
      errors: {},
      successMessage,
      user: {
        email: '',
        password: ''
      },
      redirect:false
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.onResponse = this.onResponse.bind(this);
  }

  onResponse(res) {
    if(!res.success) {
      const errors = res.errors ? res.errors : {};
      errors.summary = res.message

      this.setState({
        errors
      })

    } else {
      // save the token
      Auth.authenticateUser(res.token);

      // change the current URL to /
      this.setState({
        redirect: true
      })
    }
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault()

    // create a string for an HTTP body message
    const email = this.state.user.email
    const password = this.state.user.password

    fetch('/auth/login', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
        email,
        password
      })
    })
    .then(res => res.json())
    .then(this.onResponse)
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      // or if already logged in
      <div>

        { this.state.redirect || Auth.isUserAuthenticated() ? <Redirect to='/trav' /> : (

          <LoginForm
            onSubmit={this.processForm}
            onChange={this.changeUser}
            errors={this.state.errors}
            // add this later
            // successMessage={this.state.successMessage}
            user={this.state.user}
          />
        )}
      </div>
    );
  }

}

export default LoginPage;
