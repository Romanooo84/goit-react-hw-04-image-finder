import { useState, useEffect } from "react";
import { Searchbar } from "./Searchbar";
import { ImageGallery } from "./Imagegallery"
import { PaginationButton } from "./Button";
import { Modal } from "./Modal";
import { Loader } from './Loader';
import { Click } from "hooks/click";
import { Pagination } from "hooks/pagination";
import css from '../css/app.module.css'


export const App = () => {

  const [inputData, setInputData] = useState('')
  const [dataResponse, setDataResponse] = useState([])
  const [markup, setMarkup] = useState()
  const [page, setPage] = useState(1)
  const [picture, setPicture] = useState()
  const [modal, setModal] = useState(false)
  const [modalClass, setModalClass] = useState('visually-hidden')
  const [loaderClass, setLoaderClass] = useState('visually-hidden')

  const API = '42510468-83e1823d3ac9bdf29bf082bf9'

  
  const searchParams = new URLSearchParams({
    key: API,
    q: inputData,
    page: page,
    per_page: 10,
  });
  
  const onChange = (event) => {
    event.preventDefault();
    setInputData(event.target.value)
  }

  const onClick= (event) => Click(event,setLoaderClass,searchParams, setDataResponse, page)

  const onClickPag = (event) => Pagination (event, setLoaderClass, searchParams, setDataResponse, setLoaderClass)

  const toggleModal = (event) => {
    event.preventDefault()
    setModal(!modal)
    setPicture(event.target.parentNode.getAttribute('href'))
  }

  const escModal = (event) => {
      if (event.key === 'Escape') {
        setModalClass('visually-hidden')
    }
    }


  useEffect(() => {
    if (dataResponse.hits) {
      setPage(prevValue=>prevValue+1)
      setMarkup(dataResponse)
    }
    else {
    }
  }, [dataResponse]);
  
  useEffect(() => {
    if (modal) {
      setModalClass('modal-open')
    }
    else {
      setModalClass('visually-hidden')
    }
}, [modal]);

useEffect(() => {
  const handleEscape = (event) => {
    if(event.key==="Escape"){
      setModal(false)
    }
  };
  document.addEventListener('keydown', handleEscape);
  return () => {
    document.removeEventListener('keydown', handleEscape);
  };
}, [modal])
  
  return (
    <div className={css.mainDiv}>
      <Searchbar onChange={onChange} onClick={onClick} />
      <Loader loaderClass={loaderClass} />
      <ImageGallery markup={markup} toggleModal={toggleModal}  />
      <PaginationButton onClickPag={onClickPag} />
      <Modal modalClass={modalClass} picture={picture} escModal={escModal}/>
      
      {/*<ImageGalleryItem />
      */}
    </div>
  );
};
