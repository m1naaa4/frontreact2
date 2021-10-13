import React from 'react'
import { useSelector } from 'react-redux';




export default function DashboardView(props) { 
    

    const authResponse = useSelector(state => state.adminAuth.user);
    return (
        <>  
            <div className="Page-Wrapper Profile">
                <div className="container">
                        salam
                </div>
            </div>
        </>
    
           
        
    )
}
