import React ,{useState} from 'react'
import img1 from "../images/logo.png"
import SearchBar from './Searchbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'
const Sidebar = () => {
    const [isOpen,setIsOpen]=useState(false);
    
    const toggleSidebar=()=>{
        setIsOpen(!isOpen);
    }
  return (

<aside>
            <div className="top">
                <div className="logo">
                    <img src={img1} alt=""/>
                    <h2>INFO <span className="danger">SYS</span></h2>
                </div>
                <SearchBar/>
                <div className="close" id="close-btn">
                    <span className="material-icons-sharp">close</span>                
                    </div>
            </div>

            {/* note : a link shouldbe converted to LINK  */}
         <button onClick={toggleSidebar}><FontAwesomeIcon icon={faBars}/></button>
         {isOpen && 
         
            <div className="sidebar">
                <a href="#">
                    <span className="material-icons-sharp">grid_view</span>
                    <h3>Dashboard</h3>
                </a>
                <a href="#" className="active">
                    <span className="material-icons-sharp">inventory</span>
                    <h3>Inventory</h3>
                </a>
            
                <a href="#">
                    <span className="material-icons-sharp">reorder</span>
                    <h3>Orders</h3>
                </a>
                <a href="#">
                    <span className="material-icons-sharp">add_shopping_cart</span>
                    <h3>Cart</h3>
                </a>
                <a href="#">
                    <span className="material-icons-sharp">manage_accounts</span>
                    <h3>Help Center</h3>
                </a>
                
                <a href="#">
                    <span className="material-icons-sharp">logout</span>
                    <h3>Logout</h3>
                </a>
            </div>
         }

        </aside>

  )
}

export default Sidebar