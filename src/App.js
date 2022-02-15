import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from "react-responsive-modal";
import './App.css';
import paperplane from './images/envelope-to-paper-plane-animation.gif';

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState({
    id:"",
    url:""
  });
  const [showModal, setShowModal] = useState(false)

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const sendMail = async(e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/mail/send', {name, email, subject, message})
              .then((res) => {
                if(res.status==200){
                  toast.success('Check your inbox', {
                    theme:"colored",
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                  openModal();
                  setPreview(preview => [...preview, res.data]);
                  console.log(preview)
                }else {
                  toast.error("Error");
                }
              });
    console.log(name, email, subject, message);
  }

  return (
    <div className='container'>
      <div className='left'>
        <img src={paperplane} alt="animation" />
      </div>
      <div className='right'>
        <input 
          type="text"
          placeholder="Name"
          name="name"
          onChange={e => setName(e.target.value)}
        />

        <input 
          type="email"
          placeholder="Email"
          name="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input 
          type="text"
          placeholder="Subject"
          name="subject"
          onChange={e => setSubject(e.target.value)}
        />

        <textarea
          placeholder="Message"
          name="message"
          onChange={e => setMessage(e.target.value)}
        />

        <button onClick={sendMail}>SEND</button>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

    </div>
  );
}

export default App;
