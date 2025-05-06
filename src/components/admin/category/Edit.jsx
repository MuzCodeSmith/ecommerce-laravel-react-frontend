import React, { useState } from 'react'
import DashboardLayout from '../../common/DashboardLayout'
import { useForm } from "react-hook-form"
import { adminToken, apiUrl } from '../../common/http'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

const Edit = () => {

  const [disable, setDisable] = useState(false);
  const [category,setCategory] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      let res = await fetch(`${apiUrl}/categories/${params.id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${adminToken()}`
        }
      }).then(response => response.json())
        .then(result => {
          console.log(result)
          if (result.status == 200) {
            setCategory(result.data)
            reset({
              name:result.data.name,
              status:result.data.status
            })
          } else {
            console.log("something went wrong")
          }
        })
    }
  })

  const onSaveCategory = async (data) => {
    setDisable(true);
    let res = await fetch(`${apiUrl}/categories/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${adminToken()}`
      },
      body: JSON.stringify(data)
    }).then(response => response.json())
      .then(result => {
        setDisable(false)
        if (result.status == 200) {
          toast.success(result.message);
          navigate('/admin/categories')
        } else {
          console.log("something went wrong")
        }
      })
  }

  return (
    <DashboardLayout pagetitle={'Edit Category'} btnLabel={'Back'} btnLink={'/admin/categories'}>
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
        ,<button disabled={disable} type='submit' className='btn btn-primary'>Update</button>
      </form>
    </DashboardLayout>
  )
}

export default Edit