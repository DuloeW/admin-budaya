import { Link, useNavigate } from "react-router"
import Sidebar from "../../components/Sidebar"
import { useState } from "react"
import Swal from "sweetalert2"

const AddSummary = () => {

    const navigate = useNavigate()
    const [data, setData] = useState({})

    const handleChanges = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        let type = e.target[0].value
        const description = e.target[1].value
        const token = document.cookie.split('=')[1]
        const bearer = `Bearer ${token}`

        try {
            const response = await fetch('http://localhost:3000/api/auth/create/summary', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': bearer
                },
                body: JSON.stringify({
                    type,
                    description
                }),
                credentials: 'include'
            })
            
            const dataResponse = await response.json()

            if(!response.ok){
                throw new Error(dataResponse?.message)
            }
            
            Swal.fire({
                title: 'Success',
                text: dataResponse?.message,
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then((res) => {
                if(res.isConfirmed){
                    navigate('/summary-chat')
                }
            })

        } catch (error) {
            console.log(error)
            Swal.fire({
                title: 'Failed',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    }


    return (
        <>
            <Sidebar />
            <div className="p-4 h-screen sm:ml-64">
                <div className="flex flex-row-reverse items-center border-b-2 border-gray-100 justify-between mb-5">
                    <button className="text-white mb-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <Link to='/summary-chat'>Back</Link>
                    </button>
                    <h3 className="font-semibold text-gray-500">Add Summary Chat</h3>
                </div>

                <form onSubmit={(e) => handleSubmit(e)}
                    className="w-full flex flex-col space-y-6">
                    <div>
                        <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Select your type
                        </label>
                        <select
                            onChange={handleChanges}
                            name="type"
                            id="type"
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="" disabled>Choose Type</option>
                            <option value="0">Sender</option>
                            <option value="1">Receiver</option>
                        </select>
                    </div>


                    <div>
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Summary Chat</label>
                        <textarea
                            onChange={(e) => handleChanges(e)}
                            name="description"
                            id="message"
                            rows="4"
                            required
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type the chat...."></textarea>

                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        <button type="reset" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Reset</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddSummary