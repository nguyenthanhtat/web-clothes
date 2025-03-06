import axios from 'axios';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const VerifyAccount = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const email = query.get('email');
  const token = query.get('token');
  const handleVerify = async () => {
    await axios.post(`/api/auth/customer/verify`, {
      email, token
    }).then((res)=>{
      console.log('res', res)
      if(res.status === 200 && res?.data?.redirectUrl){
          navigate(res?.data?.redirectUrl);
      }
    })
  }
  return (
    <>
      <div>VerifyAccount</div>
      <button onClick={handleVerify}>Verify</button>
    </>
  )
}

export default VerifyAccount