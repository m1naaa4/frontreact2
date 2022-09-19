import React from "react";
import PT from "prop-types";
import {
  LightgalleryProvider,
  LightgalleryItem,
} from "react-lightgallery";


const imgs = [
  "https://images.unsplash.com/photo-1594818898109-44704fb548f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
  "https://images.unsplash.com/photo-1594818896795-35ad7bcf3c6a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
  "https://images.unsplash.com/photo-1594818896744-57eca4d47b07?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
  "https://images.unsplash.com/photo-1594818896744-57eca4d47b07?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
  "https://images.unsplash.com/photo-1594818897077-aec41f55241f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80",
  "https://images.unsplash.com/photo-1594818897077-aec41f55241f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80",
  "https://images.unsplash.com/photo-1594818897077-aec41f55241f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80",
  "https://images.unsplash.com/photo-1594818897077-aec41f55241f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80",
  "https://images.unsplash.com/photo-1594818897077-aec41f55241f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80",
];

const PhotoItem = ({ image, thumb, group }) => (
  <div style={{ maxWidth: "250px", width: "200px", padding: "5px" }}>
    <LightgalleryItem group={group} src={image} thumb={thumb}>
      <img src={image} style={{ width: "100%" }} />
    </LightgalleryItem>
  </div>
);

export default function ShowProjectMedia() {
  return (
    <div className="content">
      <div>
      <LightgalleryProvider
            // onBeforeOpen={() => console.info("onBeforeOpen")}
            // onAfterOpen={() => console.info("onAfterOpen")}
            // onSlideItemLoad={() => console.info("onSlideItemLoad")}
            // onBeforeSlide={() => console.info("onBeforeSlide")}
            // onAfterSlide={() => console.info("onAfterSlide")}
            // onBeforePrevSlide={() => console.info("onBeforePrevSlide")}
            // onBeforeNextSlide={() => console.info("onBeforeNextSlide")}
            // onDragstart={() => console.info("onDragstart")}
            // onDragmove={() => console.info("onDragmove")}
            // onDragend={() => console.info("onDragend")}
            // onSlideClick={() => console.info("onSlideClick")}
            // onBeforeClose={() => console.info("onBeforeClose")}
            // onCloseAfter={() => console.info("onCloseAfter")}
          >
            <h1>Media</h1>
            <div className="d-flex align-items-center flex-wrap">
              {imgs.map((p, idx) => (
                <PhotoItem key={idx} image={p} group="imgs" />
              ))}
            </div>
          </LightgalleryProvider>
      </div>
    </div>
  );
}