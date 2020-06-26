import {useEffect, useState} from "react";
import axios from "axios";

axios.defaults.headers.common = {
    'Accept': 'application/json',
    'Authorization':  window.localStorage.getItem('user-token')
};
export default function SearchingProject  (query, pageNumber) {

    const [loading, setLoading] = useState(true)
    const [error, setError]     = useState(false)
    const [projects, setProject]     = useState([])
    const [hasMore, setHasMore]     = useState(false)

    useEffect(()=>{
        setProject([])
    },[query])
    useEffect(() => {
        setLoading(true)
        setError(false)
        let sector  = query['sector']
        let search  = query['search']
        let zone    = query['zone']
        let financement = query['financement']
        let cancel
        let action  = 'getallProjects'
        axios({
            method      : 'POST',
            // method: 'GET',
            url         : 'http://api.projectauth.test/api/project/handleaction',
            // url         : 'http://openlibrary.org/search.json',
            cancelToken : new axios.CancelToken(c => cancel = c),
            params      : {page: pageNumber, search: search,sector: sector,financement: financement,zone: zone, action : action}
            // params      : {q: query, page: pageNumber}
        }).then(resp => {
            // console.log(resp.data.result)
            setProject(prevProjects =>{
                return [...prevProjects, ...resp.data.result.data]
                // return [...prevProjects, ...resp.data.docs.map(b => b.title)]
            })
            setHasMore(resp.data.result.current_page)
            // setHaseMore(resp.data.docs.length > 0)
            setLoading(false)
                console.log(resp.result)
        }).catch(err => {
            if(axios.isCancel(err)) return
            setError(true)
        })
        return () => cancel()
    },[query, pageNumber]
  )
    return {loading,error, projects, hasMore}
}