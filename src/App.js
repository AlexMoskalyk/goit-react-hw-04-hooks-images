import React, { useState, useEffect } from "react";
import Button from "./Components/button/Button";
import ImageGallery from "./Components/imageGallery/ImageGallery";
import Searchbar from "./Components/searchbar/Searchbar";

import Modal from "./Components/modal/Modal";
import styles from "./App.module.css";
import Loader from "react-loader-spinner";
import fetchApi from "./services/API";

const App = () => {
  const [searchedText, setSearchedText] = useState("");
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState({});
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const getGalleryAppear = () => {
      setShowLoader(true);

      fetchApi(searchedText, page)
        .then((res) => {
          setGallery((prevState) => {
            return page === 1 ? [...res.hits] : [...prevState, ...res.hits];
          });

          scroll();
        })
        .catch((error) => setError(error))
        .finally(() => setShowLoader(false));
    };
    searchedText && getGalleryAppear();
  }, [searchedText, page, error]);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const onHandleSearchbarSubmit = (searchedText) => {
    setSearchedText(searchedText);
    setPage(1);
  };

  const onPictureClick = (largeImg) => {
    setLargeImageURL(largeImg);
    toggleModal();
  };

  const showBtnLoadMore = () => !gallery.length % 12;

  const handlePageIncr = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={onHandleSearchbarSubmit} />
      {gallery.length > 0 && (
        <ImageGallery
          onPictureClick={onPictureClick}
          searchedText={searchedText}
          gallery={gallery}
        />
      )}
      {showLoader && (
        <Loader
          type="ThreeDots"
          color="#6f03fc"
          height={80}
          width={80}
          className={styles.loader}
        />
      )}

      {gallery.length > 0 && !showLoader && showBtnLoadMore && (
        <Button galleryAppear={handlePageIncr} />
      )}

      {showModal && (
        <Modal closeModal={toggleModal}>
          <img src={largeImageURL} alt="#" />
        </Modal>
      )}
    </div>
  );
};

export default App;
