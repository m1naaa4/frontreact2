import React, { useEffect } from 'react'
import Player from 'video-react/lib/components/Player';
import $ from "jquery";
import YouTube from 'react-youtube';




export default function PostBody({ post }) {    
  useEffect(() => {
    var fixLeft = $('.Left-Side').offset().top + $('.Left-Side').outerHeight() - window.innerHeight;       // get initial position of the element
        $(window).scroll(function() {                  // assign scroll event listener
            var currentScroll = $(window).scrollTop(); // get current position
            if (currentScroll >= fixLeft) {           // apply position: fixed if you
                $('.Left-Side').css({                      // scroll to that element or below it
                    position: 'fixed',
                    bottom: '15px',
                    width: '255',
                });
            } else {                                   // apply position: static
                $('.Left-Side').css({                      // if you scroll above it
                    position: 'static'
                });
            }
        });
      });
      const opts = {
        height: '300',
        width: '100%',
        // playerVars: {
        //   // https://developers.google.com/youtube/player_parameters
        //   autoplay: 1,
        // },
      };
    return (
        
      <div className="PostBody">
        <div className="PostBody-Text">
          {post.body}
          {
            post.media_link? (post.is_video ? (
                <Player width="100%" height="100%"
                    playsInline
                    poster="/assets/poster.png"
                    src={post.media_link}
                />
                ) : (<img width="100%" height="300" src={post.media_link} alt="Project"/>)): 
                (post.type === 'youtube' ?
                <YouTube videoId={post.media_link} opts={opts} />:'')
          } 
        </div>
    </div>        

    )
}
