import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default function Api() {
  return (
    <Loader
      type="BallTriangle"
      color="#00BFFF"
      height={80}
      width={80}
      timeout={3000} //3 secs
    />
  );
}
