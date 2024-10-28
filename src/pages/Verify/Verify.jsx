// import React, { useContext, useEffect } from 'react';
// import './Verify.css';
// import { StoreContext } from '../../context/StoreContext';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import axios from 'axios';

// const Verify = () => {
//   const [searchParams] = useSearchParams();
//   const success = searchParams.get("success");
//   const orderId = searchParams.get("orderId");
//   const { url } = useContext(StoreContext);
//   const navigate = useNavigate();

//   const verifyPayment = async () => {
//     try {
//       const response = await axios.post(`${url}/api/order/verify`, { success, orderId });
//       if (response.data.success) {
//         navigate("/myorders");
//       } else {
//         navigate("/");
//       }
//     } catch (error) {
//       console.error("Error verifying payment", error);
//       navigate("/"); // Handle error by redirecting to home
//     }
//   };

//   useEffect(() => {
//     verifyPayment();
//   }, []); // Empty dependency array ensures this runs only once after the initial render

//   return (
//     <div>
//       <div className="verify">
//         <div className="spinner"></div>
//       </div>
//     </div>
//   );
// };

// export default Verify;



import React, { useContext, useEffect } from 'react';
import './Verify.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = await axios.post(`${url}/api/order/verify`, { success, orderId });
      if (response.data.success) {
        navigate("/myorders");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error verifying payment", error);
      navigate("/"); // Handle error by redirecting to home
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [success, orderId, url, navigate]); // Add dependencies

  return (
    <div>
      <div className="verify">
        <div className="spinner"></div>
        <p>Verifying your payment, please wait...</p>
      </div>
    </div>
  );
};

export default Verify;
