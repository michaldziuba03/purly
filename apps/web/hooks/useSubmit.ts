import { useState } from 'react';
import { useSWRConfig } from 'swr';

export function useSubmit(
  apiCall: (...args: any[]) => Promise<any>,
  key?: string
) {
  const { mutate } = useSWRConfig();
  const [isSending, setIsSending] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<any>();

  const submit = async (...args: any[]) => {
    let result;
    setIsSending(true);
    try {
      result = await apiCall(...args);
      setData(result);
      setError(undefined);
      if (key) {
        mutate(key);
      }
    } catch (err) {
      setData(undefined);
      setError(err);
    } finally {
      setIsSending(false);
    }

    return result;
  };

  return { submit, data, isSending, error };
}
