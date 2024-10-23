// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title ChecksumStorage
 * @dev Store & retrieve sha512 value from storage variable.
 * The sha512 hash is later fetched for users to validate BC of a single unit of media + metadata
 */
contract ChecksumStorage {
    bytes checksum = new bytes(64);
    event Anchored(bytes indexed hash, uint256 indexed block);

    /**
     * @dev Store value in variable
     * @param input sha512 value to store
     * The sha512 value is a hash of a single unit of media + metadata content
     */
    function store(bytes memory input) public {
        require(input.length == 64); // Sha3 512 hash expected. Don't accept any more or less than 512
        checksum = input;
        emit Anchored(checksum, block.number);
    }

    /**
     * @dev Return value 
     * @return value of 'checksum'
     */
    function retrieve() public view returns (bytes memory){
        return checksum;
    }
}