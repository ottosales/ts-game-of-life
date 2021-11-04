import React, { useState } from 'react';
import produce from 'immer';

const nRows = 40;
const nColumns = 50;

const App: React.FC = () => {
	const [grid, setGrid] = useState(() => {
		const rows = [];
		for (let i = 0; i < nRows; i++) {
			rows.push(Array.from(Array(nColumns), () => 0));
		}

		return rows;
	});

	return <div style={{
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: '1%'
	}}>

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
	</div>;
}

export default App;
