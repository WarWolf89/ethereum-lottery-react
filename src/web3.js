import Web3 from 'web3';

// Need to replace the built in provider from metamask to 1.0 version of web3.
const web3 = new Web3(window.web3.currentProvider);

export default web3;
