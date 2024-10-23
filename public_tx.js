const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

const host = "http://node-01.test.blockchain.dev.local:8545";
const web3 = new Web3(host);

const privateKey = "0xf63b82b1808bc6f068217ba91c0a331089110faad4f3aaa79e3c983f4e3dc258"
const account = web3.eth.accounts.privateKeyToAccount(privateKey);

const checkSumStorageContractJSONPath = path.resolve(__dirname, "/artifact/ChecksumStorage.json");
const checkSumStorageContractJSON = JSON.parse(fs.readFileSync(checkSumStorageContractJSONPath));
const checkSumStorageContractAbi = checkSumStorageContractJSON.abi;
const checkSumStorageContractBinPath = path.resolve(__dirname, "ChecksumStorage.bin");
const checkSumStorageContractBin = fs.readFileSync(checkSumStorageContractBinPath);

const txnCount = await web3.eth.getTransactionCount(account.address);

const rawTxOptions = {
    nonce: web3.utils.numberToHex(txnCount),
    from: account.address,
    to: null,
    value: "0x00",
    data: "0x" + checkSumStorageContractBin,
    gasPrice: "0x10",
    gasLimit: "0x24A22"
};

console.log('Creating transaction...');
const tx = new Tx(rawTxOptions);
console.log('Signing transaction...');
tx.sign(privateKey);
console.log('Sending transaction...');
var serializedTx = tx.serialize();
const pTx = await web3.eth.sendSignedTransaction(
    "0x" + serializedTx.toString("hex").toString("hex")
);
console.log('tx transactionHash: ' + pTx.transactionHash);
console.log('tx contractAddress: ', pTx.contractAddress);