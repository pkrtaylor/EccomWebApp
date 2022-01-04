import React, {useState, useEffect} from 'react'
import './WidgetLg.css'
import {userRequest} from '../../requestMethods'
import {format} from "timeago.js"






const WidgetLg = () => {

    const Button = ({type}) =>{
        return <button className={"widgetLgButton " + type}>{type}</button>
    };

    const [orders, setOrders] = useState([]);

    useEffect(()=> {

        const getOrders = async ()=>{
            try {
                const res = await userRequest.get("orders");
                setOrders(res.data);
            } catch (err) {
                console.log(err)
            }
        }
        getOrders();

    },[])
    return (
        <div className='widgetLg'>
            <h3 className="widgetLgTitle">Latest Transactions</h3>
            <table className="widgetLgTable">
                <tr className="widgetLgTr">
                    <th className="widgetLgTh">Customer</th>
                    <th className="widgetLgTh">Date</th>
                    <th className="widgetLgTh">Amount</th>
                    <th className="widgetLgTh">Status</th>
                </tr>
               {orders.map((order) => (

                    <tr className="widgetLgTr" key={order._id}>
                    <td className="widgetLgUser">
                        <img src="https://64.media.tumblr.com/3e2f7680e8c64ed7ab1ecf4e4941777e/5f67b385dc0035ad-1f/s640x960/d6950453e182fd55cbf57cc4ccbb7db6054fbfe4.jpg" alt="" className="widgetLgImg" />
                        <span className="widgetLgName">{order.userId}</span>
                    </td>
                    <td className="widgetLgDate">{format(order.createdAt)}</td>
                    <td className="widgetLgAmount">{order.amount}</td>
                    <td className="widgetLgStatus">
                        <Button type={order.status}/>
                    </td>
                </tr>
               ))}
                
                
            </table>
        </div>
    )
}

export default WidgetLg
