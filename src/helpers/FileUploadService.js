import axios from "axios";


const upload = (data, onUploadProgress) => {
  console.log("here progress", data)
  const dataa = {
    profile_id : 'ggg',
    body       : 'post',
    action     : 'addPost',
    type       : 'type',
}
  let url = data.url;
  return axios.post(url, dataa, {
    onUploadProgress,
  });
};


export default {
  upload
};