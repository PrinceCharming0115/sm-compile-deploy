// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;

/**
 * @title PostStorage
 * @dev Store, retrieve and delete post data from map storage.
 */
contract PostStorage {

    /**
    * @dev Store value in variable
     * @param input sha512 value to store
     * The sha512 value is a hash of a single unit of media + metadata content
     */
    struct Post {
        string[] data;
    }

    mapping (string  => Post) posts;
    event Anchored(string indexed id, uint256 indexed block, string[] postData);

    /**
    * @dev Check if a post with a provided id already exists
     * @param id Post Id
     * @return True/False of post data existence
     */
    function isExists(string memory id) public view returns(bool) {
       if(posts[id].data.length > 0) {
            return true;
        } 
        return false;
    }

    /**
    * @dev Add post data to the storage
     * @param id Post Id
     * @param postData Post data as bytes array
     */
    function store(string memory id, string[] memory postData) public {
        if (isExists(id)) {
            revert();
        }

        posts[id].data = postData;
        emit Anchored(id, block.number, postData);
    }

    /**
    * @dev Remove post data to the storage (marks as deleted)
     * @param id Post Id
     * @return True/False whether the post has been deleted
     */
    function remove(string memory id) public returns(bool) {
        if (!isExists(id)) {
            revert();
        }

        posts[id].data = new string[](0);
        return true;
    }

    /**
    * @dev Get a post data by its Id
     * @param id Post Id
     * @return postData
     */
    function retrieve(string memory id) public view returns (string[] memory postData){
        if (!isExists(id)) {
            revert();
        }

        return posts[id].data;
    }
}