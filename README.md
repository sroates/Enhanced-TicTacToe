# Tic-Tac-Toe Game

This project is a feature-enhanced version of the classic Tic-Tac-Toe game built using React. It is based on the React tutorial for creating a basic Tic-Tac-Toe game but includes several added functionalities to improve the user experience.

## Features

1. **Dynamic Board Creation**:
   - The board is generated using two loops, making it scalable and flexible instead of hardcoding the squares.

2. **Move History with Sorting**:
   - A toggle button allows users to sort the move history in ascending or descending order.

3. **Winning Highlight**:
   - When a player wins, the three squares that form the winning line are highlighted.

4. **Draw Detection**:
   - If the board is full and no player wins, a message declaring a draw is displayed.

5. **Move Location**:
   - The location (row, col) of each move is displayed in the move history, helping users track the game progress.

6. **Player Countdown Timer**:
   - Each player has a countdown timer. If the timer runs out, the turn automatically switches to the next player.

7. **Play Again Button**:
   - A "Play Again" button resets the game to its initial state, allowing users to start fresh without reloading the page.



## Game Logic

- Players alternate turns, with "X" going first.
- If a player wins, the game highlights the winning line and displays the winner.
- If all squares are filled and no one wins, the game declares a draw.
- A countdown timer switches turns if a player takes too long to move.
- The game can be reset at any time using the "Play Again" button.
