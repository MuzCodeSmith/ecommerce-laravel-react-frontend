import React, { useState } from 'react'
import DashboardLayout from '../../common/DashboardLayout'
import { useForm } from "react-hook-form"
import { adminToken, apiUrl } from '../../common/http'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const Shipping = () => {

  const [disable,setDisable]=useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues:async ()=>{
      let res = await fetch(`${apiUrl}/get-shipping`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${adminToken()}`
          }
        }).then(response => response.json())
          .then(result => {
            console.log(result);
            if (result.status == 200) {
              reset({
                shipping_charge:result.data.shipping_charge,
              })
            } else {
              console.log("something went wrong")
            }
          })
  }
  })

  const onSaveShipping = async (data) => {
    setDisable(true);
    let res = await fetch(`${apiUrl}/save-shipping`,{
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
      }else{
        console.log("something went wrong")
      }
    })
  }

    return (
        <DashboardLayout pagetitle='Products' btnLabel='Create' btnLink='/admin/products/create' >
            <form onSubmit={handleSubmit(onSaveShipping)} >
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Shipping Charge</label>
                    <input
                        {
                        ...register("shipping_charge", {
                            required: "the shipping charge field is required."
                        })
                        }
                        type="text" className={`form-control ${errors.shipping_charge && 'is-invalid'}`} placeholder='Shipping Charge' />
                    {
                        errors.shipping_charge && <p className='invalid-feedback'>{errors.shipping_charge?.message}</p>
                    }
                </div>
                <button disabled={disable} type='submit' className='btn btn-primary'>Submit</button>
            </form>
        </DashboardLayout>

    )
}
