import { useEffect } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const ProtectedRoute = ({children}) => {
    const navigate = useNavigate();
    const token = document.cookie.split('=')[1];

    useEffect(() => {
        if (!token) {
            Swal.fire({
                title: 'Your sesion is expired!',
                icon: 'error'
            })
           navigate('/login', { replace: true })
        }

    }, [token])
    
    return children
}

export default ProtectedRoute