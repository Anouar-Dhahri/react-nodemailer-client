import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from "react-responsive-modal";
import 'react-responsive-modal/styles.css';

import './App.css';
import paperplane from './images/envelope-to-paper-plane-animation.gif';

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [id, setId] = useState("");
  const [url, setUrl] = useState("");

  const [showModal, setShowModal] = useState(false)

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const sendMail = async(e) => {
    e.preventDefault();
    await axios.post('https://nodemailer-server-1994.herokuapp.com/api/mail/send', {name, email, subject, message})
              .then((res) => {
                if(res.status === 200){
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
                  setId(res.data.id);
                  setUrl(res.data.url);
                  openModal();
                  
                  console.log(id, url)
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

        <button onClick={sendMail} className="btn">SEND</button>
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
      <Modal open={showModal} onClose={closeModal} classNames="modal">
      <h2>Email Info</h2>
      <div className='preview-data'>
        <h4>Email Id : </h4>
        <input className="preview-data__input" type="text"  value= {id} disabled />
        <h4>Email Url : </h4>
        <a href={url} target="_blank"><button className="btn">SHOW EMAIL</button></a>
      </div>
      </Modal> 
    </div>
  );
}

export default App;
