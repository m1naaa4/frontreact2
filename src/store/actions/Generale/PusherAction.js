import PusherService from "../../../services/Pusher";

export const PusherAction = (data) =>{

    return (dispatch)=>{

        const pusher = new PusherService();    
        var channel = pusher.config.subscribe(data.channel);        
        channel.bind(data.event, function(res) {   
            console.log(res) 
            let j = res.id;
            let feed = res[j]
        
            dispatch({type:data.type, feed, res});        
        });
    }

}

