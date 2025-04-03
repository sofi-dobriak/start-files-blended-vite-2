import Form from '../components/Form/Form';
import PhotosGallery from '../components/PhotosGallery/PhotosGallery';
import Button from '../components/Button/Button';
import Text from '../components/Text/Text';
import Loader from '../components/Loader/Loader';
import { useEffect, useState } from 'react';
import { getPhotos } from '../apiService/photos';

const Photos = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  const handleSearch = newQuery => {
    setQuery(newQuery.text);
    setImages([]);
    setPage(1);
    setError(false);
    setLoadMore(false);
  };

  useEffect(() => {
    if (!query) return;

    const fetchPhotos = async () => {
      try {
        setIsLoading(true);
        setError(false);

        const photos = await getPhotos(query, page);

        if (!photos || photos.total_results === 0) {
          setError(true);
          return;
        }
        setImages(prevImages => {
          return page === 1 ? photos.photos : [...prevImages, ...photos.photos];
        });
        setLoadMore(photos.total_results > page * 15);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, [query, page]);

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <Form onSubmit={handleSearch} />
      <PhotosGallery images={images} />
      {isLoading && <Loader />}
      {loadMore && <Button onClick={loadMoreImages}>Load more</Button>}
      {error && <Text>Not found images</Text>}
    </>
  );
};

export default Photos;
