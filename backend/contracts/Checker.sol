// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Checker {
    using Counters for Counters.Counter;
    Counters.Counter private _totalCount;
    struct Question {
        string text;
        bool answer;
        bool isActive;
    }
    mapping(uint256 => Question) private _questions;

    /*
     * @dev Set question text and answer
     * @param string text - The text of question
     * @param bool answer - The answer of question
     * @return uint256 id - The id of question
     */
    function setQuestion(string memory text, bool answer)
        external
        returns (uint256 id)
    {
        _totalCount.increment();
        uint256 _id = _totalCount.current();
        _questions[_id].text = text;
        _questions[_id].answer = answer;
        _questions[_id].isActive = true;

        return id;
    }

    /*
     * @dev Get active question
     * @param uint256 id - The id of the question to check
     * @return bool isCollectId - True if the question is active, false otherwise indluding does not exist
     * @return string data - The text of the question if the question is active, the reason of not active otherwise
     */
    function getQuestion(uint256 id)
        public
        view
        returns (bool isCollectId, string memory data)
    {
        if (_questions[id].isActive) {
            return (true, _questions[id].text);
        } else {
            return (false, "Question is not active");
        }
        //return (false, "Id is out of range");
    }

    /*
     * @dev Get count of questions
     * @return uint256 count - The count of questions
     */
    function getCountOfQuestions() public view returns (uint256 count) {
        uint256 _count = _totalCount.current();
        return _count;
    }

    /*
     * @dev Check answers of question
     * @param uint256[] ids - The id of the question to check
     * @param bool[] answers - The answer of the question
     * @return string message - The message about check answers
     */
    function checkAnswers(uint256[] memory ids, bool[] memory answers) public view returns (bool isCollect, string memory message) {
        // check1: your answers are correct
        for (uint256 i = 0; i < ids.length; i++) {
            if (_questions[ids[i]].isActive) {
                if (_questions[ids[i]].answer != answers[i]) {
                    return (false, "Your answers are incorrect");
                }
            }
        }
        // check2: all active questions are answered
        for (uint256 i = 1; i <= _totalCount.current(); i++) {
            if (_questions[i].isActive) {
                bool answered = false;
                for (uint256 j = 0; j < ids.length; j++) {
                    if (i == ids[j]) {
                        answered = true;
                        break; 
                    }
                }
                if (!answered) {
                    return (false, "You have not answered all active questions");
                }
            }
        }
        return (true, "All answers are correct");
    }
}
