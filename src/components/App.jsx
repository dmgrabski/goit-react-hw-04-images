import React, { useState, useEffect } from 'react';
import "./App.css";
import Searchbar from "../components/Searchbar/Searchbar";
import ImageGallery from "../components/ImageGallery/ImageGallery";
import Loader from "../components/Loader/Loader";
import ImageGalleryItem from "../components/ImageGalleryItem/ImageGalleryItem";
import Button from "../components/Button/Button";
import axios from "axios";
import Modal from "../components/Modal/Modal";

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
    if (total !== 0 && (total !== prevTotal || results !== prevResults)) {
      setShowLoadMore(Math.ceil(total / 12) > 1);
    }
  }, [total, results]);

  const fetchData = async (query) => {
    try {
      setIsLoading(true);
      const res = await axios.get("https://pixabay.com/api/", {
        params: {
          q: query,
          page,
          key: API_KEY,
          image_type: "photo",
          orientation: "horizontal",
          per_page: 12,
        },
      });
      setIsLoading(false);
      setResults([...res.data.hits, ...results]);
      setTotal(Math.ceil(res.data.totalHits / res.config.params.per_page));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (query) => {
    setLastSearchQuery(query);
    setResults([]);
    await fetchData(query);
  };

  const toggleModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(!isModalOpen);
  };

  const handleLoadMore = async () => {
    await fetchData(lastSearchQuery);
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      {isLoading ? (
        <Loader />
      ) : (
        <ImageGallery>
          {results &&
            results.map((result) => (
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