const prod = {
    urls: {
        'front' : 'https://test.dadupa.com',
       // 'api' : 'https://gatwaytest.dadupa.com/api'
        'api'   : `${process.env.REACT_APP_API_PROD}`
    },
    facebook:{
        appId      : '2711133325873185'
    }
};

export default prod;