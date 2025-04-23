export class nonogramClass{
    constructor(size) {
        this.size = size;
        this.board = new Array(size);
        for(let i = 0; i < size; i++){
            this.board[i] = new Array(size).fill(null).map(() => new Array(size).fill(0));
        }
        this.solutionBoard = this.generateSolutionBoard(size);
        this.clueRows = this.generateClueRows(this.solutionBoard);
        this.clueCols = this.generateClueCols(this.solutionBoard);
        this.FilledCells = 0;
        console.log(this.solutionBoard);
    }

    generateSolutionBoard(size) {
        const board = new Array(size).fill(null).map(() => new Array(size).fill(0));
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                board[i][j] = Math.random() < 0.5 ? 1 : 2;
                if(board[i][j] === 1) {
                    this.FilledCells++;
                }
            }
        }
        return board;
    }

    generateClueRows(board) {
        const clues = [];

        for (let i = 0; i < board.length; i++) {
            let clueMark = 0;
            const rowClues = [];
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === 1) {
                    clueMark++;
                } else if (clueMark > 0) {
                    rowClues.push(clueMark);
                    clueMark = 0;
                }
            }
            if (clueMark > 0) rowClues.push(clueMark);
            clues.push(rowClues.join(" "));
        }

        return clues;
    }

    generateClueCols(board) {
        const clues = [];

        for (let j = 0; j < board.length; j++) {
            let clueMark = 0;
            const colClues = [];
            for (let i = 0; i < board.length; i++) {
                if (board[i][j] === 1) {
                    clueMark++;
                } else if (clueMark > 0) {
                    colClues.push(clueMark);
                    clueMark = 0;
                }
            }
            if (clueMark > 0) colClues.push(clueMark);
            clues.push(colClues.join(" "));
        }

        return clues;
    }

    determineFilledRow(row) {
        for (let i = 0; i < this.size; i++) {
            if (this.board[row][i] === 1) {   
                if (this.board[row][i] !== this.solutionBoard[row][i]) {
                    return false;
                }   
            }
        }
        return true;
    }

    determineFilledCol(col) {
        for (let i = 0; i < this.size; i++) {
            if( this.board[i][col] === 1) {
                if (this.board[i][col] !== this.solutionBoard[i][col]) {
                    return false;
                }
            }
        }
        return true;
    }

    determineWin()
    {
        let gameFilledCells = 0;
        for(let i = 0; i < this.size; i++)
        {
            for(let j = 0; j < this.size; j++)
            {
                if(this.board[i][j] !== this.solutionBoard[i][j])
                {
                    return false;
                }
                if(this.board[i][j] === 1)
                {
                    gameFilledCells++;
                }
            }
        }

        if(gameFilledCells === this.FilledCells)
        {
            return true;
        }
    }
};