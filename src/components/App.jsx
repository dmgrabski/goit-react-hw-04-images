import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
import Loader from "./Loader";
import ImageGalleryItem from "./ImageGalleryItem";
import Button from "./Button";
import Modal from "./Modal";
import "./App.css";

const App = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [lastSearchQuery, setLastSearchQuery] = useState("");
  const API_KEY = "40965996-859f4faa7c889b6c9b25dbc7d";

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isModalOpen) {
        toggleModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  useEffect(() => {
    setShowLoadMore(Math.ceil(total / 12) > 1);
  }, [total, results]);

  const fetchData = useCallback(async (query, currentPage) => {
    try {
      setIsLoading(true);
      const res = await axios.get("https://pixabay.com/api/", {
        params: {
          q: query,
          page: currentPage,
          key: API_KEY,
          image_type: "photo",
          orientation: "horizontal",
          per_page: 12,
        },
      });
      setResults((prevResults) => [...prevResults, ...res.data.hits]);
      setTotal(Math.ceil(res.data.totalHits / res.config.params.per_page));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  }, [API_KEY]);

  const handleSubmit = async (query) => {
    setLastSearchQuery(query);
    setResults([]);
    setPage(1);
    await fetchData(query, 1);
  };

  const toggleModal = useCallback((image) => {
    setSelectedImage(image);
    setIsModalOpen(!isModalOpen);
  }, [isModalOpen]);

  const handleLoadMore = async () => {
    await fetchData(lastSearchQuery, page + 1);
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      {isLoading ? (
        <Loader />
      ) : (
        <ImageGallery>
          {results.map((result) => (
            <ImageGalleryItem
              onClick={() => toggleModal(result.largeImageURL)}
              key={result.id}
              src={result.webformatURL}
              description={result.description}
            />
          ))}
        </ImageGallery>
      )}
      {showLoadMore && (
        <Button
          nextPage={handleLoadMore}
          className={"load-more"}
          type="button"
          label="Load more"
        />
      )}
      {isModalOpen && (
        <Modal
          imageURL={selectedImage}
          closeModal={toggleModal}
          onClick={toggleModal}
        />
      )}
    </>
  );
};

export default App;

