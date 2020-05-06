import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, HashRouter, Route, Switch} from 'react-router-dom'
import {updateUser, removeUser} from '../../../store'

/**
 * COMPONENT
 */

class UserList extends Component {
  render() {
    console.log('in userlist', this.props)
    const users = this.props.users ? this.props.users : []
    return (
      <div>
        <h3>User List</h3>
        <div>
          {users.map((user) => (
            <div key={user.id}>
              <h6>{user.email}</h6>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = ({users}) => ({users})

export default connect(mapState)(UserList)

/**
 * PROP TYPES
 */
UserList.propTypes = {
  users: PropTypes.array,
}