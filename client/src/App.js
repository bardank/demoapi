import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Table from './components/table';

function App() {
  const [floorSheets, setFloorSheets] = useState(null);
  const [formData, setFormData] = useState({
    contractNo: '',
    stockId: '',
    buyerBroker: '',
    sellerBroker: ''
  });

  const { contractNo, buyerBroker, sellerBroker } = formData

  useEffect(() => {
    axios.get('/api?&size=10&sort=contractId,desc').then((res) => {
      let data = res.data
      // console.log(data)
      setFloorSheets(data);
    })
  }, []);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let datass = new FormData();    //formdata object
    if (contractNo) {
      datass.append('contractNo', contractNo);

    }
    if (sellerBroker) {

      datass.append('sellerBroker', sellerBroker)   //append the values with key, value pair
    }
    if (buyerBroker) {
      datass.append('buyerBroker', buyerBroker)   //append the values with key, value pair

    }


    const queryString = new URLSearchParams(datass).toString()
    const baseURL = `?${queryString}&sort=contractId,desc`
    axios.get(`/api${baseURL}`).then((res) => {
      let data = res.data
      setFloorSheets(data);
    })
    console.log(baseURL)
  }
  return (
    <div className="main">
      <div className="mt-5">
        <div className="container">
          <div className="row">
            <div className="col">
              <input type="text"
                className="form-control"
                name='contractNo'
                onChange={(e) => onChange(e)}
                value={contractNo}
                placeholder="contract number" />


            </div>
            <div className="col">
              <input type="text"
                className="form-control"
                name='buyerBroker'
                onChange={(e) => onChange(e)}
                value={buyerBroker}
                placeholder="Buyer" />
            </div>
            <div className="col">
              <input type="text"
                className="form-control"
                name='sellerBroker'
                onChange={(e) => onChange(e)}
                value={sellerBroker}
                placeholder="Seller" />
            </div>
            {/* <div className="col">
              <input type="text" className="form-control" value={stockId} placeholder="stock symbol or company name" />
            </div> */}
            <div className="col">
              <button className='btn btn-primary' onClick={e => onSubmit(e)} >
                filter
              </button>
            </div>
          </div>
          <div className='my-4'>
            {floorSheets && <Table data={floorSheets} />}

          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
