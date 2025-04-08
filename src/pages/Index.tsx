
import { Navigate } from 'react-router-dom';

const Index = () => {
  // Instead of using a useEffect hook for redirection,
  // we can use the Navigate component directly
  return <Navigate to="/" replace />;
};

export default Index;
