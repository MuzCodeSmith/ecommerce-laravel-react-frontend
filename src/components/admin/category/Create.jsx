import React, { useState } from 'react'
import DashboardLayout from '../../common/DashboardLayout'
import { useForm } from "react-hook-form"
import { adminToken, apiUrl } from '../../common/http'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Create = () => {

  const [disable,setDisable]=useState(false);
  const naviagate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSaveCategory = async (data) => {
    setDisable(true);
    let res = await fetch(`${apiUrl}/categories`,{
      method:'POST',
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json',
        'Authorization':`Bearer ${adminToken()}`
      },
      body:JSON.stringify(data)
    }).then(response => response.json())
    .then(result => {
      setDisable(false)
      if(result.status == 200){
        toast.success(result.message);
        naviagate('/admin/categories')
      }else{
        console.log("something went wrong")
      }
    })
  }

  return (
    <DashboardLayout pagetitle={'Create Category'} btnLabel={'Back'} btnLink={'/admin/categories'}  >
      <form onSubmit={handleSubmit(onSaveCategory)} >
        <div className="mb-3">
          <label htmlFor="" className="form-label">Name</label>
          <input
            {
            ...register("name", {
              required: "the name field is required."
            })
            }
            type="text" className={`form-control ${errors.name && 'is-invalid'}`} placeholder='name' />
          {
            errors.name && <p className='invalid-feedback'>{errors.name?.message}</p>
          }
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">Status</label>
          <select
          {...register("status", {
            validate: value => value !== "" || "the status field is required."
          })}
          className={`form-control ${errors.status && 'is-invalid'}`}
        >
          <option value="">---- select status ----</option>
          <option value="1">Active</option>
          <option value="0">Inactive</option>
        </select>

          {
            errors.status && <p className='invalid-feedback'>{errors.status?.message}</p>
          }
        </div>
        <button disabled={disable} type='submit' className='btn btn-primary'>Submit</button>
      </form>
    </DashboardLayout>
  )
}

export default Create