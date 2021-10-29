const prod = {
    urls: {
        'front' : 'https://test.dadupa.com',
       // 'api' : 'https://gatwaytest.dadupa.com/api'
        'api'   : `${process.env.REACT_APP_API_URL}`
    },
    facebook:{
        appId      : `${process.env.FACEBOOK_APP_ID}`
    }
};

export default prod;