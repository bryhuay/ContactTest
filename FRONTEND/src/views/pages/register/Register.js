import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import axios from '../../../AxiosFiles/axios.js';
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
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

const Register = () => {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [passwordr, setPasswordr] = React.useState('') //password repeat
  const [redirect, setRedirect] = React.useState(false)

  function registerUser (){
    if(name != '' && email!='' && password!='' && passwordr!=''){
      if(password == passwordr){
        const params = {
          method: 'post',
          url: 'users',
          data: {name: name,
            email: email,
            password: password },
          headers: {}
        };
        axios(params) 
        .then( (response) => {
         
          localStorage.setItem('jwtToken', response.data.token);
          localStorage.setItem('user', response.data.createdUser);
          setRedirect(true);
          renderRedirect();
          window.location.reload();
        })
        .catch( (response) => {
          //handle error
          alert("Hubo un problema, vuelve a intentarlo mas tarde");
          //console.log(response);
        });
      }
      else{
        alert('Las constraseñas no conciden')
      }

    }
    else{
      alert('Debe llenar todos los campos')
    }

  }
  function renderRedirect (){
    if (redirect) {
      return <Redirect to='/contacts' />
    }
  }


  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      {renderRedirect()}
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Registrar</h1>
                  <p className="text-muted">Crear Cuenta</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Nombres" autoComplete="nombres" value={name}  onChange={e => setName(e.target.value)} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Email" autoComplete="email" value={email}  onChange={e => setEmail(e.target.value)}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" placeholder="Password" autoComplete="new-password"  value={password}  onChange={e => setPassword(e.target.value)}/>
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" placeholder="Repeat password" autoComplete="new-password" value={passwordr}  onChange={e => setPasswordr(e.target.value)} />
                  </CInputGroup>
                  <CButton color="success" onClick={registerUser} block>Crear Cuenta</CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
