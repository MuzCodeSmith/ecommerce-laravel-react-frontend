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
  const navigate = useNavigate();

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
    setError,
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

    const formData = {...data,'description':content}

    setDisable(true);
    let res = await fetch(`${apiUrl}/products`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${adminToken()}`
      },
      body: JSON.stringify(formData)
    }).then(response => response.json())
      .then(result => {
        setDisable(false)
        if (result.status == 200) {
          toast.success(result.message);
          navigate('/admin/products')
        } else {
          const formErrors = result.errors;
          Object.keys(formErrors).forEach((field)=>{
            setError(field,{message:formErrors[field][0]})
          })
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
              <select
                {
                ...register("category", {
                  required: "the category field is required."
                })
                }
                className={`form-control ${errors.category && 'is-invalid'}`}>
                <option value="">Select Category</option>
                {
                  categories && categories.map(category => {
                    return (
                      <option key={`category-${category.id}`} value={category.id}>{category.name}</option>
                    )
                  })
                }
              </select>
              {
                errors.category && <p className='invalid-feedback'>{errors.category?.message}</p>
              }
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className='form-label' htmlFor="">Brand</label>
              <select
                {
                ...register("brand", {
                })
                }
                className="form-control">
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
          <label htmlFor="" className="form-label">Short Description</label>
          <textarea 
           {
            ...register("short_description", {
            })
            }
          className='form-control' placeholder="short description" rows={3}></textarea>
        </div>

        <h3 className="py-3 mb-3 border-bottom">Pricing</h3>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className='form-label' htmlFor="">Price</label>
              <input
                {
                ...register("price", {
                  required: "the price field is required."
                })
                }
                type="text" placeholder='price' className={`form-control ${errors.price && 'is-invalid'}`} />
            </div>
            {
              errors.price && <p className='invalid-feedback'>{errors.price?.message}</p>
            }
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className='form-label' htmlFor="">Discounted Price</label>
              <input
               {
                ...register("compare_price", {
                })
                }
              type="text" placeholder='discounted price' className='form-control' />
            </div>
          </div>
        </div>

        <h3 className="py-3 mb-3 border-bottom">Inventory</h3>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className='form-label' htmlFor="">SKU</label>
              <input
                {
                ...register("sku", {
                  required: "the sku field is required."
                })
                }
                type="text" placeholder='sku' className={`form-control ${errors.sku && 'is-invalid'}`} />
            </div>
            {
              errors.sku && <p className='invalid-feedback'>{errors.sku?.message}</p>
            }
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className='form-label' htmlFor="">Barcode</label>
              <input
               {
                ...register("barcode", {
                })
                }
              type="text" placeholder='barcode' className='form-control' />
            </div>
          </div>
        </div>



        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className='form-label' htmlFor="">Qty</label>
              <input
               {
                ...register("qty", {
                })
                }
              type="text" placeholder='qty' className='form-control' />
            </div>
          </div>
          <div className="col-md-6">
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
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="" className="form-label">Featured</label>
          <select
            {...register("is_featured", {
              validate: value => value !== "" || "the Featured field is required."
            })}
            className={`form-control ${errors.is_featured && 'is-invalid'}`}
          >
            <option value="">---- select status ----</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>

          {
            errors.is_featured && <p className='invalid-feedback'>{errors.is_featured?.message}</p>
          }
        </div>

        <h3 className="py-3 mb-3 border-bottom">Gallary</h3>

        <div className="mb-3">
          <label className='form-label' htmlFor="">Image</label>
          <input type="file" placeholder='image' className='form-control' />
        </div>



        <button disabled={disable} type='submit' className='btn btn-primary'>Submit</button>
      </form>
    </DashboardLayout>
  )
}

export default Create