// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "./NFT.sol";

contract Manager {
    
    string private _uri = "https://gateway.pinata.cloud/ipfs/QmduodH45U6feSvYkh436u7eTnerjm7EjP1EvD4o4QMmmt";
  
    function addMember(
        address _nft,
        address _member
    ) public {
        NFT(_nft).mint(_member, _uri);
    }
}
