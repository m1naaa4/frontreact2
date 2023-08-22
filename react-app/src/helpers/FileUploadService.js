import axios from "axios";


const upload = (data, onUploadProgress) => {
  let url = data.url;
  return axios.post(url, data, {
    onUploadProgress,
  });
};


export default {
  upload
};