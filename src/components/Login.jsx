import React, { useContext } from 'react'
import Layout from './common/Layout'

import { useForm } from "react-hook-form"
import { apiUrl } from './common/http'
import { toast } from 'react-toastify'

import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from './context/Auth' 

const Login = () => {

    const {login} = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()
      
      const navigate = useNavigate();

      const onSubmit =async (data) =>{
        const res = await fetch(`${apiUrl}/login`,{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(data)
        }).then(res=>res.json())
        .then(result=>{
            if(result.status == 201){
                const userInfo ={
                    name: result.name,
                    id: result.id,
                    token: result.token,
                } 
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
                login(userInfo);
                navigate('/account');
            }else{
                toast.error(result.errors)
            }
        });
      }

  return (
    <Layout>
    <div className="container d-flex justify-content-center py-5">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card shadow border-0 login">
                <div className="card-body p-4">
                    <h3>Login</h3>
                    <hr />
                    <div className="mb-3">
                        <label htmlFor="" className='form-label'>Email</label>
                        <input
                            {
                            ...register('email', {
                                required: "The email field is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })
                            }
                            type="text" className={`form-control ${errors.email && 'is-invalid'}`} placeholder='Email' />
                        {
                            errors.email && <p className='invalid-feedback'>{errors.email?.message}</p>
                        }
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className='form-label'>Password</label>
                        <input
                            {
                            ...register("password", {
                                required: "the password field is required."
                            })
                            }
                            type="password" className={`form-control ${errors.password && 'is-invalid'}`} placeholder='password' />
                        {
                            errors.password && <p className='invalid-feedback'>{errors.password?.message}</p>
                        }
                    </div>

                    <button className='btn btn-secondary w-100'>Login</button>
                </div>
                <div className="d-flex justify-content-center pb-4">
                    Don't Have an Account ? &nbsp; <Link to="/account/register">Register</Link>
                </div>
            </div>

        </form>
    </div>
</Layout>
  )
}

export default Login