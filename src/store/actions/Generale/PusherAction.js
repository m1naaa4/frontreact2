import PusherService from "../../../services/Pusher";

export const PusherAction = (data, id) =>{

    return (dispatch)=>{

        const pusher = new PusherService();    
        // var channel = pusher.config.subscribe(data.channel);        
        // channel.bind(data.event, function(res) {   
        //     let j = res.id;
        //     let feed = res[j]
        
        //     dispatch({type:data.type, feed:feed, res:res});        
        // });

        
        // var channeel = pusher.echo.subscribe('updates')
        
        // channel.bind('created', this.updateNotifications)
        // channel.bind('updated', this.updateNotifications)
        // channel.bind('deleted', this.updateNotifications)
        // channel.bind('App\\Events\\PushNotification', this.updateNotifications)
        
        // var channel = pusher.config.subscribe('private-Message.User.'+id);
        // channel.bind('NewMessage', function(res) {
        //     console.log(res)
        //   });

        
    //     pusher.echo.private('Message.User.'+id)
    //     .listen('NewMessage',(e)=>{
    //       console.log('pmessage sent', e);

    //   })
        // channel.bind('NewMessage', function(res) {  
        //     console.log(res)
        //   });

        
        pusher.echo.private('Message.User.'+id)
        .listen('NewMessage',(e)=>{
          console.log('pmessage sent', e);

      })


        console.log("THIS CHANNEL: ", 'Message_User.'+id)

    }

}

