import React, { useEffect } from 'react'
import Player from 'video-react/lib/components/Player';
import $ from "jquery";
import YouTube from 'react-youtube';

import LightGallery from 'lightgallery/react';
// import styles
// import 'lightgallery/css/lg-fb-comment-box.css';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-video.css';

// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import SubHtml from './SubHtml';
import SubYoutube from './SubYoutube';
import SubVideo from './SubVideo';




export default function PostBody({ post }) {    
    useEffect(() => {
      var fixLeft = $('.Left-Side').offset()?.top + $('.Left-Side').outerHeight() - window.innerHeight;       // get initial position of the element
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
        </div>
        {/* <div id="comment-box" className="PostBody-Media PostBody-SingleImage"> */}
        <LightGallery
          appendSubHtmlTo= '.lg-item'
          addClass= 'fb-comments'
          mode= 'lg-fade'
          loop= 'true'
          // onHasVideo={true}
          plugins={[lgThumbnail, lgZoom, lgVideo]}
          download = {false}
          enableDrag = {false}
          enableSwipe = {false}
        >
          
          {
            post.media_link? (post.is_video ? (
                <SubVideo post={post}/>
                
                ) : (post.type === 'youtube' ?
                (
                  <SubYoutube post={post} />
                  // <YouTube videoId={post.media_link} opts={opts} />
                ):(
                  <SubHtml post={post} />
                ))) : ''
          }
          
        </LightGallery>
          
        {/* </div> */}
    </div>        

    )
}
