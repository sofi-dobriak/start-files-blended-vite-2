import PuffLoader from 'react-spinners/PuffLoader';

const override = {
  display: 'block',
  margin: '0 auto',
};

const Loader = ({ loading }) => {
  return (
    <>
      <PuffLoader
        color="#6979f8"
        loading={loading}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </>
  );
};

export default Loader;
