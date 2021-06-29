import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';

import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Profile from './components/Profile';
import SignUp from './components/Signup';
import Onboarding from './components/Onboarding';
import SearchClasses from './components/SearchClasses';
import SearchPunchpasses from './components/SearchPunchpasses';
import Modal from './components/Modal';

// import axiosWithAuth from './utils/axiosWithAuth';

import './App.css';

const initialAuthValue = {
  isAuth: false
}

const initialClientItems = {
  classes: [],
  punchpasses: []
};

const initialClientClassSearchValues = [];

const initialClientPunchpassSearchValues = [];

const App = () => {

  const [isAuth, setIsAuth] = useState(initialAuthValue);
  const [isModal, setIsModal] = useState(false);
  const [typeModal, setTypeModal] = useState('');
  const [clientItems, setClientItems] = useState(initialClientItems);
  const [clientClassSearch, setClientClassSearch] = useState(initialClientClassSearchValues);
  const [clientPunchpassSearch, setClientPunchpassSearch] = useState(initialClientPunchpassSearchValues);

  const handleModalCancel = () => {
    setIsModal(false);
    setTypeModal('');
  }

  const handleClientClassAdd = (data) => {
    setTypeModal('success');
    setClientItems({
      classes: [...clientItems.classes, data],
      punchpasses: [...clientItems.punchpasses]
    });
    // axiosWithAuth()
    //   .post('/api/add-class', data)
    //   .then(res => {
    //       //set class state in my classes to reflect backend change
    //         setClientItems({
    //           classes: [...clientItems.classes, res.data],
    //           punchpasses: [...clientItems.punchpasses]
    //         });
    //   })
    //   .catch(err => {
    //       console.log(err)
    //   })
  }

  const handleClientClassDelete = (id) => {
      setTypeModal('success');
      let newClasses = clientItems.classes.filter(el => el.id !== id)
      setClientItems({
        classes: newClasses,
        punchpasses: [...clientItems.punchpasses]
      })
      // axiosWithAuth()
      //   .delete(`/api/delete/${id}`)
      //   .then(res => {
      //       setClientItems({
      //         classes: newClasses,
      //         punchpasses: [...clientItems.punchpasses]
      //       })
      //       setTypeModal('success');
      //   })
      //   .catch(err => {
      //       setTypeModal('error');
      //   })
  }

  const handleClientClassReschedule = (id, newDate) => {
      setTypeModal('success');
      setClientItems({
        classes: clientItems.classes.map(el => {
          return el.id === id ? { ...el, date: newDate } : el
        }),
        punchpasses: [...clientItems.punchpasses]
      });
      // axiosWithAuth()
      //   .put(`/api/delete/${id}`, newDate)
      //   .then(res => {
      //     setClientItems({
      //       classes: clientItems.classes.map(el => {
      //         return el.id === id ? { ...el, date: newDate } : el
      //       }),
      //       punchpasses: [...clientItems.punchpasses]
      //     });
      //     setTypeModal('success');
      //   })
      //   .catch(err => {
      //     setTypeModal('error');
      //   })
  }

  const handleClientPunchpassAdd = (data) => {
    setTypeModal('success');
    setClientItems({
      classes: [...clientItems.classes],
      punchpasses: [...clientItems.punchpasses, data]
    });
    // axiosWithAuth()
    //   .post('/api/add-punchpass', data)
    //   .then(res => {
    //       //set punchpass state in my classes to reflect backend change
    //         setClientItems({
    //           classes: [...clientItems.classes],
    //           punchpasses: [...clientItems.punchpasses, res.data]
    //         });
    //   })
    //   .catch(err => {
    //       console.log(err)
    //   })
  }

  const handleClientPunchpassDelete = (id) => {
    setTypeModal('success');
    let newPunchpasses = clientItems.punchpasses.filter(el => el.id !== id);
    setClientItems({
      classes: [...clientItems.classes],
      punchpasses: newPunchpasses
    });
    // axiosWithAuth()
    //   .delete(`/api/delete/${id}`)
    //   .then(res => {
    //     setClientItems({
    //       classes: [...clientItems.classes],
    //       punchpasses: newPunchpasses
    //     })
    //     setTypeModal('success');
    //   })
    //   .catch(err => {
    //       setTypeModal('error');
    //   })
}

  return (
      <div className="App"> 
        <Header isAuth={isAuth.isAuth} setAuth={setIsAuth} />

        { 
          isModal ? 
          <Modal 
              typeModal={typeModal} 
              handleModalCancel={handleModalCancel}
              handleClientClassAdd={handleClientClassAdd}
              handleClientClassDelete={handleClientClassDelete}
              handleClientClassReschedule={handleClientClassReschedule}
              handleClientPunchpassAdd={handleClientPunchpassAdd}
              handleClientPunchpassDelete={handleClientPunchpassDelete}
          /> 
          : null
        }
      
          <PrivateRoute
            isAuth={isAuth.isAuth}
            setIsModal={setIsModal}
            setTypeModal={setTypeModal}
            clientItems={clientItems} 
            setClientItems={setClientItems}
            exact path='/profile'
            component={Profile}
          />

          <Route path='/signup'>
            <SignUp setAuth={setIsAuth} />
          </Route>

          <Route path='/onboarding' component={Onboarding} />

          <Route path='/search-classes'>
            <SearchClasses 
              setIsModal={setIsModal}
              setTypeModal={setTypeModal}
              clientClassSearch={clientClassSearch}
              setClientClassSearch={setClientClassSearch}
            />
          </Route>

          <Route path='/search-punchpasses'>
            <SearchPunchpasses 
              setIsModal={setIsModal}
              setTypeModal={setTypeModal}
              clientPunchpassSearch={clientPunchpassSearch}
              setClientPunchpassSearch={setClientPunchpassSearch}
            />
          </Route>

          <Route path='/login'>
            {isAuth.isAuth ? <Redirect to='/profile' /> : <Login setAuth={setIsAuth} />}
          </Route>

          <Route exact path='/'>
            {isAuth.isAuth ? <Redirect to='/profile' /> : <Login setAuth={setIsAuth} />}
          </Route>
        
      </div>
  );
}

export default App;
