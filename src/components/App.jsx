<<<<<<< HEAD
import { useEffect, useState } from "react";
=======
import React, { useState, useEffect } from 'react';
>>>>>>> 34ee3366ee99e4656205e821ddc82497ec99dba2
import "./App.css";
import Searchbar from "../components/Searchbar/Searchbar";
import ImageGallery from "../components/ImageGallery/ImageGallery";
import Loader from "../components/Loader/Loader";
import ImageGalleryItem from "../components/ImageGalleryItem/ImageGalleryItem";
import Button from "../components/Button/Button";
import axios from "axios";
import Modal from "../components/Modal/Modal";
import styles from "./index.css";

<<<<<<< HEAD
function App() {
  const API_KEY = "40965996-859f4faa7c889b6c9b25dbc7d";
=======
const App = () => {
>>>>>>> 34ee3366ee99e4656205e821ddc82497ec99dba2
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [lastSearchQuery, setLastSearchQuery] = useState("");
<<<<<<< HEAD

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isModalOpen) toggleModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  useEffect(() => {
    setShowLoadMore(Math.ceil(total / 12) > 1);
  }, [total, results]);

  const fetchData = async function (query, page) {
=======
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
>>>>>>> 34ee3366ee99e4656205e821ddc82497ec99dba2
    try {
      setIsLoading(true);
      const res = await axios.get("https://pixabay.com/api/", {
        params: {
          q: query,
<<<<<<< HEAD
          page: page,
=======
          page,
>>>>>>> 34ee3366ee99e4656205e821ddc82497ec99dba2
          key: API_KEY,
          image_type: "photo",
          orientation: "horizontal",
          per_page: 12,
        },
      });
      setIsLoading(false);
<<<<<<< HEAD
      setResults((prevResults) => [...res.data.hits, ...prevResults]);
=======
      setResults([...res.data.hits, ...results]);
>>>>>>> 34ee3366ee99e4656205e821ddc82497ec99dba2
      setTotal(Math.ceil(res.data.totalHits / res.config.params.per_page));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (query) => {
    setLastSearchQuery(query);
    setResults([]);
    await fetchData(query);
<<<<<<< HEAD
    setPage(1);
  };
  const toggleModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(!isModalOpen);
  };

  const handleLoadMore = async () => {
    setPage((prevPage) => prevPage + 1);
    fetchData(lastSearchQuery, page + 1);
  };
=======
  };

  const toggleModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(!isModalOpen);
  };

  const handleLoadMore = async () => {
    await fetchData(lastSearchQuery);
    setPage((prevPage) => prevPage + 1);
  };

>>>>>>> 34ee3366ee99e4656205e821ddc82497ec99dba2
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
<<<<<<< HEAD
          className={styles.loadmore}
=======
          className={"load-more"}
>>>>>>> 34ee3366ee99e4656205e821ddc82497ec99dba2
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
<<<<<<< HEAD
}
=======
};
>>>>>>> 34ee3366ee99e4656205e821ddc82497ec99dba2

export default App;