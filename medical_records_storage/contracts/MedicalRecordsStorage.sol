pragma solidity >=0.4.21 <0.7.0;


contract MedicalRecordsStorage {
    address payable public owner;

    address[] public choices;
    mapping(address => uint256) public choiceVotes;
    uint256 public choicesThreshold;

    address[] public voters;
    mapping(address => bool) public voted;
    uint256 public votesCasted;
    uint256 public votingThreshold;

    address public winner;

    constructor(uint256 _choicesThreshold, uint256 _votingThreshold) public {
        owner = msg.sender;
        choicesThreshold = _choicesThreshold;
        votingThreshold = _votingThreshold;
        votesCasted = 0;
    }

    function destroy() public restricted {
        selfdestruct(owner);
    }

    modifier restricted() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    modifier votingThresholdReached() {
        require(
            votingThreshold <= votesCasted,
            "Threshold of number of votes being casted is not reached."
        );
        _;
    }
    modifier choicesThresholdReached() {
        require(
            choices.length >= choicesThreshold,
            "The threshold for choices has not been reached."
        );
        _;
    }
    modifier choiceExists(address _choice) {
        bool exists = false;
        for (uint256 i = 0; i < choicesCount(); i++) {
            if (choices[i] == _choice) {
                exists = true;
                break;
            }
        }
        require(exists, "You are not present in list of allowed voters");
        _;
    }
    modifier voterExists() {
        bool exists = false;
        for (uint256 i = 0; i < votersCount(); i++) {
            if (voters[i] == msg.sender) {
                exists = true;
                break;
            }
        }
        require(exists, "You are not present in list of allowed voters");
        _;
    }
    modifier canVote() {
        require(
            voted[msg.sender] == false,
            "You have already vote and can not vote again"
        );
        _;
    }

    function addChoice(address _choice) public restricted {
        choices.push(_choice);
        choiceVotes[_choice] = 0;
    }

    function choicesCount() public view returns (uint256) {
        return choices.length;
    }

    function addVoter(address _voter) public restricted {
        voters.push(_voter);
        voted[_voter] = false;
    }

    function votersCount() public view returns (uint256) {
        return voters.length;
    }

    function vote(address _choice)
        public
        voterExists
        canVote
        choicesThresholdReached
        choiceExists(_choice)
    {
        voted[msg.sender] = true;
        votesCasted += 1;
        choiceVotes[_choice] += 1;
        uint256 maxVotes = 0;
        if (votesCasted >= votingThreshold) {
            for (uint256 i = 0; i < choicesCount(); i++) {
                if (choiceVotes[choices[i]] > maxVotes) {
                    winner = choices[i];
                }
            }
        }
    }

    function whoisWinner()
        public
        view
        votingThresholdReached
        returns (address)
    {
        return winner;
    }
}
