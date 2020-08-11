import React , { useState, useEffect ,useRouteMatch}from 'react'
import { Link } from 'react-router-dom'
import axios from '../../../AxiosFiles/axios.js';
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFade,
  CForm,
  CFormGroup,
  CDataTable,
  CBadge,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdown,
  CInputGroupText,
  CLabel,
  CSelect,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import usersData from '../../users/UsersData'
const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = ['name','telephone', 'email', 'type']
const Edit = props => {

  const idUrl= props.match.params.id;
    
  const [name, setName] = React.useState('')
  const [telephone, setTelephone] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [type, setType] = React.useState('')
  const [id, setId] = React.useState(idUrl)
  const [boolPro, setBoolPro] = React.useState(false);
  const [boolPer, setBoolPer] = React.useState(false);

  const getContact = async () =>{
      const id= idUrl
    axios.get('contacts/find?contactId='+id, {
      }
    )
    .then( res => {        
      console.log(res);
      const con = res.data.data.contact;
      setName(con.name);
      setTelephone(con.telephone);
      setEmail(con.email);
      setId(con._id);
      setType(con.type);
      if(con.type=='Personal'){
          setBoolPer(true);
      }
      else{
          setBoolPro(true);
      }

 
      
    })
    .catch( res => {

      console.log(res);
    })
  }

  
  useEffect(() => {
    getContact();
  }, []);

  

  function saveContact() {
    if(type!=''){
      const contact ={
        name: name,
        telephone: telephone,
        email: email,
        type: type
      }
      const params = {
        method: 'post',
        url: 'contacts/update',
        data: {
            contactId:id,
            name: name,
            telephone: telephone,
            email: email,
            type: type },
        headers: {}
      };
      console.log(params);
      axios(params) 
      .then( (response) => {
          getContact();
          alert('Se guardaron sus cambios correctamente')
      })
      .catch( (response) => {
        //handle error
        alert("Hubo un problema, vuelve a intentarlo");
        //console.log(response);
      });
    }
    else{
      alert('Debe elegir un tipo de contacto');
    }
    

  }

    
  


  const [collapsed, setCollapsed] = React.useState(true)
  const [showElements, setShowElements] = React.useState(true)
  
  return (
    <>
      <CRow>
        <CCol xs="12" sm="12">
        <CCard>
            <CCardHeader>
              Agregar Contacto
            </CCardHeader>
            <CCardBody>
              <CForm className="was-validated">
              <CFormGroup>
                  <CLabel htmlFor="nombre">Nombre</CLabel>
                  <CInput className="form-control-warning" id="nombre" required value={name}  onChange={e => setName(e.target.value)}/>
                  <CInvalidFeedback className="help-block">
                    Ingresar un nombre
                  </CInvalidFeedback>
                  
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="telefono">Telefono</CLabel>
                  <CInput className="form-control-warning" id="telefono" required value={telephone} onChange={e => setTelephone(e.target.value)} />
                  <CInvalidFeedback className="help-block">
                    Ingresar un telefono
                  </CInvalidFeedback>
                  
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="email">Email</CLabel>
                  <CInput className="form-control-warning" id="email" required value={email} onChange={e => setEmail(e.target.value)}/>
                  <CInvalidFeedback className="help-block">
                    Ingresar un email
                  </CInvalidFeedback>
                  
                </CFormGroup>
		            <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Inline Radios</CLabel>
                  </CCol>
                  <CCol md="9">
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="inline-radio1" name="inline-radios" value="option1" checked={boolPro} onClick={() => {setType('Profesional'); setBoolPro(true); setBoolPer(false)}} />
                      <CLabel variant="custom-checkbox" htmlFor="inline-radio1">Profesional</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="inline-radio2" name="inline-radios" value="option2" checked={boolPer} onClick={() =>{ setType('Personal'); setBoolPer(true); setBoolPro(false)}} />
                      <CLabel variant="custom-checkbox" htmlFor="inline-radio2">Personal</CLabel>
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
	          <CCardFooter>
              <CButton type="submit" size="sm" color="primary" onClick={saveContact}><CIcon name="cil-scrubber" /> Guardar</CButton>
              
            </CCardFooter>
          </CCard>
        </CCol>
        
      </CRow>
      
    </>
  )
}

export default Edit
