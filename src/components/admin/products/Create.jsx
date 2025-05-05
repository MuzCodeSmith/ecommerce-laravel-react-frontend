import React, { useState, useRef, useMemo, useEffect } from 'react';
import DashboardLayout from '../../common/DashboardLayout'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { adminToken, apiUrl } from '../../common/http';
import JoditEditor from 'jodit-react';

const Create = ({ placeholder }) => {

  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [disable, setDisable] = useState(false);
  const naviagate = useNavigate();

  const config = useMemo(() => ({
    readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    placeholder: placeholder || ''
  }),
    [placeholder]
  );


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const fetchBrands = async () => {
    let res = await fetch(`${apiUrl}/brands`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${adminToken()}`
      },
    }).then(response => response.json())
      .then(result => {
        if (result.status == 200) {
          setBrands(result.data)
          console.log(brands)
        } else {
          console.log("something went wrong")
        }
      })
  }
  const fetchCategories = async () => {
    let res = await fetch(`${apiUrl}/categories`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${adminToken()}`
      },
    }).then(response => response.json())
      .then(result => {
        if (result.status == 200) {
          setCategories(result.data)
          console.log(categories)
        } else {
          console.log("something went wrong")
        }
      })
  }

  useEffect(() => {
    fetchBrands();
    fetchCategories();
  }, [])

  const onSaveProduct = async (data) => {
    setDisable(true);
    let res = await fetch(`${apiUrl}/products`, {
      method: 'POST',
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
          naviagate('/admin/categories')
        } else {
          console.log("something went wrong")
        }
      })
  }

  return (
    <DashboardLayout pagetitle='Create Product' btnLabel='Back' btnLink='/admin/products'>
      <form onSubmit={handleSubmit(onSaveProduct)} >
        <div className="mb-3">
          <label htmlFor="" className="form-label">Title</label>
          <input
            {
            ...register("title", {
              required: "the title field is required."
            })
            }
            type="text" className={`form-control ${errors.title && 'is-invalid'}`} placeholder='title' />
          {
            errors.title && <p className='invalid-feedback'>{errors.title?.message}</p>
          }
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className='form-label' htmlFor="">Category</label>
              <select className='form-control'>
                <option value="">Select Category</option>
                {
                  categories && categories.map(category => {
                    return (
                      <option key={`category-${category.id}`} value={category.id}>{category.name}</option>
                    )
                  })
                }
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className='form-label' htmlFor="">Brand</label>
              <select className='form-control'>
                <option value="">Select Brand</option>
                {
                  brands && brands.map(brand => {
                    return (
                      <option key={`brand-${brand.id}`} value={brand.id}>{brand.name}</option>
                    )
                  })
                }
              </select>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="" className="form-label">Short Description</label>
          <textarea className='form-control' placeholder="short description" rows={3}></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="" className="form-label">Description</label>
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={newContent => { }}
          />
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