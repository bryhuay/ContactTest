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

  

    
  


  const [collapsed, setCollapsed] = React.useState(true)
  const [showElements, setShowElements] = React.useState(true)
  
  return (
    <>
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
