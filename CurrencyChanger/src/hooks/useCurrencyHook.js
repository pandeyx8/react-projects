import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});
  useEffect(() => {
    let isMounted = true;

    const fetchCurrencyInfo = async () => {
      try {
        const response = await fetch(`https://latest.currency-api.pages.dev/v1/currencies/${currency}.json`);
        if (!response.ok) {
          throw new Error(`Failed to fetch currency data: ${response.status}`);
        }

        const json = await response.json();
        if (isMounted) {
          setData(json[currency] || {});
        }
      } catch (error) {
        if (isMounted) {
          setData({});
        }
      }
    };

    fetchCurrencyInfo();

    return () => {
      isMounted = false;
    };
  }, [currency])

  return data;
}

export default useCurrencyInfo;