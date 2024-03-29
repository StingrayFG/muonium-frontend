import axios from 'axios';

const BookmarkService = {
  handleCreate: async (userData, folder) => {
    return new Promise( async function(resolve, reject) {  
      const headers = { 'Authorization': `Bearer ${userData.accessToken}`};
      const body = { userUuid: userData.userUuid, folderUuid: folder.uuid };
      
      await axios.post(process.env.REACT_APP_BACKEND_URL + '/bookmark/create', body, {headers})
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
    })  
  },

  handleGet: async (userData) => { 
    return new Promise( async function(resolve, reject) {
      const headers = { 'Authorization': `Bearer ${userData.accessToken}`};
      const body = { userUuid: userData.userUuid };
      
      await axios.post(process.env.REACT_APP_BACKEND_URL + '/bookmark/get', body, {headers})
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
    })
  },

  handleDelete: async (userData, folder) => {
    return new Promise( async function(resolve, reject) {
      const headers = { 'Authorization': `Bearer ${userData.accessToken}` };
      const body = { userUuid: userData.userUuid, folderUuid: folder.uuid };

      await axios.post(process.env.REACT_APP_BACKEND_URL + '/bookmark/delete', body, {headers})
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
    })
  },
}

export default BookmarkService; 