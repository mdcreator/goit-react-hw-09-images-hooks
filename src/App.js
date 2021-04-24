import { useEffect, useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Loader from './components/Loader';
import Button from './components/Button';
// import Modal from './components/Modal';
import Api from './services/api';

import errorImage from './components/error.jpg';
import cover from './components/cover.jpg';
import Container from './components/Container';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function App() {
  const [gallery, setGallery] = useState([]);
  const [query, setQuery] = useState(null);
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(null);

  const handleSearchForm = query => {
    setQuery(query);
    setPage(1);
    setGallery([]);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    setStatus(Status.PENDING);
    Api.fetchImage(query, page)
      .then(data => {
        setTotal(data.total);
        if (data.total < 1) {
          return Promise.reject(
            new Error(`Не удалось найти картинки по запросу ${query}`),
          );
        }
        setGallery(prev => [...prev, ...data.hits]);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [page, query]);

  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  });

  return (
    <Container>
      <Searchbar onSubmit={handleSearchForm} />
      {/* Вариант №1 */}
      {(status === Status.IDLE || status === Status.REJECTED) && (
        <div>
          <p>
            {(status === Status.IDLE && 'Нужно проверить... 😜') ||
              (status === Status.REJECTED && error.message)}
          </p>
          <img
            src={
              (status === Status.IDLE && cover) ||
              (status === Status.REJECTED && errorImage)
            }
            alt=""
          />
        </div>
      )}

      {(status === Status.RESOLVED || status === Status.PENDING) && (
        <>
          <ImageGallery gallery={gallery} />
          {total > gallery.length && <Button onClick={handleLoadMore} />}
          {status === Status.PENDING && <Loader />}
        </>
      )}
    </Container>
  );
}
