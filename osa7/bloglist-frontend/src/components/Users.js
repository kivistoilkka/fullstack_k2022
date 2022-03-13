import { useSelector } from 'react-redux'

const Users = () => {
  const userlist = useSelector(({ userlist }) => userlist)

  return (
    <div>
      <h2>Users</h2>

      <table>
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th scope="col">blogs created</th>
          </tr>
        </thead>
        <tbody>
          {userlist.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
