import { Navigate } from "react-router";

const ProtectedRoute = ({children}) => {
    const token = document.cookie.split('=')[1];
    // if (!token) {
    //     return <Navigate to='/login' />;
    // }
    
    return children
}

export default ProtectedRoute