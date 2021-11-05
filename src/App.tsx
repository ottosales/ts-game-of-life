import React, { useState, useCallback, useRef } from 'react';
import produce from 'immer';

const nRows = 40;
const nColumns = 50;

const operations = [
	// like a clock, starting at 12
	[0, -1], // up
	[1, -1], // up right
	[1, 0], // right
	[1, 1], // down right
	[0, 1], // down
	[-1, 1], // down left
	[-1, 0], // left
	[-1, -1], // up left
]

const App: React.FC = () => {
	const [grid, setGrid] = useState(() => {
		const rows = [];
		for (let i = 0; i < nRows; i++) {
			rows.push(Array.from(Array(nColumns), () => 0));
		}

		return rows;
	});

	const [running, setRunning] = useState(false)

	const runningRef = useRef(running);
	runningRef.current = running;

	const runSimulation = useCallback(() => {
		if (!runningRef.current) {
			return;
		}

		setGrid(grid => {
			return produce(grid, gridCopy => {
				for (let i = 0; i < nRows; i++) {
					for (let j = 0; j < nColumns; j++) {
						let neighbors = 0;
						operations.forEach(([x, y]) => {
							const newI = i + x;
							const newJ = j + y;
							if (newI >= 0 && newI < nRows && newJ >= 0 && newJ < nColumns) {
								neighbors += grid[newI][newJ] ? 1 : 0;
							}
						})

						if (neighbors < 2 || neighbors > 3) {
							gridCopy[i][j] = 0;
						} else if (grid[i][j] === 0 && neighbors === 3) {
							gridCopy[i][j] = 1;
						}
					}
				}
			});
		});

		setTimeout(runSimulation, 75);
	}, []);

	return <div style={{
		display: 'flex',
		justifyContent: 'space-around',
		marginTop: '1%'
	}}>
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			flexWrap: 'wrap',
		}}>
			<button onClick={() => {
				setRunning(!running);
				if (!running) {
					runningRef.current = true;
					runSimulation();
				}
			}}> {running ? 'Stop Sim' : 'Run Sim'} </button>
			{/* <button onClick={() => alert('clicked!')}> button text </button> */}
			{/* <button onClick={() => alert('clicked!')}> button text </button> */}
		</div>

		<div style={{
			display: 'grid',
			gridTemplateColumns: `repeat(${nColumns}, 20px)`
		}}>
			{grid.map((rows, i) => rows.map((col, j) => <div
				key={`${i}-${j}`}
				onClick={() => {
					const newGrid = produce(grid, gridCopy => {
						gridCopy[i][j] = grid[i][j] === 1 ? 0 : 1;
					})
					setGrid(newGrid)
				}}
				style={{
					width: 20,
					height: 20,
					backgroundColor: grid[i][j] ? '#5e99c5' : undefined,
					border: 'solid 1px #979797'
				}} />)
			)}
		</div>

		<div>
			<button onClick={() => alert('clicked!')}> button text </button>
			{/* <button onClick={() => alert('clicked!')}> button text </button> */}
			{/* <button onClick={() => alert('clicked!')}> button text </button> */}
		</div>
	</div>;
}

export default App;
