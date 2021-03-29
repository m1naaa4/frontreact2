import axios from "axios";


const upload = (data, onUploadProgress) => {
  console.log("here progress",onUploadProgress)
  return axios.post("/profile/upload", data, {
    onUploadProgress,
  });
};


export default {
  upload
};