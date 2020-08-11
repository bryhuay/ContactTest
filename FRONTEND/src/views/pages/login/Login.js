import React, { useState, useEffect }  from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import axios from '../../../AxiosFiles/axios.js';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Login = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [redirect, setRedirect] = React.useState(false)
  function loginForm() {
    
      const params = {
        method: 'post',
        url: 'users/login',
        data: {email: email,
          password: password },
        headers: {}
      };
      console.log(params);
      axios(params) 
      .then( (response) => {
          localStorage.setItem('jwtToken', response.data.token);
          localStorage.setItem('user', response.data.user);
          setRedirect(true);
          renderRedirect();
          window.location.reload();
      })
      .catch( (response) => {
        //handle error
        alert("Hubo un problema, vuelve a intentarlo");
        //console.log(response);
      });
    
    
    

  }
  function renderRedirect (){
    if (redirect) {
      return <Redirect to='/contacts' />
    }
  }
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
       
      <CContainer>
      
        <CRow className="justify-content-center">
        {renderRedirect()}
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Inicio de sesion</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="email" placeholder="Email" autoComplete="email"  value={email}  onChange={e => setEmail(e.target.value)}/>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" autoComplete="current-password" value={password}  onChange={e => setPassword(e.target.value)} />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" onClick={loginForm}>Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Registrate</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Ir a formulario</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
