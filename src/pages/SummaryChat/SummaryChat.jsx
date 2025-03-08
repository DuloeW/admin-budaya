import { Link, useNavigate } from 'react-router'
import Sidebar from '../../components/Sidebar'
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react'

function SummaryChat() {
  const navigate = useNavigate()
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3000/api/auth/get-all/summary')
      const data = await response.json()
      setData(data?.data)
    }

    fetchData()
  }, [])

  const editData = (id) => {
    Swal.fire({
      title: 'Edit Data?',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/summary-chat/update/${id}`)
      }
    })
  }

  const isRemove = async (id) => {
    Swal.fire({
      title: 'Remove Data',
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await removeData(id)
      }
    })
  }

  const removeData = async (id) => {

    const token = document.cookie.split('=')[1]
    const bearer = `Bearer ${token}`

    try {
      const response = await fetch(`http://localhost:3000/api/auth/delete/summary`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': bearer
        },
        body: JSON.stringify({
          id
        }),
        credentials: 'include'
      })

      const dataResponse = await response.json()

      if (!response.ok) {
        throw new Error(dataResponse?.message)
      }

      Swal.fire({
        title: 'Success',
        text: dataResponse?.message,
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then((res) => {
        if (res.isConfirmed) {
          setData(data.filter((item) => item?.id !== id))
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

  // const findDataByKeyword = (keyword) => {
  //   console.log(keyword)
  // }

  return (
    <>
      <Sidebar />

      <div className="p-4 sm:ml-64 shadow-md sm:rounded-lg">

        {/* <div className='mb-5'>
          <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input
              onChange={(e) => findDataByKeyword(e.target.value)}
              type="search"
              id="search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </div>
        </div> */}

        <button className='text-white mb-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
          <Link to='/summary-chat/add'>
            Add New Summary
          </Link>
        </button>

        <div className='overflow-x-auto'>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nomor
                </th>
                <th scope="col" className="px-6 py-3">
                  Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={item?.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">
                    {item?.type}
                  </td>
                  <td className="px-6 py-4">
                    {item?.description}
                  </td>
                  <td className="px-6 py-4 text-right flex items-center justify-center gap-2">
                    <button
                      onClick={() => editData(item?.id)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                    <button
                      onClick={() => isRemove(item?.id)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
                  </td>
                </tr>

              ))}
            </tbody>
          </table>
        </div>
      </div>

    </>
    // <div className='flex w-full h-dvh'>

    // </div>
  )
}

export default SummaryChat
