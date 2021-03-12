import axios from "axios";


const upload = (data, onUploadProgress) => {
  console.log("here progress",onUploadProgress)
  return axios.post("/video/upload", data, {
    onUploadProgress,
  });
};


export default {
  upload
};