import React, { useState } from 'react'
import DashboardLayout from '../../common/DashboardLayout'
import { useForm } from "react-hook-form"
import { adminToken, apiUrl } from '../../common/http'
import { toast } from 'react-toastify'
import { useNavigate,useParams } from 'react-router-dom'

const Edit = () => {

    const [brand, setBrand] = useState([]);
    const [disable, setDisable] = useState(false);
    const navigate = useNavigate();
    const params = useParams();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues:async ()=>{
            let res = await fetch(`${apiUrl}/brands/${params.id}`, {
                method: 'GET',
                headers: {
                  'Content-type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${adminToken()}`
                }
              }).then(response => response.json())
                .then(result => {
                  if (result.status == 200) {
                    setBrand(result.data)
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

    const onUpdateBrand = async (data) => {
        setDisable(true);
        let res = await fetch(`${apiUrl}/brands/${params.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(result => {
                setDisable(false);
                if (result.status == 200) {
                    toast.success(result.message)
                    navigate('/admin/brands')
                } else {
                    console.log('something went wrong')
                }
            })
    }

    return (
        <DashboardLayout pagetitle='Edit Brands' btnLabel='Back' btnLink='/admin/brands'>
            <form onSubmit={handleSubmit(onUpdateBrand)} action="">
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
                        className={`form-control ${errors.status && 'is-invalid'}`}>
                        <option value="">---- select status ----</option>
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                    </select>
                    {
                        errors.status && <p className='invalid-feedback'>{errors.status?.message}</p>
                    }
                </div>
                <button disabled={disable} type='submit' className='btn btn-primary'>Update</button>
            </form>
        </DashboardLayout>
    )
}

export default Edit