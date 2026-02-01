import { useState, useEffect } from 'react';
import * as Network from 'expo-network';

interface NetworkStatus {
  isConnected: boolean;
  isWifi: boolean;
  isLoading: boolean;
}

export function useNetworkStatus(): NetworkStatus {
  const [status, setStatus] = useState<NetworkStatus>({
    isConnected: true,
    isWifi: false,
    isLoading: true,
  });

  useEffect(() => {
    let isMounted = true;

    const checkNetwork = async () => {
      try {
        const networkState = await Network.getNetworkStateAsync();
        if (isMounted) {
          setStatus({
            isConnected: networkState.isConnected ?? true,
            isWifi: networkState.type === Network.NetworkStateType.WIFI,
            isLoading: false,
          });
        }
      } catch (error) {
        // Default to connected if check fails
        if (isMounted) {
          setStatus({
            isConnected: true,
            isWifi: false,
            isLoading: false,
          });
        }
      }
    };

    checkNetwork();

    // Poll network status every 10 seconds
    const interval = setInterval(checkNetwork, 10000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return status;
}
