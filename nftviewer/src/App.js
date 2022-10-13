
import contractABI from "./contract.json";
import "./App.css";
import { ethers } from "ethers";
import { useState, useEffect } from "react";


function App() {
  const [state, setState] = useState(true);
  const [token, setToken] = useState([]);
 const[account,setAccount] = useState()
  const connectContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    window.ethereum.enable()
   const  signer = provider.getSigner()

    console.log('signer', signer);
    
  //   const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  // setAccount(accounts[0])
  // console.log('account:',accounts[0])
    const address = "0xC2984F58901a1cECAde22d8be4aA07e2Ee67f28d";
    const contract = new ethers.Contract(address, contractABI, signer);
    getMetaData(contract);
  };
  const getMetaData = async (contract) => {
    for (let i = 1; i < 3; i++) {
      const tokensURI = await contract.tokenURI(i);
      const getMetadata = await fetch(tokensURI);
      const metadata = await getMetadata.json();

      token.push({
        name: metadata.name,
        description: metadata.description,
        image: metadata.image,
        attributes: metadata.attributes,
      });
      console.log(setToken(token));
    }
    setToken(token);
    setState(false);
  };

  useEffect(() => {
    connectContract();
  }, []);

  return (
    <div className="content">
      {token.map((token, id) => (
        <div key={id}>
          <img style={{ width: "200", height: "200" }} src={token.image} />
          <div>
            <div className="name">
              <h1>{token.name}</h1>
            </div>
            <div className="name">
              <p>{token.description}</p> 
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
