import { Link, useNavigate } from 'react-router'
import Sidebar from '../../components/Sidebar'
import Swal from 'sweetalert2'

function SummaryChat() {
  const navigate = useNavigate()

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

  const removeData = (id) => {
    Swal.fire({
      title: 'Remove Data',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Data Removed', '', 'success')
      }
    })
  }

  const findDataByKeyword = (keyword) => {
    console.log(keyword)
  }

  return (
    <>
      <Sidebar />

      <div className="p-4 sm:ml-64 shadow-md sm:rounded-lg">

        <div className='mb-5'>
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
            {/* <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
          </div>
        </div>

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
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  1
                </th>
                <td className="px-6 py-4">
                  Sender
                </td>
                <td className="px-6 py-4">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet, numquam animi. Repudiandae, aliquam ratione? Ullam sunt consequuntur distinctio sequi quos reiciendis, aspernatur asperiores. Explicabo, velit perspiciatis maiores perferendis est laboriosam.
                </td>
                <td className="px-6 py-4 text-right flex items-center justify-center gap-2">
                  <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                  <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  2
                </th>
                <td className="px-6 py-4">
                  Reciever
                </td>
                <td className="px-6 py-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ratione vel voluptates ducimus tempora error reiciendis delectus odit culpa blanditiis velit doloribus nam eum, atque corporis maiores sed quod obcaecati molestias quasi perspiciatis et id quaerat. Fugiat cupiditate qui accusamus quia aliquid, voluptatibus hic voluptates dicta eligendi debitis laudantium magni velit repellat inventore quibusdam ipsam officiis facilis quisquam esse aut. Praesentium repellendus tempore laudantium nulla repudiandae quam cum recusandae! Minima vero quae blanditiis nulla nemo saepe explicabo adipisci hic assumenda, veritatis distinctio velit, dolor tenetur voluptas doloribus earum quidem officia.
                </td>
                <td className="px-6 py-4 text-right flex items-center justify-center gap-2">
                  <a
                    onClick={() => editData(1213)}
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                  <a 
                    onClick={() => removeData(123)}
                    href="#" 
                    className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
                </td>
              </tr>
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
