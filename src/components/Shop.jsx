import React, { useEffect, useState } from 'react'
import Layout from './common/Layout'
import ProductImg1 from '../assets/images/Mens/two.jpg';
import { Link, useSearchParams } from 'react-router-dom';
import { apiUrl } from './common/http';

const Shop = () => {

  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [products, setProducts] = useState([])
  const [searchParams,setSearchParams] = useSearchParams();
  const [catChecked, setCatChecked] = useState(()=>{
    const category = searchParams.get('category');
    return category ? category.split(','):[];
  });
  const [brandChecked, setBrandCatChecked] = useState(()=>{
    const brand = searchParams.get('brand');
    return brand ? brand.split(','):[];
  });


  const handleCategory = (e) =>{
    let {checked,value} = e.target;
    if(checked){
      setCatChecked(pre=>[...pre,value]);
    }else{
      setCatChecked(catChecked.filter(id=>id!=value))
    }
  }
  const handleBrand = (e) =>{
    let {checked,value} = e.target;
    if(checked){
      setBrandCatChecked(pre=>[...pre,value]);
    }else{
      setBrandCatChecked(brandChecked.filter(id=>id!=value))
    }
  }

  const fetchCategories = async () => {
    fetch(`${apiUrl}/get-categories`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
      }
    }).then(res => res.json())
      .then(result => {
        if (result.status = 200) {
          setCategories(result.data)
        }
      })
  }
  const fetchBrands = async () => {
    fetch(`${apiUrl}/get-brands`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
      }
    }).then(res => res.json())
      .then(result => {
        if (result.status = 200) {
          setBrands(result.data)
        }
      })
  }

  const fetchProducts = async () => {
    let search = [];
    let params = '';

    if(catChecked.length>0){
      search.push(['category',catChecked])
    }

    if(brandChecked.length>0){
      search.push(['brand',brandChecked])
    }

    if(search.length>0){
      params = new URLSearchParams(search)
      setSearchParams(params)
    }else{
      setSearchParams()
    }


    // let params = new URLSearchParams();

    // if (catChecked.length > 0) {
    //   catChecked.forEach(id => params.append('category', id));
    // }

    // if (brandChecked.length > 0) {
    //   brandChecked.forEach(id => params.append('brand', id));
    // }


    fetch(`${apiUrl}/get-products?${params}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
      }
    }).then(res => res.json())
      .then(result => {
        if (result.status = 200) {
          setProducts(result.data)
        }
      })
  }

  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchProducts();
  }, [catChecked,brandChecked])

  return (
    <Layout>
      <div className="container">
        <nav aria-label="breadcrumb" className='py-4'>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page"><Link to="/shop">Shop</Link></li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-md-3">
            <div className="card shadow border-0 mb-3">
              <div className="card-body p-4">
                <h1 className='mb-3'>categories</h1>
                <ul>
                  {
                    categories && categories.map(category => {
                      return (
                        <li className='mb-2' key={`cat-${category.id}`}>
                          <input checked={searchParams.get('category') ? searchParams.get('category').includes(category.id):false} onChange={handleCategory} type="checkbox" id={`cat-${category.id}`} value={category.id} />
                          <label htmlFor={`cat-${category.id}`} className='ps-2'>{category.name}</label>
                        </li>
                      )
                    })
                  }

                </ul>
              </div>

            </div>
            <div className="card shadow border-0 mb-3">
              <div className="card-body p-4 mb-3">
                <h1 className='mb-3'>Brands</h1>
                <ul>
                  {
                    brands && brands.map(brand => {
                      return (
                        <li className='mb-2' key={`brand-${brand.id}`}>
                          <input checked={searchParams.get('brand') ? searchParams.get('brand').includes(brand.id):false} onChange={handleBrand} type="checkbox" id={`brand-${brand.id}`} value={brand.id} />
                          <label htmlFor={`brand-${brand.id}`} className='ps-2'>{brand.name}</label>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-9">

            <div className="row pb-5">
              {/* Product 1 */}

              {
                products.length>0 && products.map(product => {
                  return (
                    <div key={`prod-${product.id}`} className="col-md-4 col-6">
                      <div className="product card border-0">
                        <div className="card-img">
                          {
                            product.image_url !== "" ? <img src={product.image_url} alt="" />
                              : <img src={'https://placehold.co/360x540/png'} alt="" />
                          }

                        </div>
                        <div className="card-body pt-3">
                          <a href="">{product.title}</a>
                          <div className='price'>
                            ${product.price} <span className='text-decoration-line-through'>${product.compare_price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              }

            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Shop