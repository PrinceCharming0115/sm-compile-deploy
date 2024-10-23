const { Web3, Tx } = require('web3');
const fs = require('fs');
const path = require('path');

const host = "http://node-01.test.blockchain.dev.local:8545";
const web3 = new Web3(host);

const privateKey = "0xf63b82b1808bc6f068217ba91c0a331089110faad4f3aaa79e3c983f4e3dc258"
const account = web3.eth.accounts.privateKeyToAccount(privateKey);

const checkSumStorageContractJSONPath = path.resolve(__dirname, "./artifact/ChecksumStorage.json");
const checkSumStorageContractJSON = JSON.parse(fs.readFileSync(checkSumStorageContractJSONPath));
const checkSumStorageContractAbi = checkSumStorageContractJSON.abi;
const checkSumStorageContractBinPath = path.resolve(__dirname, "ChecksumStorage.bin");
const checkSumStorageContractBin = fs.readFileSync(checkSumStorageContractBinPath);

const deployContract = async () => {
    // const txnCount = await web3.eth.getTransactionCount(account.address);
    // console.log('Creating transaction...');
    // const tx = {
    //     chainId: 2001,
    //     once: txnCount,
    //     from: account.address,
    //     to: null,
    //     value: "0x00",
    //     data: "0x" + checkSumStorageContractBin + checkSumStorageContractConstructorInit,
    //     gasPrice: "0x99",
    //     gasLimit: "0x99922"
    // }
    // console.log('Signing transaction...');
    // const signedTx = await web3.eth.accounts.signTransaction(tx, account.privateKey);
    // console.log('Sending transaction...');
    // const pTx = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    // console.log('tx transactionHash: ' + pTx.transactionHash);
    // console.log('tx contractAddress: ', pTx.contractAddress);
    const bytecode = '0x' + checkSumStorageContractBin;

    const contract = new web3.eth.Contract(checkSumStorageContractAbi);
    const deployTx = contract.deploy({
        data: bytecode,
        arguments: []
    });

    const deployedContract = await deployTx.send({
        chainId: 2001,
        from: accounts[0],
        to: null,
        gasPrice: "0x99",
        gasLimit: "0x99922"
    });

    console.log('Contract deployed at:', deployedContract.options.address);
}

deployContract().then(() => process.exit(0));