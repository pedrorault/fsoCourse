import React from 'react'

const Notification = ({isError,message}) => {
    if(message===undefined || message === '') {return null}
    const base = (color) => {
      return(
        {
          borderRadius: 10,
          backgroundColor: "#b3bab5",
          border: "3px solid",
          borderColor: color,
          color: color
        }
      )
    }
    const color = (isError) ? "red" : "green"
    return(
      <div style={base(color)}>
       <p>{message}</p>
      </div>
    )
  }

export default Notification