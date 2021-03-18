import { useState, useEffect } from 'react'

const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        //run json-server command in the terminal: json-server --watch data/db.json --port 8000
        const abortCont = new AbortController(); //to stop a fetch

        fetch(url, { signal: abortCont.signal })
            .then(res => {
                return res.json()
            })
            .then(data => {
                setData(data)
                setIsPending(false)
                setError(null)
            })
            .catch(error => {
                if(error.name === 'AbortError') {
                    console.log('fetch aborted')
                } else {
                    setError(error.message)
                    setIsPending(false)
                }
            })

        return () => abortCont.abort()
    }, [url])

    return { data, isPending, error }
}

export default useFetch