import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { AuthPanel } from './auth.jsx'

export const NotFound = () => (
  <h1>Not Found</h1>
)

export const App = ({ children }) => (
  <div>
    <AuthPanel />
    <h1>Main Heading</h1>
    <ul>
      <li>
        <Link to={'/'} activeClassName="active">Home</Link>
      </li>
      <li>
        <Link to={'/users'} activeClassName="active">Users</Link>
      </li>
    </ul>
    <div className="detail">
      {children}
    </div>
  </div>
)

export const Home = () => (
    <h2>Home</h2>
)

export const UserList = ({users, children}) => (
  <div>
    <h2>Users</h2>
    <ul>
      { users.map(user => (
        <li key={user.id}>
          <Link to={`/users/${user.id}`} activeClassName="active">{user.username}</Link>
        </li>
      )) }
    </ul>

    {children}
  </div>
)

export const Users = connect((state, ownProps) => ({
  ...ownProps,
  users: state.users.items
}))(UserList)


export const User = React.createClass({
  render() {
    return (
      <div>
        <h2>{ this.props.params.userId }</h2>
      </div>
    )
  }
})
