import User from './components/User';

const Users = props => {
    return (
        <div className="users-listing">
            <li><User name={props.name} /></li>
        </div>
     );
}

export default Users;
