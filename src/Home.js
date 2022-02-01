import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBTypography , MDBBtn, MDBTable, MDBTableHead, 
  MDBTableBody, MDBIcon, MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter, } from 'mdb-react-ui-kit';
import {makeStyles} from '@material-ui/core';
import React,{useState , useEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import { addContactInitiate, deleteContactInitiate, getContactInitiate,
  getContactsInitiate, updateContactInitiate, reset } from './redux/action';
const initialState = {
    name:'',
    contact:'',
    email:'',
    address:''
}

const useStyles = makeStyles((theme)=>({
    root:{
        marginTop:70,
        margin:"auto",
        padding:"15px",
        maxWidth:'500px',
        alignContent:'center',
        "g > *":{
            margin:theme.spacing(1),
            width:'45ch'
        }
    }
}))

const Home = () => {
    const classes = useStyles();
    const [state, setState] = useState(initialState);
    const [editMode, seteditMode] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const [userId, setuserId] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const {name , contact , email ,address}= state;
    const dispatch = useDispatch();
    const {contacts, contact: singleContact} = useSelector(state => state.data);
 
useEffect(()=>{
  dispatch(getContactsInitiate())
},[]);

useEffect(()=>{
  if(singleContact){
    setState({...singleContact})
  }
},[singleContact]);

const deleteContact = (id)=>{
  if(window.confirm("Are you sure you want to delete contact ? ")){
    dispatch(deleteContactInitiate(id));
  }
}

const modalBody = (
  <div className='row'>

  <div className='col-sm-4'> Name</div>
  <div className='col-sm-8'> {singleContact.name}</div>
  <div className='col-sm-4'> Email</div>
  <div className='col-sm-8'> {singleContact.email}</div>
  <div className='col-sm-4'> Contact</div>
  <div className='col-sm-8'> {singleContact.contact}</div>
  <div className='col-sm-4'> Adress</div>
  <div className='col-sm-8'> {singleContact.address}</div>





  </div>
)

const handleModel =(id)=>{
  setModalOpen(true);
  dispatch(getContactInitiate(id))
}

const handleCloseModal =()=>{
  setModalOpen(false);
  dispatch(reset());
}
const editContact = (id)=>{
seteditMode(true);
setuserId(id);
dispatch(getContactInitiate(id))
}

  const  handleInputChange =(e)=>{
let {name,value} = e.target;
setState({...state,[name]:value})
  };

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(!name || !contact || !email || !address){
      setErrorMsg("please fill all inputs")
    }else{

    
    if(!editMode){
      dispatch(addContactInitiate(state))
      setState({name:'',contact:'',email:'',address:""});
      setErrorMsg("");
    }else{
      dispatch(updateContactInitiate (userId, state));
      setuserId(null);
      seteditMode(false);
      setState({name:'',contact:'',email:'',address:""});
      setErrorMsg("");
    }
  }
  };
  return (
    <MDBContainer fluid>
        <MDBRow>
        <MDBCol md='8'>
          <MDBTable className="table table-bordered " style={{marginTop:"100px"}}>

          
       
          <MDBTableHead className="table-dark ">
          <tr>
          <th scope="col">No</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Contact</th>
          <th scope="col">Address</th>
          <th scope="col">Action</th>



          </tr> 
          </MDBTableHead>
          {contacts && contacts.map((item,index)=> (
            <MDBTableBody key= {index}>
             
                   <tr>
                   <th scope="row">{index + 1 }</th>
                   <td>{item.name }</td>
                   <td>{item.email}</td>
                   <td>{item.contact}</td>
                   <td>{item.address}</td>
                   <td className='d-flex justify-content-evenly'>
                   <MDBBtn className='btn btn-primary m-1' tag="a"  
                      onClick={()=> editContact(item.id)}>
                          Edit
                     </MDBBtn>
                     <MDBBtn className='btn btn-danger m-1' tag="a"  
                      onClick={()=> deleteContact(item.id)}>
                          Delete
                     </MDBBtn>
                     <MDBBtn className='m-1 '  color='secondary' tag="a"  
                      onClick={()=> handleModel(item.id)}>
                          View
                     </MDBBtn>
                     
                   </td>
                 </tr>

                 {modalOpen && (
                     <MDBModal show={modalOpen}  tabIndex='-1'>
                     <MDBModalDialog>
                       <MDBModalContent>
                         <MDBModalHeader>
                           <MDBModalTitle>Contact Info </MDBModalTitle>
                           <MDBBtn className='btn-close' color='none' onClick={handleCloseModal}></MDBBtn>
                         </MDBModalHeader>
                         <MDBModalBody> {modalBody}</MDBModalBody>
               
                         <MDBModalFooter>
                           <MDBBtn color='secondary' onClick={handleCloseModal}>
                             Close
                           </MDBBtn>
                           
                         </MDBModalFooter>
                       </MDBModalContent>
                     </MDBModalDialog>
                   </MDBModal>
                 )}
                 </MDBTableBody>
          ))}
           
        
        </MDBTable>
        </MDBCol>
        <MDBCol md='4'>
          <form onSubmit={handleSubmit} className={classes.root}>
              <MDBTypography className='text-start' variant='h4'>
                {!editMode ? "Add Contact" : "Update Contact"}
              </MDBTypography>
              {errorMsg && <h6 style={{color:"red"}}>{errorMsg}</h6>}
            <MDBInput
            label="Name"
            value={name || ""}
            name='name'
            type='text'
            onChange={handleInputChange}
            />
            <br  />
            <MDBInput
            label="Email"
            value={email || ""}
            name='email' 
            type='email'
            onChange={handleInputChange}
            />
            <br  /> 
            <MDBInput
            label="Contact"
            value={contact || ""}
            name='contact'
            type='number'
            onChange={handleInputChange}
            />
            <br  /> 
            <MDBInput
            label="Address"
            value={address || ""}
            name='address'
            type='address'
            onChange={handleInputChange}
            />
            <br  />
            <MDBBtn color={!editMode ? 'success':'warning'} type='submit'>
            {!editMode ? "Submit":"Update"}
            </MDBBtn>
          </form>
        </MDBCol>
        
      </MDBRow>
    </MDBContainer>

  );
};

export default Home;
