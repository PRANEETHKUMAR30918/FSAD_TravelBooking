import React, { useEffect, useState } from 'react'
import './MenuBar.css'
import { callApi, getSession } from './api';

export default function MenuBar() {
  const [getmenuitems, setmenuitems] = useState([]);

  useEffect(() => {
    let csr = getSession("csrid");
    let data = JSON.stringify({ csrid: csr });
    callApi("POST", "http://localhost:8030/menus/getmenusbyrole", data, menuresponse);
  }, []);

  const menuresponse = (res) => {
    const data = JSON.parse(res);
    setmenuitems(data);
  };

  return (
    <div className='menubar'>
      <div className='menuheader'><img src="./menu.jpg" alt="menu icon" />Menu</div>
      <div className='menuitem'>
        <ul>
          {
            getmenuitems.map((row, index) => (
              <li key={index}><img src={row.icon} alt="" />{row.menu}</li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}