import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Card } from 'react-bootstrap';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Anavbar from './Anavbar';

const Users = () => {
  const [userbookings, setUserbookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  useEffect(() => {
    axios.get(`http://localhost:4000/users`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch users:', error);
      });
  }, []);

  const deleteData = (taskId) => {
    axios.delete(`http://localhost:4000/userdelete/${taskId}`)
      .then(() => {
        alert('User is deleted');
        setUsers(prev => prev.filter(user => user._id !== taskId));
      })
      .catch(err => console.error(err));
  };

  const deleteorder = (taskId) => {
    axios.delete(`http://localhost:4000/userorderdelete/${taskId}`)
      .then(() => {
        alert('Deleted');
        setUserbookings(prev => prev.filter(order => order._id !== taskId));
      })
      .catch(err => console.error(err));
  };

  const fetchUserBikeData = (userId) => {
    axios.get(`http://localhost:4000/getorders/${userId}`)
      .then((response) => {
        setUserbookings(response.data);
        toggleDetails();
      })
      .catch((error) => {
        console.error('Error fetching user bike data:', error);
      });
  };

  const calculateStatus = (Delivery) => {
    const currentDate = new Date();
    const formattedDeliveryDate = new Date(Delivery);
    return formattedDeliveryDate >= currentDate ? "ontheway" : "delivered";
  };

  return (
    <div>
      <Anavbar />
      <br />
      <h1 className='text-center'>Users</h1>
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Table striped bordered hover variant="dark" style={{ width: "70%" }}>
          <thead>
            <tr>
              <th>sl/no</th>
              <th>UserId</th>
              <th>User name</th>
              <th>Email</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  <button style={{ border: 'none', background: 'none' }}>
                    <Link to={`/useredit/${item._id}`} style={{ color: 'blue', textDecoration: 'none' }}>
                      <FaEdit />
                    </Link>
                  </button>
                  <button onClick={() => deleteData(item._id)} style={{ border: 'none', color: 'red', background: 'none' }}>
                    <FaTrash />
                  </button>{' '}
                  <Button onClick={() => fetchUserBikeData(item._id)} style={{ marginBottom: '12px' }}>
                    view
                  </Button>
                  <div style={{ display: 'flex' }}>
                    {showDetails && (
                      <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50">
                        <div className="bg-gray-900 bg-opacity-50 absolute inset-0"></div>
                        <div className="bg-white p-4 rounded-lg z-10 relative" style={{ maxHeight: "80vh", overflowY: "scroll" }}>
                          <div className="container mx-auto mt-8" style={{ width: "1350px" }}>
                            <h1 className='text-center text-blue-300'>User Orders</h1>
                            {userbookings.map((item) => {
                              const status = calculateStatus(item.Delivery);
                              return (
                                <Card
                                  key={item._id}
                                  style={{
                                    width: '90%',
                                    marginLeft: '65px',
                                    backgroundColor: '#fff',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    borderRadius: '8px',
                                    paddingTop: '15px',
                                    marginBottom: '35px',
                                  }}
                                >
                                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <div>
                                      <img src={`http://localhost:4000/${item?.itemImage}`} alt={`${item.itemtype} Image`} style={{ height: "80px" }} />
                                    </div>
                                    <div>
                                      <p>Product Name:</p>
                                      <p>{item.itemname}-{item._id.slice(3, 7)}</p>
                                    </div>
                                    <div>
                                      <p>Orderid:</p>
                                      <p>{item._id.slice(0, 10)}</p>
                                    </div>
                                    <div>
                                      <p>Address:</p>
                                      {item.flatno},<br />{item.city},({item.pincode}),<br />{item.state}.
                                    </div>
                                    <div>
                                      <p>Buyer</p>
                                      <p>{item.userName}</p>
                                    </div>
                                    <div>
                                      <p>Seller</p>
                                      <p>{item.seller}</p>
                                    </div>
                                    <div>
                                      <p>BookingDate</p>
                                      <p>{item.BookingDate}</p>
                                    </div>
                                    <div>
                                      <p>Delivery By</p>
                                      <p>{item.Delivery}</p>
                                    </div>
                                    <div>
                                      <p>Warranty</p>
                                      <p>1 year</p>
                                    </div>
                                    <div>
                                      <p>Price</p>
                                      <p>{item.totalamount}</p>
                                    </div>
                                    <div>
                                      <p>Status</p>
                                      <p>{status}</p>
                                    </div>
                                    <button onClick={() => deleteorder(item._id)} style={{ border: 'none', color: 'red', background: 'none' }}>
                                      <FaTrash />
                                    </button>
                                  </div>
                                </Card>
                              );
                            })}
                          </div>
                          <Button onClick={toggleDetails} className="mt-4">
                            Close
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Users;
