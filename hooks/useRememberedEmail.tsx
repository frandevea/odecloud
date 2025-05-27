import { useEffect, useState } from 'react';
import { getRememberedEmail } from '@/lib/storage';

export function useRememberedEmail() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRememberedEmail().then((saved) => {
      if (saved) setEmail(saved);
      setLoading(false);
    });
  }, []);

  return { email, setEmail, loading };
}
