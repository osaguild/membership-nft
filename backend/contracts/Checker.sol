// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Checker {
    
    function getQuestion(uint256 _id) public pure returns (string memory question) {
        if (_id == 0) {
            return "Treat everyone with respect. Absolutely no harassment, witch hunting, sexism, racism, or hate speech will be tolerated.";
        } else if ( _id == 1) {
            return "No spam or self-promotion (server invites, advertisements, etc) without permission from an admin. This includes DMing fellow members.";
        }
    }

    function checkAnswer(uint256 _id, bool _answer) public pure returns (bool result) {
        if (_id == 0) {
            if (_answer == true) {
                return true;
            } else {
                return false;
            }
        } else if ( _id == 1) {
            if (_answer == true) {
                return true;
            } else {
                return false;
            }
        }
    }
}
