// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "./NFT.sol";
import "./Checker.sol";
import "hardhat/console.sol";

contract Manager {
    string private _uri =
        "https://gateway.pinata.cloud/ipfs/QmduodH45U6feSvYkh436u7eTnerjm7EjP1EvD4o4QMmmt";

    function addMember(
        address _nft,
        address _checker,
        address _member
    ) public {
        require(Checker(_checker).checkAnswers(msg.sender), "Answer is wrong");
        NFT(_nft).mint(_member, _uri);
    }
}
