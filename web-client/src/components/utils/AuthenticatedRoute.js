import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../Auth';

const AuthenticatedRoute = ({ component: RouteComponent, ...rest }) => {
    const { currentUser } = useContext(AuthContext);
    var isCurrentUserAuthenticated = (currentUser === null || !currentUser) ? false : true;

    return (
        <Route
            {...rest}

            render = { routeProps =>
                isCurrentUserAuthenticated ? ( <RouteComponent {...routeProps} /> ) : ( <Redirect to="/login" /> )
            }
        />
    );
};

export default AuthenticatedRoute;