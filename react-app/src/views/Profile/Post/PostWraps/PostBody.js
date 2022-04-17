import React, { useEffect } from 'react'
import Player from 'video-react/lib/components/Player';
import $ from "jquery";
import YouTube from 'react-youtube';
import { LightgalleryItem } from "react-lightgallery";




export default function PostBody({ post }) {    
  useEffect(() => {
    var fixLeft = $('.Left-Side').offset()?.top + $('.Left-Side').outerHeight() - window.innerHeight;       // get initial position of the element
        $(window).scroll(function() {                  // assign scroll event listener
            var currentScroll = $(window).scrollTop(); // get current position
            if (currentScroll >= fixLeft) {           // apply position: fixed if you
                var mtStatic = ($('.Dadupa-Header').outerHeight() + 10);
                $('.Left-Side').css({                      // scroll to that element or below it
                    position: 'fixed',
                    bottom: '-'+(mtStatic+15)+'px',
                    width: '255',
                });
                $('.Right-Side').css({                      // scroll to that element or below it
                      position: 'fixed',
                      bottom: '-'+mtStatic+'px',
                      width: '255',
                });
            } else {                                   // apply position: static
                $('.Left-Side').css({                      // if you scroll above it
                    position: 'static'
                });
                $('.Right-Side').css({                      // if you scroll above it
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

    const PhotoItem = ({ image,group }) => (
        <div>
            <LightgalleryItem group={group} src={image}>
              <img src={image} width="100%" />
            </LightgalleryItem>
        </div>
    );

    const VideoItem = ({ src,group }) => (
      <div>
          <LightgalleryItem group={group} src={src}>
            <img src={src.replace("mp4", "jpg")} width="100%" />
          </LightgalleryItem>
      </div>
     );
     const YoutubeItem = ({ src,group }) => (
      <div>
          <LightgalleryItem group={group} src={'//www.youtube.com/watch?v='+src+'&autoplay=1'}>
            <img src={'https://img.youtube.com/vi/'+src+'/maxresdefault.jpg'} width="100%" />
          </LightgalleryItem>
      </div>
  );
    return (
        
      <div className="PostBody">
        <div className="PostBody-Text">
          {post.body}
          {
            post.media_link? (post.is_video ? (
              <VideoItem  src={post.media_link} group={post.id}></VideoItem>
                ) : (post.type === 'youtube' ?
                (<YoutubeItem  src={post.media_link} group={post.id}></YoutubeItem>):(<PhotoItem image={post.media_link} group={post.id}></PhotoItem>))):''
          }
        </div>
    </div>        

    )
}
