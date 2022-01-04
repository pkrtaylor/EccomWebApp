import React, { useState, useMemo, useEffect } from 'react'
import './product.css'
import {Link, useLocation} from 'react-router-dom'
import Chart from '../../components/charts/Chart'
import { productData } from '../../dummyData'
import { Publish } from '@material-ui/icons'
import { useSelector } from 'react-redux'
import { userRequest } from '../../requestMethods'


const Product = () => {

    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    const [pStats, setPStats] = useState([]);

    const MONTHS = useMemo(
        () => [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Agu",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        []
      );

      useEffect(() => {
        const getStats = async () => {
          try {
            const res = await userRequest.get("/orders/income?pid="+ productId);
            //it returned the months in opposite order so we will sort
            const list = res.data.sort((a,b)=>{
                return a._id - b._id
            });
            
            //for each item we set stats 
            list.data.map((item) =>
              setPStats((prev) => [
                  //we take the the previous object and continously add new ones
                  //so its kind of like a loop userStats starts out as empty 
                  //ex first time item._id in the data would be 12 but the months array goes from 0-11 which is why we do item._id -1   
                  ...prev,
                { name: MONTHS[item._id - 1], Sales: item.total },
              ])
            );
          } catch {}
        };
        getStats();
      }, [productId, MONTHS]);

    const product = useSelector(state=>
        state.product.products.find(product => product._id === productId)
        );

    return (
        <div className='product'>
           <div className="productTitleContainer">
               <h1 className="productTitle">Product</h1>
               <Link to="/newProduct">
                   <button className="productAddButton">Create</button>
               </Link>
           </div>
           <div className="productTop">
               <div className="productTopLeft">
                <Chart data={pStats} dataKey="Sales" title="Sales Performance"/>

               </div>
               <div className="productTopRight">
                   <div className="productInfoTop">
                       <img src={product.img} alt="" className="productInfoImg" />
                       <span className="productName">{product.title}</span>
                   </div>
                   <div className="productInfoBottom">
                       <div className="productInfoItem">
                           <div className="productInfoKey">Id:{product._id}</div>
                           <div className="productInfoValue">{product.amount}</div>
                       </div>
                       <div className="productInfoItem">
                           <div className="productInfoKey">Sales:</div>
                           <div className="productInfoValue">5431</div>
                       </div>
                       <div className="productInfoItem">
                           <div className="productInfoKey">In stock:</div>
                           <div className="productInfoValue">{product.inStock}</div>
                       </div>
                   </div>
               </div>
           </div>
           <div className="productBottom">
               <form className="productForm">
                   <div className="productFormLeft">
                       <label>Product Name</label>
                       <input type="text" placeholder={product.title} />
                       <label>Product Description</label>
                       <input type="text" placeholder={product.desc} />
                       <label>Price</label>
                       <input type="text" placeholder={product.price} />
                       <label>In Stock</label>
                       <select name="inStock" id="idStock">
                           <option value="true">Yes</option>
                           <option value="false">No</option>
                       </select>
                   </div>
                   <div className="productFormRight">
                       <div className="productUpload">
                           <img src={product.img} alt="" className="productUploadImg" />
                           <label for="file">
                               <Publish style={{cursor: "pointer"}} />
                           </label>
                           <input type="file" id="file" style={{display:"none"}}/>
                       </div>
                       <button className="productButton">Update</button>
                   </div>
               </form>
           </div>
        </div>
    )
}

export default Product
