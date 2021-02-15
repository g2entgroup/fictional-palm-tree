import { useState, useCallback, useEffect } from "react";
import { Web3Provider } from "@ethersproject/providers";
// import Web3 from "web3";
import Web3Modal from "web3modal";
//import WalletConnectProvider from "@walletconnect/web3-provider";
import Arkane from "@arkane-network/web3-arkane-provider";

// Enter a valid infura key here to avoid being rate limited
// You can get a key for free at https://infura.io/register
const INFURA_ID = "ff5a5c50d1e649bdb777f80813747e3d";

const NETWORK_NAME = "rinkeby";

function useWeb3Modal(config = {}) {
  const [provider, setProvider] = useState();
  const {
    autoLoad = true,
    infuraId = INFURA_ID,
    NETWORK = NETWORK_NAME,
  } = config;

const providerOptions = {
  /* See Provider Options Section */
  arkane: {
    package: Arkane, //required
    options: {
      clientId: 'Creative-Platform',
      rpcUrl: `https://rinkeby.infura.io/v3/${infuraId}`, //optional
      environment: 'staging', //optional, production by default
      signMethod: 'POPUP' //optional, REDIRECT by default
      // bearerTokenProvider: () => 'obtained_bearer_token', //optional, default undefined
      // //optional: you can set an identity provider to be used when authenticating
      // authenticationOptions: {
      //   idpHint: 'google'
      // }
    }
  }
}
  
  // Web3Modal also supports many other wallets.
  // You can see other options at https://github.com/Web3Modal/web3modal
  const web3Modal = new Web3Modal({
    network: NETWORK,
    cacheProvider: true,
    providerOptions,
  });

  // const connectProvider = await web3Modal.connectTo(Arkane);
  // const web = new Web3(provider);
  

  // Arkane.createArkaneProviderEngine(options).then(provider => {
  //   web3 = new Web3(provider);
  // });

  // Open wallet selection modal.
  const loadWeb3Modal = useCallback(async () => {
    const newProvider = await web3Modal.connect();
    setProvider(new Web3Provider(newProvider));
  }, [web3Modal]);

  const logoutOfWeb3Modal = useCallback(
    async () => {
      web3Modal.clearCachedProvider();
      window.location.reload();
    },
    [web3Modal],
  );

  //If autoLoad is enabled and the the wallet had been loaded before, load it automatically now.
  useEffect(() => {
    if (autoLoad && web3Modal.cachedProvider && typeof provider === "undefined") {
      loadWeb3Modal();
    }
  }, [provider, autoLoad, loadWeb3Modal, web3Modal.cachedProvider]);

  return [provider, loadWeb3Modal, logoutOfWeb3Modal];
}

export default useWeb3Modal;
