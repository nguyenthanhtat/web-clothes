import React,{useEffect, useState,useContext} from 'react'
import {ProfileStyle} from '../../Style/Authentication/ProfileStyle'
import {logo} from '../../imports/image'
import { useDispatch,useSelector } from 'react-redux'
import axios from 'axios'
import {GlobalState} from '../../Context/GlobalState'
import swal from "sweetalert";
import { ToastContainer, toast } from 'react-toastify';
const initialState ={
  name: "",
  phone_number: "",
  sex: "",
  date_of_birth: "",

}
const Profile = () => {
  const [states, setState] = useState(initialState);
  const [images, setImages] = useState(false);
  const state = useContext(GlobalState);
  const [callback,setCallback] = state.callback;
  const dispatch = useDispatch();
  const {profile,refreshTokens}=useSelector((state)=> state.auth);
  console.log(refreshTokens,'token')
  useEffect(() => {
    if (profile.image) {
      setState({ ...profile});
      if (profile.image.url === "") {
        setImages(profile.image.url);
      } else {
        setImages(profile.image);
      }
    }
  }, [profile]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...states, [name]: value });
  };
  const handleEdit = async(e)=>{
    e.preventDefault();
    if(!images)
      return swal('no Image Upload.',{
        icon:'error'
      });
    try {
      await axios.patch(
        `/api/auth/customer/profile/update`,
        {...states,image:images},
        {headers:{
          Authorization:`${refreshTokens}`
        }}
      );
      swal("Edit profile Successfully",{
        icon: "success",
      });
      setCallback(!callback);
    } catch (error) {
      alert(error.msg)
      
    }

  }
  const handleDestroy = async () => {
    try {
   
      await axios.post(
        "/api/destroyImageUser",
        { public_id: images.public_id },
        {
          headers: {
            Authorization: ` ${refreshTokens}`,
          },
        }
      );
    
      setImages(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      if (!file)
        return swal("File not Exists", {
          icon: "error",
        });
      if (file.size > 1024 * 1024)
        // 1mb
        return swal("Size too large!", {
          icon: "error",
        });
      if (file.type !== "image/jpeg" && file.type !== "image/png")
        // 1mb
        return swal("File format is incorrect.", {
          icon: "error",
        });
      let formData = new FormData();

      formData.append("file", file);
    
      const res = await axios.post("/api/uploadImageUser", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `${refreshTokens}`,
        },
      });

   
      setImages(res.data);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  console.log(images,'image')
  const styleUpload = {
    display: images ? "block" : "none",
  };
  return (
    <>
    <ProfileStyle/>
  
    <div className="profile">
        <div className="profile_wrapper"> 
        <div className="user">
          {profile.image&&(<img src={profile.image.url}  />)}
          
          <p>Name: {profile.fullname}</p>
          <p>Joined: 23/02/2022</p>
        </div>
      
        <div className="user1">
          <form onSubmit={handleEdit}>
            <div>
              <div className="form">
                <label htmlFor="account-fn">UserName:</label>
                <input
                  className="input"
                  type="text"
                  required
                  value={states.fullname}
                  name="fullname"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <div className="form">
                <label htmlFor="account-email">E-mail Address:</label>
                <input
                  className="input"
                  type="email"
                  value={states.email}
                  name="email"
                  disabled
                  onChange={handleChange}
                />
              </div>
            </div>
          <div className="">
            <div className="form">
              <label htmlFor="account-pass">Phone Number</label>
              <input
                className="input"
                type="text"
                value={states.phone_number}
                name="phone_number"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form_container">
              <div className="form_container_item">
                <div className="">
                  <label htmlFor="gioitinh">Gender</label>
                </div>
                <div className="form-check">
                  <input
                    className=""
                    type="radio"
                    value="1"
                    id="sex"
                    name="sex"
                    checked={states.sex == 1}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="flexRadioDefault1">
                    Nam
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className=""
                    type="radio"
                    value="0"
                    id="sex"
                    name="sex"
                    checked={states.sex == 0}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="flexRadioDefault2">
                    Nữ
                  </label>
                </div>
           
           
                <div className="form">
                  <label htmlFor="account-pass">Birth Day</label>
                  <input
                    className="input"
                    type="date"
                    data-date=""
                    data-date-format="DD MMMM YYYY"
                    name="date_of_birth"
                    id="date_of_birth"
                    value={states.date_of_birth}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form_container_item">
                      <div className="upload">
                        <input
                          type="file"
                          name="file"
                          id="file_up"
                          onChange={handleUpload}
                        />
                    <div id="file_img" style={styleUpload}>
                      {images && (
                      <img
                        src={images ? images.url : images}
                        alt=""
                        style={styleUpload}
                        className="img_avatar"
                      />
                      
                    )}
                   <span onClick={handleDestroy}>X</span>
                    </div>
              </div>
              </div>
          </div>
          <button className='profile_btn' >Update Profile</button>
          </form>
        </div>
        
        </div>
        


    </div>
    </>
  )
}

export default Profile