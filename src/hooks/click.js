export const Click= (event, setLoaderClass, searchParams, setDataResponse, page) => {
  event.preventDefault();
  setLoaderClass('loader');
  searchParams.set('page', 1);
  let url = `https://pixabay.com/api/?${searchParams}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
        setDataResponse(data);
    });
  setLoaderClass('visually-hidden');
  searchParams.set('page', page);
};