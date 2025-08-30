import React, { useState ,useEffect } from 'react';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Login from '../components/forms/Login';
import Register from '../components/forms/Register';
import AddFirm from '../components/forms/AddFirm';
import AddProduct from '../components/forms/AddProduct';
import AllProducts from '../components/AllProducts';  

const LandingPage = () => {
  const [currentPage, setCurrentPage] = useState(null); 
  // null | 'login' | 'register' | 'addFirm' | 'addProduct' | 'allProducts' 
  const [showLogout ,setShowLogout] = useState(false);
  const [showFirmTitle,setShowFirmtitle] = useState(true);
  // handler functions
  const showLoginHandler = () => setCurrentPage('login');
  const showRegisterHandler = () => setCurrentPage('register');
  const showFirmHandler = () => {
       if (showLogout){
          setCurrentPage('addFirm');
       }else{
        alert("Please Login ")
        setCurrentPage('login')
       }
       };
    
  const showProductHandler = () => {
    if(showLogout){
        setCurrentPage('addProduct')
    }else {
      alert("please Login ");
      setCurrentPage('login')
    }
    };
  const showAllProductsHandler = () => {
    if(showLogout){
        setCurrentPage('allProducts')
    } else {
      alert("please login")
      setCurrentPage('login')
    }
 }; 



  
   useEffect(()=>{
    const loginToken = localStorage.getItem('loginToken');
    if(loginToken){
         setShowLogout(true);
    }
   },[])

   useEffect(()=>{
      const storedfirmName = localStorage.getItem('firmName');
      if(storedfirmName){
        setShowFirmtitle(storedfirmName);
      }
   },[])
   const showLogoutHandler =()=>{
    confirm("Are you sure to Logout ? ")
    localStorage.removeItem("loginToken");
    localStorage.removeItem("firmId")
    localStorage.removeItem("firmName");
    setShowLogout(false)
    setShowFirmtitle(true)
    setCurrentPage(null);
   }


  return (
    <section className='landingSection'>
      <NavBar 
        showLoginHandler={showLoginHandler} 
        showLogout ={showLogout}
        showRegisterHandler={showRegisterHandler} 
        showLogoutHandler={showLogoutHandler}
        showFirmTitle = {showFirmTitle}
      />

      <div className="collectionSec">
        <SideBar 
          showFirmHandler={showFirmHandler} 
          showProductHandler={showProductHandler}
          showAllProductsHandler={showAllProductsHandler} 
          showFirmTitle={showFirmTitle} 
          
        />

        {/* Dynamic rendering */}
        {currentPage === 'login' &&   <Login />}
        {currentPage === 'register' && <Register showLoginHandler={showLoginHandler} />}
        {currentPage === 'addFirm' &&  <AddFirm />}
        {currentPage === 'addProduct' &&   <AddProduct />}
        {currentPage === 'allProducts' &&  <AllProducts />} 
      </div>
    </section>
  );
};


export default LandingPage;


