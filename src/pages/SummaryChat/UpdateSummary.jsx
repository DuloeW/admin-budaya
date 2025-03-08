import { Link, useNavigate, useParams } from "react-router"
import Sidebar from "../../components/Sidebar"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

const UpdateSummary = () => {

    const navigate = useNavigate()
    const [data, setData] = useState({})
    const [dataBackup, setDataBackup] = useState({})
    let { id } = useParams()

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:3000/api/auth/get/summary/${id}`)
            const data = await response.json()
            setData(data?.data)
            setDataBackup(data?.data)
        }

        fetchData()
    }, [])

    const handleChanges = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const updateData = async (e) => {
        e.preventDefault()
        let type = e.target[0].value
        const description = e.target[1].value
        const token = document.cookie.split('=')[1]
        const bearer = `Bearer ${token}`
        console.log(token)

        try {
            if (type === 'Sender') {
                type = 0
            } else if (type === 'Receiver') {
                type = 1
            }

            const response = await fetch('http://localhost:3000/api/auth/update/summary', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bearer,
                },
                body: JSON.stringify({
                    id,
                    type,
                    description
                }),
                credentials: 'include'
            })


            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message)
            }

            Swal.fire({
                title: data.message,
                icon: 'success'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/summary-chat')
                }
            })
        } catch (error) {
            console.log(error.message)
            Swal.fire({
                title: 'Failed',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    }

    const undoChanges = () => {
        setData({ ...dataBackup })
    }

    return (
        <>
            <Sidebar />
            <div className="p-4 sm:ml-64">
                <div className="flex flex-row-reverse items-center justify-between mb-5">
                    <button className="text-white mb-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <Link to='/summary-chat'>Back</Link>
                    </button>
                    <h3 className="font-semibold text-gray-500">Update Summary Chat</h3>
                </div>

                <form
                    onSubmit={(e) => updateData(e)}
                    className="w-full flex flex-col space-y-6">
                    <div>
                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Type</label>
                        <select
                            onChange={(e) => handleChanges(e)}
                            value={data?.type}
                            id="countries"
                            name="type"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value={"Sender"}>Sender</option>
                            <option value={"Receiver"}>Receiver</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Summary Chat</label>
                        <textarea
                            id="message"
                            rows="4"
                            name="description"
                            onChange={(e) => handleChanges(e)}
                            value={data?.description}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type the chat...">

                        </textarea>

                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        <button onClick={() => undoChanges()} type="reset" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Undo</button>

                    </div>
                </form>
            </div>
        </>
    )
}

export default UpdateSummary