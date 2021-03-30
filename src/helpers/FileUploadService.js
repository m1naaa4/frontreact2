import axios from "axios";


const upload = (data, onUploadProgress) => {
  console.log("here progress", data)
  
  let url = data.url;
  return axios.post(url, data, {
    onUploadProgress,
  });
};


export default {
  upload
};