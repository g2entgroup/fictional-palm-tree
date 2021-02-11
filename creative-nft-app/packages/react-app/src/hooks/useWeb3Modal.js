import { useCallback, useEffect, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
//import "./node_modules/@arkane-network/arkane-connect/dist/connect.js";

// Enter a valid infura key here to avoid being rate limited
// You can get a key for free at https://infura.io/register
const INFURA_ID = "ff5a5c50d1e649bdb777f80813747e3d";

const NETWORK_NAME = "rinkby";

function useWeb3Modal(config = {}) {
  const [provider, setProvider] = useState();
  const [autoLoaded, setAutoLoaded] = useState(false);
  const { autoLoad = true, infuraId = INFURA_ID, NETWORK = NETWORK_NAME } = config;

  // Web3Modal also supports many other wallets.
  // You can see other options at https://github.com/Web3Modal/web3modal
  const web3Modal = new Web3Modal({
    network: NETWORK,
    cacheProvider: true,
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId,
        },
      },
    },
  });

  // const options = {
  //   clientId: 'Creative-Platform',
  //   rpcUrl: 'https://kovan.infura.io/v3/'+ infuraId, //optional
  //   environment: 'staging', //optional, production by default
  //   signMethod: 'POPUP', //optional, REDIRECT by default
  //   bearerTokenProvider: () => 'obtained_bearer_token', //optional, default undefined
  //   //optional: you can set an identity provider to be used when authenticating
  //   authenticationOptions: {
  //     idpHint: 'google'
  //   }
  // };
  // Arkane.createArkaneProviderEngine(options).then(provider => {
  //     web3 = new Web3(provider);
  // });

  // Open wallet selection modal.
  const loadWeb3Modal = useCallback(async () => {
    const newProvider = await web3Modal.connect();
    setProvider(new Web3Provider(newProvider));
  }, [web3Modal]);

  const logoutOfWeb3Modal = useCallback(
    async function () {
      await web3Modal.clearCachedProvider();
      window.location.reload();
    },
    [web3Modal],
  );

  // If autoLoad is enabled and the the wallet had been loaded before, load it automatically now.
  useEffect(() => {
    if (autoLoad && !autoLoaded && web3Modal.cachedProvider) {
      loadWeb3Modal();
      setAutoLoaded(true);
    }
  }, [autoLoad, autoLoaded, loadWeb3Modal, setAutoLoaded, web3Modal.cachedProvider]);

  return [provider, loadWeb3Modal, logoutOfWeb3Modal];
}

export default useWeb3Modal;
