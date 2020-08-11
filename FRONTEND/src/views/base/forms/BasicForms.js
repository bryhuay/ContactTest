import React , { useState, useEffect }from 'react'
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
const BasicForms = () => {

  let dataTable = []

  const [contacts, setContacts] = React.useState([])
  const [contactsAux, setContactsAux] = React.useState([])
  const [name, setName] = React.useState('')
  const [telephone, setTelephone] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [type, setType] = React.useState('')
  const [filter, setFilter] = React.useState('')

  const getContacts = async () =>{
    axios.get('contacts', {
      }
    )
    .then( res => {        
      console.log(res.data.data.contacts);
      let response =res.data.data.contacts;
      let dataAux=[]
      for(let i = 0; i < response.length ; i++){
        dataAux.push(response[i]);
        
      }
      setContactsAux(dataAux);
      
    })
    .catch( res => {

      console.log(res);
    })
  }

  
  useEffect(() => {
    getContacts();
  }, []);

  
  function deleteContact(id){
    console.log(id);
    const params = {
      method: 'post',
      url: 'contacts/delete',
      data: {contactId: id },
      headers: {}
    };
    console.log(params);
    axios(params) 
    .then( (response) => {
        console.log(response);
        getContacts();
    })
    .catch( (response) => {
      //handle error
      alert("Hubo un problema al eliminar, vuelve a intentarlo");
      //console.log(response);
    });
  }
  function filterData(value){
    setFilter(value)
    if(filter!=''){
      axios.get('contacts/like?nombre='+value, {
      }
    )
    .then( res => {        
      console.log(res.data.data.contacts);
      let response =res.data.data.contacts;
      let dataAux=[]
      for(let i = 0; i < response.length ; i++){
        dataAux.push(response[i]);
        
      }
      setContactsAux(dataAux);
      
    })
    .catch( res => {
  
      console.log(res);
    })
    }else{
      getContacts()
    }
    
  }

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
        url: 'contacts',
        data: {name: name,
          telephone: telephone,
          email: email,
          type: type },
        headers: {}
      };
      console.log(params);
      axios(params) 
      .then( (response) => {
          getContacts();
          setName('');
          setTelephone('');
          setEmail('');
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
                      <CInputRadio custom id="inline-radio1" name="inline-radios" value="option1" onClick={() => setType('Profesional')} />
                      <CLabel variant="custom-checkbox" htmlFor="inline-radio1">Profesional</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="inline-radio2" name="inline-radios" value="option2" onClick={() => setType('Personal')} />
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
      <CRow>
      <CCol xs="12" sm="12">
      <CCard>
            <CCardBody>
              <CForm className="">
              <CFormGroup>
                  <CLabel htmlFor="filter">Filtrar por nombre</CLabel>
                  <CInput className="form-control-warning" id="filter" required value={filter}  onChange={e =>{  filterData(e.target.value)}}/>
                  <CInvalidFeedback className="help-block">
                    Ingresar un nombre
                  </CInvalidFeedback>
                  
                </CFormGroup>
            </CForm>
            </CCardBody>
            </CCard>
            </CCol>
      </CRow>
      <CRow>
      {contactsAux.map(function(item, i){
          
          return <CCol xs="12" sm="12" md="6" key={item._id}>
          <CCard>
            <CCardHeader>
              {item.name}
              <div className="card-header-actions">
                <CBadge color={(item.type=='Personal'?"success":"info")} className="float-right">{item.type}</CBadge>
              </div>
            </CCardHeader>
            <CCardBody>
            <CIcon name="cil-phone" /> : {item.telephone}<br/>
            <CIcon name="cil-envelope-closed" /> : {item.email}
            </CCardBody>
            <CCardFooter>
            <Link to={"/contact/edit/"+item._id}><CButton type="submit" size="sm" color="warning" ><CIcon name="cil-scrubber" /> Editar</CButton></Link>
            -
            <CButton type="submit" size="sm" color="danger"  onClick={deleteContact.bind(null,item._id)}><CIcon name="cil-scrubber"  /> Eliminar</CButton>
            
            </CCardFooter>
          </CCard>
        </CCol>
        })}
       
      </CRow>
    </>
  )
}

export default BasicForms
