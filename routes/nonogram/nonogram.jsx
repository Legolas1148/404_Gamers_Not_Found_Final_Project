import { nonogramClass } from './nonogramClass.js';
import GameBoard from '/components/GameBoard.jsx';
import GameControls from '/components/GameControls.jsx';

function Nonogram()
{
    return (
        <div className="nonogram">
            <h1 className="mainHeader">Nonogram</h1>
            <div className="gameContainer">
                <div className="gameBoard">
                    {GameBoard}
                </div>
                <div className="controls">
                    {GameControls}
                </div>
            </div>
        </div>
    );
}

export default Nonogram;