export const Pagination = (event, setLoaderClass, searchParams, setDataResponse) => {
    event.preventDefault();
    setLoaderClass('loader')
    let url = `https://pixabay.com/api/?${searchParams}`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            setDataResponse(prevValue => {
                let newData = { ...prevValue }
                for (let i = 0; i < data.hits.length; i++) {
                    newData.hits.push(data.hits[i])
                }
                setLoaderClass('visually-hidden')
                return newData
            })
  
        })
}