const fs = require("fs").promises;
const solc = require("solc");

async function main() {
    const checkSumSourceCode = await fs.readFile("ChecksumStorage.sol", "utf8");
    const checkSumCompileResult = compile(checkSumSourceCode, "ChecksumStorage");
    const checkSumArtifact = JSON.stringify({ abi: checkSumCompileResult.abi, bytecode: checkSumCompileResult.bytecode }, null, 2);
    await fs.writeFile("artifact/ChecksumStorage.json", checkSumArtifact);

    const postStorageSourceCode = await fs.readFile("PostStorage.sol", "utf8");
    const postStorageResult = compile(postStorageSourceCode, "PostStorage");
    const postStorageArtifact = JSON.stringify({ abi: postStorageResult.abi, bytecode: postStorageResult.bytecode }, null, 2);
    await fs.writeFile("artifact/PostStorage.json", postStorageArtifact);
}

function compile(sourceCode, contractName) {
    const input = {
        language: "Solidity",
        sources: { main: { content: sourceCode } },
        settings: { 
            outputSelection: { "*": { "*": ["abi", "evm.bytecode"] } },
            evmVersion: "berlin"
        }
    };

    const output = solc.compile(JSON.stringify(input));
    const artifact = JSON.parse(output).contracts.main[contractName];
    
    return {
        abi: artifact.abi,
        bytecode: artifact.evm.bytecode.object
    };
}

main().then(() => process.exit(0));