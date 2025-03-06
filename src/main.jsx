import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import SummaryChat from './pages/SummaryChat/SummaryChat.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import ProtectedRoute from './middleware/ProtectedRoute.jsx'
import UpdateSummary from './pages/SummaryChat/UpdateSummary.jsx'
import AddSummary from './pages/SummaryChat/AddSummary.jsx'
import Category from './pages/Category/Category.jsx'
import AddCategory from './pages/Category/AddCategory.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>

      <Route
        index
        path='/summary-chat'
        element={
          <ProtectedRoute>
            <SummaryChat />
          </ProtectedRoute>
        }
      />

      <Route
        path='/summary-chat/update/:id'
        element={
          <ProtectedRoute>
            < UpdateSummary />
          </ProtectedRoute>
        }
      />

      <Route
        path='/summary-chat/add'
        element={
          <ProtectedRoute>
            <AddSummary />
          </ProtectedRoute>
        }
      />

      <Route
        path='/category'
        element={
          <ProtectedRoute>
            <Category />
          </ProtectedRoute>
        }
      />

      <Route
        path='/category/add'
        element={
          <ProtectedRoute>
            <AddCategory />
          </ProtectedRoute>
        }
      />

      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  </BrowserRouter>
)
