import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from '../routes/HomePage';
import Rps from '../routes/rock-paper-scissors/rps';
import TicTacToeGame from '../routes/tic-tac-toe/TicTacToe';
import Nonogram from '../routes/nonogram/Nonogram';
import '../styling/nav.css'; 

function navigation(){
    return (
    <Router>
      <nav>
        <ul>
          <li><Link to="routes">Home</Link></li>
          <li><Link to="routes/rock-paper-scissors">Rock Paper Scissors</Link></li>
          <li><Link to="routes/tic-tac-toe">Tic Tac Toe</Link></li>
          <li><Link to="routes/nonogram">Nonogram</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path = "routes" element={<HomePage/>}/>
        <Route path = "routes/rock-paper-scissors" element={<Rps/>}/>
        <Route path = "routes/tic-tac-toe" element={<TicTacToeGame/>}/>
        <Route path = "routes/nonogram" element={<Nonogram/>}/>
      </Routes>
    </Router>
    )
}

export default navigation;