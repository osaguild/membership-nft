// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "./NFT.sol";

contract Manager {
  
    function addMember(
        address _nft,
        address _member
    ) public {
        NFT(_nft).mint(_member, "sample token uri");
    }
}
