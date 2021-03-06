import React, { useEffect } from 'react'

const Alert = ({show,message,type,removeAlert,items}) => {
  useEffect(()=>{
    const timeOut=setTimeout(()=>{
      removeAlert();
    },3000)
    return () =>clearTimeout(timeOut);
  },[items,removeAlert])
  return (
    <h3 className={`alert alert-${type}`}>{message}</h3>
  )
}

export default Alert