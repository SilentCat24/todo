import React, { useState } from 'react';
import './index.css';
import Alert from './components/Alert';
import List from './components/List';
import { v4 as uuidv4 } from 'uuid';


const App = () => {
  const [name,setName]=useState('');
  const [list,setList]=useState([]);
  const [isEditing,setIsEditing]=useState(false);
  const [editId,setEditId]=useState(null);
const [alert,setAlert]=useState({
  show:false,
  message:'',
  type:'',
});
const submitHandler =(e)=>{
  e.preventDefault();
  if(!name){
    //display alert
    showAlert(true,'field cant be empty', 'danger');
  }else if(name && isEditing){
  const newList=list.map((item)=>{
    if(item.id===editId){
      return {
        ...item,
        title:name
      };}
      else{
        return item;
      }
    }
  );
  setList(newList);
  setIsEditing(false);
  setEditId(null)
  
    showAlert(true,'grocery updated','success')
  }else{
    // deal with adding grocery
    const newGrocery={id:uuidv4(),title:name};
    setList([...list,newGrocery]);
    setName('');
    showAlert(true,'grocery updated','success')

    // show add alert
  }

};
const showAlert=(show,message,type)=>{
  setAlert({
    show:show,
    message:message,
    type:type
  })
};
const removeAlert=()=>{
  setAlert({...alert,show:false} );
}
const removeItem=(id)=>{
  const updatedList=list.filter(item=>item.id!==id)
  setList(updatedList)
  //deal with removing item
  showAlert(true,'grocery removed', 'danger');
}
const editItem=(id)=>{
  const itemToEdit=list.find((item)=>item.id===id)
  setIsEditing(true);
  setEditId(id);
  setName(itemToEdit.title)

  showAlert(true,'updated', 'success');
}

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit ={submitHandler}>
        {alert.show && <Alert {...alert} removeAlert={removeAlert} items={list}/>}
      <h3>Add grocery items</h3>

<div className='form-control'>
    <input type="text"
    className='grocery'
    placeholder="ex:-Mangoose"
    value={name}
    onChange={(e)=>setName(e.target.value)}
    />
<button type="submit" className='submit-btn'>Submit</button>
</div> 
</form>
{/* {list.length>0 && */}
<div className='grocery-container'>
  <List items={list} removeItem={removeItem} editItem={editItem}/>
  <button className='clear-btn'
  onClick={()=>{setList([]);showAlert(true,'All items removed','danger')}}>
    
    Clear items</button>

  
</div>


</section>
  )
}

export default App
