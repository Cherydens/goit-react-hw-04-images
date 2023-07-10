import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';

import pixabayApiService from 'services/pixabayApiService';

import { Container } from './App.styled';

const IMAGES_PER_PAGE = 12;

export const App = () => {
  const [searchQuerry, setSearchQuerry] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [page, setPage] = useState(1);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (!searchQuerry) {
      return;
    }
    const getImages = async () => {
      try {
        setShowLoader(true);
        const { totalHits, hits } = await pixabayApiService({
          searchQuerry,
          page,
          IMAGES_PER_PAGE,
        });

        if (!totalHits) {
          toast.error(
            `Sorry, there are no images matching your search query: ${searchQuerry}. Please try again. `
          );
          return;
        }

        setSearchResults(prev => [...prev, ...hits]);
        setTotalHits(totalHits);
      } catch ({ message }) {
        toast.error(`Ooops! Something went wrong: "${message}"`);
        setShowLoader(false);
      } finally {
        setShowLoader(false);
      }
    };
    getImages();
  }, [page, searchQuerry]);

  const onFormSubmit = newSearchQuerry => {
    if (searchQuerry === newSearchQuerry) {
      toast.error(
        `Sorry, your previos search query was "${searchQuerry}". Please try again.`
      );
      return;
    }
    setSearchQuerry(newSearchQuerry);
    setSearchResults([]);
    setTotalHits(0);
    setPage(1);
  };

  const onLoadMoreBtnClick = () => {
    setPage(prev => prev + 1);
  };

  const totalPages = Math.ceil(totalHits / IMAGES_PER_PAGE);
  const showImageGallery = !!searchResults.length;
  const showLoadMoreBtn = !showLoader && totalPages > 1 && page < totalPages;

  return (
    <Container>
      <Searchbar onSubmit={onFormSubmit} />
      {showImageGallery && <ImageGallery searchResults={searchResults} />}
      {showLoader && <Loader />}
      {showLoadMoreBtn && <Button onBtnClick={onLoadMoreBtnClick} />}
      <Toaster position="top-right" reverseOrder={false} />
    </Container>
  );
};
