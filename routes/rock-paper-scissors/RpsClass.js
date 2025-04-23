export class RockPaperScissors {
  constructor(username) {
    this.username = username;
    this.score = {
      user: 0,
      cpu: 0,
    };
    this.gameHistoryLog = [];
  }

  generateCPUResponse() {
    const acceptedValues = ["rock", "paper", "scissors"];
    const randomIndexNumber = Math.floor(Math.random() * 3);
    return acceptedValues[randomIndexNumber];
  }

  determineWinner(userSelection, cpuSelection) {
    if (userSelection === cpuSelection) {
      return "tie";
    } else if (
      (userSelection === "paper" && cpuSelection === "rock") ||
      (userSelection === "scissors" && cpuSelection === "paper") ||
      (userSelection === "rock" && cpuSelection === "scissors")
    ) {
      return "win";
    } else {
      return "lose";
    }
  }

  play(userSelection) {
    const cpuSelection = this.generateCPUResponse();
    const result = this.determineWinner(userSelection, cpuSelection);

    if (result === "win") {
      this.score.user++;
    }
    if (result === "lose") {
      this.score.cpu++;
    }

    this.gameHistoryLog.push(
      `${this.username} selected ${userSelection}. CPU selected ${cpuSelection}: ${this.username} ${result}s`
    );
  }
}