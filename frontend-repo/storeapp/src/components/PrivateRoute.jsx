import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { myContext } from '../context/myContext';


const PrivateRoute = ({ path, component, redirectTo = '/login' }) => {
    // grab the info if user is logged in from context
    const { loginUser, authIsDone } = useContext(myContext);

    // in case we are logged in => allow passing the given route
    // in case we are NOT logged in => redirect that fu**** not known person to login
    if (!authIsDone) return <h2>loading.....</h2>;
    if (authIsDone) {
        return loginUser ? (
            <Route path={path} component={component} />
        ) : (
            <Redirect to={redirectTo} />
        );
    }
};

export default PrivateRoute;