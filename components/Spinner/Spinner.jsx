import { useState, useEffect } from 'react';
import './spinner.css'

const Spinner = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the timeout as needed

    return () => clearTimeout(timeout);
  }, []);

  return (
  
      <div className="spinner" style={{ display: isLoading ? 'block' : 'none' }}>
      {/* Your spinner's HTML structure here */}
      {/* <div className="spinner-inner"></div> */}
    </div>
   
  );
};

export default Spinner;