import React, { Component}  from 'react'
import Employee from '../Employee/Employee'

class MainContainer extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return(
            <div>
                <Employee/>
            </div>
        )
    }
}
export default MainContainer