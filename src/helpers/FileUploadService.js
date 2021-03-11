import http from "./http-common";


const upload = (data, onUploadProgress) => {

  return http.post("/video/upload", data, {
    onUploadProgress,
  });
};


export default {
  upload
};