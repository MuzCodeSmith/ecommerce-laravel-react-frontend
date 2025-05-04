import React, { useState } from 'react'
import DashboardLayout from '../../common/DashboardLayout'
import { useForm } from "react-hook-form"
import { adminToken, apiUrl } from '../../common/http'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Create = () => {
    const [disable, setDisable] = useState(false); 
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSaveBrand = async (data) => {
        setDisable(true);
        let res = await fetch(`${apiUrl}/brands`,{
            method:'POST',
            headers:{
                'Content-type':'application/json',
                'Accept':'application/json',
                'Authorization':`Bearer ${adminToken()}`
            },
            body:JSON.stringify(data)
        }).then(res => res.json())
        .then(result =>{
            setDisable(false);
            if(result.status == 200){
                toast.success(result.message)
                navigate('/admin/brands')
            }else{
                console.log('something went wrong')
            }
        } )   
    }

    return (
        <DashboardLayout pagetitle='Create Brands' btnLabel='Back' btnLink='/admin/brands' >
            <form onSubmit={handleSubmit(onSaveBrand)} action="">
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
                <button disabled={disable} type='submit' className='btn btn-primary'>Submit</button>
            </form>
        </DashboardLayout>
    )
}

export default Create