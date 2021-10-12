import React from 'react'
import { useSelector } from 'react-redux';




export default function DashboardView(props) { 
    

    const authResponse = useSelector(state => state.adminAuth.user);
    return (
        <>  
            <div class="Page-Wrapper Profile">
                <div class="container">
                        salam
                </div>
            </div>
        </>
    
           
        
    )
}
