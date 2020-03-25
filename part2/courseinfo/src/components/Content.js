import React from 'react'
import Part from './Part'

const Content = ({content}) => {
    return(  
        <div>
            {content.map((parte)=><Part key={parte.id} {...parte}/> )}
            <p><strong>total of {content.reduce((total,parte)=>total+parte.exercises,0)} exercises</strong></p>
        </div>
    )
}
export default Content 