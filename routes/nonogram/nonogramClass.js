export class nonogramClass{
    constructor(size) {
        this.size = size;
        this.board;
        for(let i = 0; i < size; i++){
            this.board[i] = new Array(size).fill(null).map(() => new Array(size).fill(0));
        }
        this.solutionBoard = this.generateSolutionBoard(size);
        this.clueRows = this.generateClueRows(this.solutionBoard);
        this.clueCols = this.generateClueCols(this.solutionBoard);
        this.FilledCells = 0;
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
        
        for(let i = 0; i < board.length; i++)
        {
            let clueMark = 0;
            let clueString = "";
            for(let j = 0; j < board[i].length; j++)
            {
                if (board[i][j] === 1) 
                {
                    clueMark++;
                } 
                else if (board[i][j] === 0 && clueMark > 0) 
                {
                    clues.push(clueMark.toString() + " ");
                    clueMark = 0;
                }
            }
            clues.push(clueString.trim());
        }
    }

    generateClueCols(board) {
        const clues = [];
        
        for(let j = 0; j < board.length; j++)
        {
            let clueMark = 0;
            let clueString = "";
            for(let i = 0; i < board[j].length; i++)
            {
                if (board[i][j] === 1) 
                {
                    clueMark++;
                } 
                else if (board[i][j] === 0 && clueMark > 0) 
                {
                    clues.push(clueMark.toString() + " ");
                    clueMark = 0;
                }
            }
            clues.push(clueString.trim());
        }
    }

    determineFilledRow(row)
    {
        let completeRow = 0;
        for(let i = 0; i < this.size; i++)
        {
            if(1 === this.solutionBoard[row][i])
            {
                completeRow++;
            }
        }

        for(let i = 0; i < this.size; i++)
        {
            if(this.board[row][i] === 2 || this.board[row][i] === 0)
            {
                continue;
            }
            else if(this.board[row][i] === 1 && this.solutionBoard[row][i] === 1)
            {
                completeRow--;
            }
            else
            {
                return false;
            }
        }

        if(completeRow === 0)
        {
            for(let i = 0; i < this.size; i++)
            {
                this.board [row][i] = this.solutionBoard[row][i];
            }
            return true;
            
        }
        else
        {
            return false;
        }
    }

    determineFilledCol(col)
    {
        let completeCol = 0;
        for(let i = 0; i < this.size; i++)
        {
            if(1 === this.solutionBoard[i][col])
            {
                completeCol++;
            }
        }

        for(let i = 0; i < this.size; i++)
        {
            if(this.board[i][col] === 2 || this.board[i][col] === 0)
            {
                continue;
            }
            else if(this.board[i][col] === 1 && this.solutionBoard[i][col] === 1)
            {
                completeCol--;
            }
            else
            {
                return false;
            }
        }

        if(completeCol === 0)
        {
            for(let i = 0; i < this.size; i++)
            {
                this.board [i][col] = this.solutionBoard[i][col];
            }
            return true;
        }
        else
        {
            return false;
        }
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