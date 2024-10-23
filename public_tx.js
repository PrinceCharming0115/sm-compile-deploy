const { Web3, Tx } = require('web3');
const fs = require('fs');
const path = require('path');

const host = "http://node-01.test.blockchain.dev.local:8545";
const web3 = new Web3(host);

const privateKey = "0x49f5221deb31fb8e474c1fb4850d3d4088c64384ffcdd4f97799b02a1a7dc839"
const account = web3.eth.accounts.privateKeyToAccount(privateKey);

const checkSumStorageContractJSONPath = path.resolve(__dirname, "./artifact/ChecksumStorage.json");
const checkSumStorageContractJSON = JSON.parse(fs.readFileSync(checkSumStorageContractJSONPath));
const checkSumStorageContractBin = checkSumStorageContractJSON.bytecode;

const deployContract = async () => {
    console.log('Creating transaction...');
    const tx = {
        chainId: 2001,
        nonce: await web3.eth.getTransactionCount(account.address),
        from: account.address,
        to: null,
        value: "0x00",
        data: "0x" + checkSumStorageContractBin,
        gasPrice: "0x99",
        gasLimit: "0x9999999"
    }
    console.log('Signing transaction...');
    const signedTx = await web3.eth.accounts.signTransaction(tx, account.privateKey);
    console.log('Sending transaction...');
    const pTx = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log('tx transactionHash: ' + pTx.transactionHash);
    console.log('tx contractAddress: ', pTx.contractAddress);
    // const bytecode = '0x' + checkSumStorageContractBin;

    // const accounts = await web3.eth.getAccounts();

    // const contract = new web3.eth.Contract(checkSumStorageContractAbi);
    // const deployTx = contract.deploy({
    //     data: bytecode,
    //     arguments: []
    // });

    // const deployedContract = await deployTx.send({
    //     chainId: 2001,
    //     from: accounts[0],
    //     to: null,
    //     gasPrice: "0x99",
    //     gasLimit: "0x99922"
    // });

    // console.log('Contract deployed at:', deployedContract.options.address);
}

deployContract().then(() => process.exit(0));