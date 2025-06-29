import React, { useState, useRef, useMemo, useEffect } from 'react';
import DashboardLayout from '../../common/DashboardLayout'
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { adminToken, apiUrl } from '../../common/http';
import JoditEditor from 'jodit-react';
import { toast } from 'react-toastify';


const Edit = ({ placeholder }) => {

  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [checkedSizes, setCheckedSizes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [disable, setDisable] = useState(false);
  const [productImages, setProductImages] = useState([]);
  const params = useParams();
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
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      let res = await fetch(`${apiUrl}/products/${params.id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${adminToken()}`
        }
      }).then(response => response.json())
        .then(result => {
          if (result.status == 200) {
            setContent(result.data.description)
            setCheckedSizes(result.productSizes)
            setProductImages(result.data.product_images)
            reset({
              barcode: result.data.barcode,
              brand: result.data.brand_id,
              category: result.data.category_id,
              compare_price: result.data.compare_price,
              price: result.data.price,
              is_featured: result.data.is_featured,
              qty: result.data.qty,
              short_description: result.data.short_description,
              sku: result.data.sku,
              status: result.data.status,
              title: result.data.title,
            })
          } else {
            console.log("something went wrong")
          }
        })
    }
  })

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
        } else {
          console.log("something went wrong")
        }
      })
  }
  const fetchSizes = async () => {
    let res = await fetch(`${apiUrl}/sizes`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${adminToken()}`
      },
    }).then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.status == 200) {
          setSizes(result.data)
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
        } else {
          console.log("something went wrong")
        }
      })
  }

  useEffect(() => {
    fetchBrands();
    fetchCategories();
    fetchSizes();
  }, [])

  const updateDefaultImage = async (image) => {

    let res = await fetch(`${apiUrl}/change-product-default-image?product_id=${params.id}&image=${image}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${adminToken()}`
      },
    }).then(response => response.json())
      .then(result => {
        if (result.status == 200) {
          // setCategories(result.data)
          toast.success(result.message)
        } else {
          console.log("something went wrong")
        }
      })
  }


  const handleFileUplaod = async (e) => {
    const formData = new FormData();
    const files = e.target.files[0];
    formData.append('image', files)
    formData.append('product_id', params.id)
    setDisable(true);
    let res = await fetch(`${apiUrl}/save-product-image`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${adminToken()}`
      },
      body: formData,
    }).then(response => response.json())
      .then(result => {
        if (result.status == 200) {
          productImages.push(result.data)
          setProductImages(productImages);
        } else {
          toast.error(result.errors.image[0]);
        }
        e.target.value = "";
        setDisable(false);
      })
  }

  const onUpdateProduct = async (data) => {
    const formData = { ...data, 'description': content}
    setDisable(true);
    let res = await fetch(`${apiUrl}/products/${params.id}`, {
      method: 'PUT',
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
          Object.keys(formErrors).forEach((field) => {
            setError(field, { message: formErrors[field][0] })
          })
        }
      })
  }

  const deleteImage = async(id) => {
    let res = await fetch(`${apiUrl}/delete-product-image/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${adminToken()}`
      },
    }).then(response => response.json())
      .then(result => {
        setDisable(false)
        if (result.status == 200) {
          toast.success(result.message);
          let filteredGallery = productImages.filter(img=> img !=id);
          setProductImages(filteredGallery);
        } else {
          toast.success(result.message);
        }
      })
  }


  return (
    <DashboardLayout pagetitle='Edit Product' btnLabel='Back' btnLink='/admin/products'>
      <form onSubmit={handleSubmit(onUpdateProduct)} >
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
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          {
            errors.is_featured && <p className='invalid-feedback'>{errors.is_featured?.message}</p>
          }
        </div>
        <div className="mb-3">
        <label htmlFor="" className="form-label">Sizes</label>
          {
            sizes && sizes.map(size => {
              return (
                <div class="form-check-inline ps-3" key={`size-${size.id}`}>
                  <input
                  {
                    ...register('sizes')
                  }
                  class="form-check-input" type="checkbox"
                  checked={checkedSizes.includes(size.id)}
                  onChange={(e)=>{
                    if(e.target.checked){
                      setCheckedSizes([...checkedSizes,size.id])
                    }else{
                      setCheckedSizes(checkedSizes.filter(sid => sid !== size.id ))
                    }
                  }}
                  value={size.id} id={`size-${size.id}`}/>
                    <label class="form-check-label ps-2" htmlFor={`size-${size.id}`}>
                      {size.name}
                    </label>
                </div>
              )

            }
            )
          }

        </div>

        <h3 className="py-3 mb-3 border-bottom">Gallary</h3>

        <div className="mb-3">
          <label className='form-label' htmlFor="">Image</label>
          <input onChange={handleFileUplaod} type="file" placeholder='image' className='form-control' />
        </div>

        <div className="mb-3">
          <div className="row">
            {
              productImages && productImages.map((productImage, index) => {
                return (
                  <div className="col-md-3" key={`image-${index}`} >
                    <div className="card shadow">
                      <img src={productImage.image_url} alt="" className='w-100' />
                    </div>
                    <button type="button" className='btn btn-danger mt-3 w-100' onClick={() => deleteImage(productImage.id)} >Delete</button>
                    <button type="button" className='btn btn-secondary mt-3 w-100' onClick={() => updateDefaultImage(productImage.image)} >Make Default Image</button>
                  </div>
                )
              })
            }
          </div>
        </div>
        <button disabled={disable} type='submit' className='btn btn-primary'>Update</button>
      </form>
    </DashboardLayout>
  )
}

export default Edit