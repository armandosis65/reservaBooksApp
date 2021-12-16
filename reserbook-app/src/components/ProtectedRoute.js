
import { Redirect, Route } from "react-router";
import { useUser } from "../Providers/UserProvider"

export const ProtectedRoute = ({children, ...rest}) => {
    const { user } = useUser();
    
    return <Route
        {...rest}
        render={({ location }) => {
            return user.name ? children : <Redirect to={{ pathname: '/', state: location }} />;
        }
        } />;
}