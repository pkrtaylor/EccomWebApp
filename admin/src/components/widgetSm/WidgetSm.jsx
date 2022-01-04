import { Visibility } from '@material-ui/icons'
import React, {useState, useEffect} from 'react'
import { userRows } from '../../dummyData';
import { userRequest } from '../../requestMethods';
import "./WidgetSm.css"



const WidgetSm = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
       const getUsers = async () =>{
           try {
               const res = await userRequest.get("users/?new=true");
               setUsers(res.data);
            }
            catch(err){
                   console.log(err); 
            }
       }
       getUsers();
    }, [])

    return (
        <div className='widgetSm'>
            <span className="widgetSmallTitle">New Join Members</span>
            <ul className="widgetSmallList">
                {//for each user we call this component
                users.map(user=> 
                (
                    <li className="widgetSmallItem" key={user._id}>
                    <img src={user.img || "https://hello2eat.com/assets/images/avatar.jpg"} alt="" className="widgetSmImg" />
                    <div className="widgetSmUser">
                        <span className="widgetSmUsername">{user.username}</span>
                    </div>
                    <button className="widgetSmButton">
                        <Visibility className='widgetSmIcon'/>
                        Display
                    </button>
                </li>
                ))}
                
            </ul>
        </div>
    )
}

export default WidgetSm
