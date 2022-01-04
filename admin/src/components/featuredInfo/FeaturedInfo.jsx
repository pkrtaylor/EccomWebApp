import { ArrowDownward, ArrowUpward } from '@material-ui/icons'
import React, {useState, useEffect } from 'react'
import { userRequest } from '../../requestMethods';
import './featuredInfo.css'



const FeaturedInfo = () => {

    const [income, setIncome] = useState([]);
    const [percentage, setPercentage] = useState(0)
    useEffect(()=>{
        const getIncome= async ()=>{
            try {
                const res = await userRequest.get("orders/income");
                setIncome(res.data);
                setPercentage((res.data[1].total * 100) / res.data[0].total - 100);
            } catch (err) {
                console.log(err);
            }
        }
        getIncome();
    },[])

    console.log(income);
    return (
        <div className='featured'>
            <div className="featuredItem">
                <span className="featuredTitle">Revenue</span>
                    <div className="featuredMoneyContainer">
                        <span className="featuredMoney">$0</span>
                        <span className="featuredMoneyRate">
                            %0 <ArrowDownward className='featuredIcon negative' />
                        </span>
                    </div>
                    <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Sales</span>
                    <div className="featuredMoneyContainer">
                        <span className="featuredMoney">$4,415</span>
                        <span className="featuredMoneyRate">
                            -1.4 <ArrowDownward className='featuredIcon negative'/>
                        </span>
                    </div>
                    <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Cost</span>
                    <div className="featuredMoneyContainer">
                        <span className="featuredMoney">$2,415</span>
                        <span className="featuredMoneyRate">
                            +2.4 <ArrowUpward className='featuredIcon'/>
                        </span>
                    </div>
                    <span className="featuredSub">Compared to last month</span>
            </div>
        </div>
    )
}

export default FeaturedInfo
