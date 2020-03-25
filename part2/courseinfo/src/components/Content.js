import React from 'react'
import Part from './Part'

const Content = ({content}) => {
    return(  
        <div>
            {content.map((parte)=><Part key={parte.id} {...parte}/> )}
        </div>
    )
}
export default Content 