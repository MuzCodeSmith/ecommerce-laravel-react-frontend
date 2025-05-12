import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Shop from './components/Shop'
import Product from './components/Product'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Login from './components/admin/login'
import { ToastContainer, toast } from 'react-toastify';
import Dashboard from './components/admin/Dashboard';
import {AdminRequireAuth } from './components/admin/AdminRequireAuth';
import RequireAuth from './components/RequireAuth'
import {default as ShowCategory } from './components/admin/category/Show';
import {default as CreateCategory} from './components/admin/category/Create';
import {default as EditCategory} from './components/admin/category/Edit'
import {default as ShowBrands} from './components/admin/brands/Show';
import {default as CreateBrand} from './components/admin/brands/Create';
import {default as EditBrand} from './components/admin/brands/Edit';
import {default as ShowProduts} from './components/admin/products/Show';
import {default as EditProdut} from './components/admin/products/Edit';
import {default as CreateProdut} from './components/admin/products/Create';
import Register from './components/Register'
import {default as UserLogin} from './components/Login'
import Profile from './components/Profile'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/product/:id' element={<Product/>} />
          <Route path='/account/register' element={<Register/>} />
          <Route path='/account/login' element={<UserLogin/>} />
          <Route path='/admin/login' element={<Login/>} />

          <Route path='/account' element={
            <RequireAuth>
              <Profile/>
            </RequireAuth>
          } />
          <Route path='/checkout' element={
            <RequireAuth>
              <Checkout/>
            </RequireAuth>
          } />
          <Route path='/cart' element={
            <RequireAuth>
              <Cart/>
            </RequireAuth>
          } />

          <Route path='/admin/dashboard' element={
            <AdminRequireAuth>
              <Dashboard/>
            </AdminRequireAuth>
          } />
          <Route path='/admin/categories' element={
            <AdminRequireAuth>
              <ShowCategory/>
            </AdminRequireAuth>
          } ></Route>
          <Route path='/admin/categories/create' element={
            <AdminRequireAuth>
              <CreateCategory/>
            </AdminRequireAuth>
          } ></Route>
          <Route path='/admin/categories/edit/:id' element={
            <AdminRequireAuth>
              <EditCategory/>
            </AdminRequireAuth>
          } ></Route>
          <Route path='/admin/brands' element={
            <AdminRequireAuth>
              <ShowBrands/>
            </AdminRequireAuth>
          } ></Route>
          <Route path='/admin/brands/create' element={
            <AdminRequireAuth>
              <CreateBrand/>
            </AdminRequireAuth>
          } ></Route>
          <Route path='/admin/brands/edit/:id' element={
            <AdminRequireAuth>
              <EditBrand/>
            </AdminRequireAuth>
          } ></Route>

          <Route path='/admin/products' element={
            <AdminRequireAuth>
              <ShowProduts/>
            </AdminRequireAuth>
          } ></Route>
          <Route path='/admin/products/create' element={
            <AdminRequireAuth>
              <CreateProdut/>
            </AdminRequireAuth>
          } ></Route>
          <Route path='/admin/products/edit/:id' element={
            <AdminRequireAuth>
              <EditProdut/>
            </AdminRequireAuth>
          } ></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
