import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const Redirect: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const { urls, incrementClicks } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!code) return;
    const urlObj = urls.find(u => u.shortUrl === code);
    if (urlObj) {
      incrementClicks(urlObj.id);
      window.location.href = urlObj.originalUrl;
    } else {
      navigate('/');
    }
  }, [code, urls, incrementClicks, navigate]);

  return null;
};

export default Redirect;
