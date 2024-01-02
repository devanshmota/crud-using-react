import React, { useEffect, useState } from 'react'
import './App.css';

function App() {

  let [formData, setFormData] = useState({
    email: '',
    mobile_number: ''
  })
  let [data, setData] = useState([])

  useEffect(() => {
    let newData = JSON.parse(localStorage.getItem("data"));
    setData(newData)
  }, [])

  const saveData = (data) => {
    localStorage.setItem("data", JSON.stringify(data));
  }

  const Submit = (e) => {
    e.preventDefault();
    setData((prevData) => [...prevData, formData])
    saveData(data);
    setFormData({
      email: '',
      mobile_number: ''
    })
  }

  const handleChange = (e) => {
    e.preventDefault()
    let {name, value} = e.target
    setFormData((prevData) => ({...prevData, [name]:value}))
  }

  const handleDelete = (index) => {
    let newData = data.filter((_, i) => i !== index)
    setData(newData)
    saveData(newData);
  }

  const handleEdit = (index) => {
    setFormData(data[index])
    let newData = data.filter((_, i) => i !== index)
    setData(newData)
    saveData(newData);
  }


  // login code

  const loginDetails = {
    name: 'Devansh Mota',
    email: 'devanshmota@gmail.com',
    password: 'devansh123'
  }

  const [isLoginApproved, setIsLoginApproved] = useState(false)

  const [loginFormData, setLoginFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
const handleLoginChange = (e) => {
  e.preventDefault()
  let {name, value} = e.target
  setLoginFormData((prevData) => ({...prevData, [name]:value}))
}
const loginSubmit = (e) => {
  e.preventDefault();
  if(
    loginDetails.name.trim().toLowerCase() === loginFormData.name.trim().toLowerCase() &&
    loginDetails.email.trim() === loginFormData.email.trim() &&
    loginDetails.password.trim() === loginFormData.password.trim() &&
    loginDetails.password.trim() === loginFormData.confirmPassword.trim()
  ){
    setIsLoginApproved(true)
  }
  else{
    setIsLoginApproved(false)
    alert('Incorrect Credentials')
  }
}

  return (
    <> 
    <h2>Login</h2>
      <form onSubmit={loginSubmit}>
        <input type="text" name='name' value={loginFormData.name} onChange={handleLoginChange} placeholder='Enter your name' /><br />
        <input type="email" name='email' value={loginFormData.email} onChange={handleLoginChange} placeholder='Enter your email' /><br />
        <input type="password" name='password' value={loginFormData.password} onChange={handleLoginChange} placeholder='Enter your password'/><br />
        <input type="password" name='confirmPassword' value={loginFormData.confirmPassword} onChange={handleLoginChange} placeholder='Confirm your password' /><br />
        <button type='submit'>Submit</button>
      </form>
      <br />
      { isLoginApproved && (<><h2>Crud</h2> <form onSubmit={Submit}>
        <input type="email" name='email' placeholder='Enter your email' onChange={handleChange} value={formData.email} required/> <br />
        <input type="tel" name='mobile_number' pattern='[0-9]{10}' placeholder='Enter your mobile number' onChange={handleChange} value={formData.mobile_number} required/><br />
        <button type='submit'>Submit</button>
      </form>
      <table>
        <tbody>
            <tr>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Action</th>
            </tr>
          {
            data.map((item,index) => (
              <tr key={index}>
                  <td>{item.email}</td>
                  <td>{item.mobile_number}</td>
                  <td>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </td>
              </tr>
            ))
          }
          </tbody>
      </table></>)
      }
    </>
  );
}

export default App;
