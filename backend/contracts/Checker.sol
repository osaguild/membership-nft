// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract Checker {
    using Counters for Counters.Counter;
    Counters.Counter private _totalCount;
    struct Question {
        string text;
        bool answer;
        bool isActive;
    }
    mapping(uint256 => Question) private _questions;
    struct Answer {
        uint256[] ids;
        bool[] answers;
    }
    mapping(address => Answer) private _answers;
    address private _manager;

    constructor(address manager_) {
        _manager = manager_;
    }

    /*
     * @dev Only manager can call this function.
     */
    modifier onlyManager() {
        require(msg.sender == _manager, "Only manager can call this function");
        _;
    }

    /*
     * @dev Validate answer modifier
     * @param uint256[] ids - The id of the question to check
     * @param bool[] answers - The answer of the question
     */
    modifier validateAnswers(uint256[] memory ids, bool[] memory answers) {
        // check1: Format check
        require(
            ids.length != 0 && ids.length == answers.length,
            "Format check error"
        );

        // check2: Answer check
        for (uint256 i = 0; i < ids.length; i++) {
            require(_questions[ids[i]].isActive, "Answer check error");
        }

        // check3: Active answer check
        for (uint256 i = 1; i <= _totalCount.current(); i++) {
            if (_questions[i].isActive) {
                bool answered = false;
                for (uint256 j = 0; j < ids.length; j++) {
                    if (i == ids[j]) {
                        answered = true;
                        break;
                    }
                }
                require(answered, "Active answer check error");
            }
        }
        _;
    }

    /*
     * @dev Set question text and answer
     * @param string text - The text of question
     * @param bool answer - The answer of question
     */
    function setQuestion(string memory text, bool answer) external {
        _totalCount.increment();
        uint256 _id = _totalCount.current();
        _questions[_id].text = text;
        _questions[_id].answer = answer;
        _questions[_id].isActive = true;

        emit QuestionAdded(msg.sender, _id);
    }

    /*
     * @dev Get active question
     * @param uint256 id - The id of the question to check
     * @return string - The text of the question if the question is active, the reason of not active otherwise
     */
    function getQuestion(uint256 id) public view returns (string memory) {
        require(
            _questions[id].isActive,
            "Question is not active or out of range"
        );
        return (_questions[id].text);
    }

    /*
     * @dev Get count of questions
     * @return uint256 - The count of questions
     */
    function getCountOfQuestions() public view returns (uint256) {
        uint256 _count = _totalCount.current();
        return _count;
    }

    /*
     * @dev Set answer of question
     * @param uint256[] ids - The id of the question to set answer
     * @param bool[] answers - The answer of the question
     */
    function registAnswers(uint256[] memory ids, bool[] memory answers)
        external
        validateAnswers(ids, answers)
    {
        // regist answers
        _answers[msg.sender].ids = ids;
        _answers[msg.sender].answers = answers;

        emit AnswerAdded(msg.sender);
    }

    /*
     * @dev Check answers is collected
     * @param address target - The address of target user
     * @return bool - The result of check
     */
    function checkAnswers(address target)
        external
        view
        onlyManager
        returns (bool)
    {
        for (uint256 i = 0; i < _answers[target].ids.length; i++) {
            if (
                _questions[_answers[target].ids[i]].answer !=
                _answers[target].answers[i]
            ) return false;
        }
        return true;
    }

    /*
     * @dev Already answered 
     * @param address target - The address of target user
     * @return bool - The result of check
     */
    function isAnswered(address target)
        external
        view
        returns (bool)
    {
        if (_answers[target].ids.length == 0) return false;
        else return true;
    }

    event QuestionAdded(address sender, uint256 id);

    event AnswerAdded(address sender);
}
