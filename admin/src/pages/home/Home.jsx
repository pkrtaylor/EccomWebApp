import React, {useState, useEffect, useMemo} from 'react'
import Chart from '../../components/charts/Chart'
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo'
import './home.css'
import { userData } from '../../dummyData'
import WidgetLg from '../../components/widgetLg/WidgetLg'
import WidgetSm from '../../components/widgetSm/WidgetSm'
import { userRequest } from "../../requestMethods";

const Home = () => {

    const [userStats, setUserStats] = useState([]);
    //usememo allows us to use this months as a dependency in our useEffect
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
            const res = await userRequest.get("/users/stats");
            //for each item we set stats 
            res.data.map((item) =>
              setUserStats((prev) => [
                  //we take the the previous object and continously add new ones
                  //so its kind of like a loop userStats starts out as empty 
                  //ex first time item._id in the data would be 12 but the months array goes from 0-11 which is why we do item._id -1   
                  ...prev,
                { name: MONTHS[item._id - 1], "Active User": item.total },
              ])
            );
          } catch {}
        };
        getStats();
      }, [MONTHS]);

      console.log(userStats)
    return (
        <div className='home'>
            <FeaturedInfo/>
            <Chart data={userStats} title="User Analytics" grid dataKey="Active User"/>
            <div className="homeWidgets">
                <WidgetSm />
                <WidgetLg />
            </div>
        </div>
    )
}

export default Home
