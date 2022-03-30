import React, { useEffect } from 'react'

const Alert = ({show,message,type,removeAlert,items}) => {
  useEffect(()=>{
    const timeOut=setTimeout(()=>{
      removeAlert();
    },30000)
    return () =>clearTimeout(timeOut);
  },[items])
  return (
    <h3 className={`alert alert-${type}`}>{message}</h3>
  )
}

export default Alert