import React from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react'
import axios from "axios"
import { backendUrl } from '../App'
import {toast} from "react-toastify"

const Add = ({token}) => {

  const [image1,setImage1] = useState(false);
  const [image2,setImage2] = useState(false);
  const [image3,setImage3] = useState(false);
  const [image4,setImage4] = useState(false);

  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  const [price,setPrice] = useState('');
  const [category,setCategory] = useState('Men');
  const [subCategory,setSubCategory] = useState('Dragon ball');
  const [bestseller,setBestseller] = useState(false);
  const [sizes,setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!name || !description || !price || (image1 === null && image2 === null && image3 === null && image4 === null)) {
      toast.error('Please fill in all required fields and upload at least one image.');
      return;
    }
    
    // Ensure that subCategory is selected
    if (!subCategory) {
      toast.error('Please select a sub-category.');
      return;
    }
  
    try {
      
      const formdata = new FormData()

      formdata.append("name",name)
      formdata.append("description",description)
      formdata.append("price",price)
      formdata.append("category",category)
      formdata.append("subCategory",subCategory)
      formdata.append("bestseller",bestseller)
      formdata.append("sizes",JSON.stringify(sizes))

      image1 && formdata.append("image1",image1)
      image2 && formdata.append("image2",image2)
      image3 && formdata.append("image3",image3)
      image4 && formdata.append("image4",image4)

      const response = await axios.post(backendUrl + "/api/product/add", formdata,{headers:{token}})

      if (response.data.success) {
        toast.success(response.data.message)
        setName('');
        setDescription('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice('');
        setSizes([]);
        setBestseller(false);

      } else {
        toast.error(response.data.message)
      }
        

    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div>
      <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
        <div>
          <p>Upload Image</p>

          <div className='flex gap-2'>
            <label htmlFor="image1">
              <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
              <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden />
            </label>
            <label htmlFor="image2">
              <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
              <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden />
            </label>
            <label htmlFor="image3">
              <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
              <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden />
            </label>
            <label htmlFor="image4">
              <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
              <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id="image4" hidden />
            </label>
           
          </div>
        </div>

        <div className='w-full'>
          <p className='mb-2'>Product name</p>
          <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' />
        </div>
        <div className='w-full'>
          <p className='mb-2'>Product description</p>
          <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write description' />
        </div>

        <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8 '>
          <div>
            <p className='mb-2'>Product category</p>
            <select onChange={(e)=>setCategory(e.target.value)} value={category} className='w-full px-3 py-2' name="" id="">
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>

          <div>
            <p className='mb-2'>Sub category</p>
            {/* onChange={(e)=>setSubCategory(e.target.value)} value={subCategory} */}
            <select onChange={(e)=>setSubCategory(e.target.value)} value={subCategory} className='w-full px-3 py-2' name="" id="">
              <option value="Dragon Ball">Dragon Ball</option>
              <option value="One Piece">One Piece</option>
              <option value="Naruto">Naruto</option>
            </select>
          </div>

          <div>
            <p className='mb-2'>Product Price</p>
            <input onChange={(e)=>setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='25' />
          </div>

        </div>

        <div>
          <p>Prouct Sizes</p>
          <div className='flex gap-3'>
            <div onClick={(e)=>setSizes(prev => prev.includes('S') ? prev.filter(item => item !== "S") : [...prev,'S'])}>
              <p className={` ${sizes.includes("S")? 'bg-blue-200' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>
                S
              </p>
            </div>
            <div onClick={(e)=>setSizes(prev => prev.includes('M') ? prev.filter(item => item !== "M") : [...prev,'M'])}>
              <p className={` ${sizes.includes("M")? 'bg-blue-200' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>
                M
              </p>
            </div>
            <div onClick={(e)=>setSizes(prev => prev.includes('L') ? prev.filter(item => item !== "L") : [...prev,'L'])}>
              <p className={` ${sizes.includes("L")? 'bg-blue-200' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>
                L
              </p>
            </div>
            <div onClick={(e)=>setSizes(prev => prev.includes('XL') ? prev.filter(item => item !== "XL") : [...prev,'XL'])}>
              <p className={` ${sizes.includes("XL")? 'bg-blue-200' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>
                XL
              </p>
            </div>
            <div  onClick={(e)=>setSizes(prev => prev.includes('XXL') ? prev.filter(item => item !== "XXL") : [...prev,'XXL'])}>
              <p className={` ${sizes.includes("XXL")? 'bg-blue-200' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>
                XXL
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-2">
          <input onChange={(e)=>setBestseller(prev => !prev)} checked={bestseller} type='checkbox' id='bestsseller' />
          <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
        </div>

        <button  type='submit' className='w-20 py-3 mt-4 bg-black text-white'>Add</button>
      </form>
    </div>
  )
}

export default Add