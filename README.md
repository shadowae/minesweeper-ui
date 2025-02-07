# Minesweeper UI

A Minesweeper game UI built with React. This project renders a grid-based Minesweeper game where cells can be empty, display a number (indicating nearby mines), or contain a mine. The UI supports cell revealing on left click and flagging on right click, and is fully tested with Vitest and React Testing Library.

## Features

- **Dynamic Grid Rendering:** Configure grid size and mine positions
- **Cell Interactions:** Left-click to reveal cells and right-click to flag/unflag cells
- **Game Over and Win Conditions:** Display explosion icons, confetti animation, and a modal for restarting the game
- **Automated Testing:** Comprehensive test suite using Vitest and React Testing Library
- **Responsive Layout:** Grid-based design that adjusts based on game configuration

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- npm (or Yarn)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/minesweeper-ui.git
cd minesweeper-ui
```

2. Install the dependencies:
```bash
npm install
# or
yarn install
```

## Running the Application

To start the development server:
```bash
npm start
# or
yarn start
```

Then open `http://localhost:3000` in your browser.

## Running Tests

To run the test suite:
```bash
npm test
# or
yarn test
```

This command runs Vitest in watch mode and executes all tests defined in the project.

## Building for Production

To create a production build:
```bash
npm run build
# or
yarn build
```

The optimized build will be available in the `build` directory.

## Project Structure

```
minesweeper-ui/
├── node_modules/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   └── Gameboard.tsx
│   ├── utils/
│   │   └── getMap.tsx
│   ├── types/
│   │   └── cellStatus.ts
│   ├── App.tsx
│   ├── index.tsx
│   └── __tests__/
│       └── Gameboard.test.tsx
├── package.json
├── tsconfig.json
└── README.md
```

## Future Enhancements

- Backend Integration: Store and retrieve game history for signed-in players
- Full Game Logic: Implement cascading reveals, win/loss conditions, and score tracking
- UI Enhancements: Add animations, transitions, and a mobile-friendly interface

## Contributing

Contributions are welcome. Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License.

## Contact

For questions or feedback, please reach out at satishk002work@gmail.com.
