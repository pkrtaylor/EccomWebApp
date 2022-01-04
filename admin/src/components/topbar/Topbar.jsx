import { Language, NotificationsNone, Settings } from '@material-ui/icons'

import { Link } from 'react-router-dom'
import './Topbar.css'



const Topbar = () => {
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <Link to="/" className='link'>
                    <span className="logo">IMMORTAL</span>
                    </Link>
                </div>
                <div className="topRight">
                    <div className="topbarIconContainer">
                        <NotificationsNone />
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Language />
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Settings />
                        
                    </div>
                        <img src="https://static1.srcdn.com/wordpress/wp-content/uploads/2021/11/JoJos-Bizarre-Adventure-Jolyne-Gucci-Unicorn.jpg?q=50&fit=crop&w=767&h=450&dpr=1.5" alt="" className="topAvatar" />
                </div>
            </div>
        </div>
    )
}

export default Topbar
