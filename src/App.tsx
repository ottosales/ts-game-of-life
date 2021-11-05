import React, { useState, useCallback, useRef } from 'react';
import produce from 'immer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


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

	return <Container fluid
		style={{
			marginTop: '2%'
		}}>
		<Row>
			<Col md={3} style={{ textAlign: 'center' }}>
				<h2 style={{ marginBottom: 100 }}>Conway's Game of Life</h2>
				<button
					style={{
						paddingLeft: 35,
						paddingRight: 35,
						paddingTop: 12,
						paddingBottom: 12,
						fontSize: 18,
						fontWeight: 800,
						color: running ? 'coral' : 'oldlace',
						borderRadius: 5,
						backgroundColor: running ? 'cornsilk' : 'coral',
						alignSelf: 'flex-start',
						marginBottom: 6,
						minWidth: '48%',
						textAlign: 'center',
						borderColor: 'white'
					}}
					onClick={() => {
						setRunning(!running);
						if (!running) {
							runningRef.current = true;
							runSimulation();
						}
					}}> {running ? 'Stop Sim' : 'Run Sim'} </button>
					<button
					style={{
						paddingLeft: 35,
						paddingRight: 35,
						paddingTop: 12,
						paddingBottom: 12,
						fontSize: 18,
						fontWeight: 800,
						color: 'oldlace',
						borderRadius: 5,
						backgroundColor:  'coral',
						alignSelf: 'flex-start',
						marginBottom: 6,
						minWidth: '48%',
						textAlign: 'center',
						borderColor: 'white'
					}}
					onClick={() => alert(`I didn't spend a sec working on responsivity, and I work on a big screen (1920x1080 24").\nIf you can't see things properly, I'm sorry.`)}> my dude I can't see shit </button>
			</Col>

			<Col md={6} className="d-flex justify-content-around">
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
							backgroundColor: grid[i][j] ? 'coral' : undefined,
							border: 'solid 1px #979797'
						}} />)
					)}
				</div>
			</Col>

			<Col md={3} style={{ textAlign: 'center' }}>
			<button
					style={{
						paddingLeft: 35,
						paddingRight: 35,
						paddingTop: 12,
						paddingBottom: 12,
						fontSize: 18,
						fontWeight: 800,
						color: 'oldlace',
						borderRadius: 5,
						backgroundColor:  'coral',
						alignSelf: 'flex-start',
						marginBottom: 6,
						minWidth: '48%',
						textAlign: 'center',
						borderColor: 'white'
					}}> placeholder for later </button>
					<button
					style={{
						paddingLeft: 35,
						paddingRight: 35,
						paddingTop: 12,
						paddingBottom: 12,
						fontSize: 18,
						fontWeight: 800,
						color: 'oldlace',
						borderRadius: 5,
						backgroundColor:  'coral',
						alignSelf: 'flex-start',
						marginBottom: 6,
						minWidth: '48%',
						textAlign: 'center',
						borderColor: 'white'
					}}> placeholder for later </button>
					<button
					style={{
						paddingLeft: 35,
						paddingRight: 35,
						paddingTop: 12,
						paddingBottom: 12,
						fontSize: 18,
						fontWeight: 800,
						color: 'oldlace',
						borderRadius: 5,
						backgroundColor:  'coral',
						alignSelf: 'flex-start',
						marginBottom: 6,
						minWidth: '48%',
						textAlign: 'center',
						borderColor: 'white'
					}}> placeholder for later </button>
			</Col>

		</Row>
		<Row>
			<p style={{ textAlign: 'center', marginTop: 50}}>Made with React and React-Bootstrap</p>
		</Row>
	</Container>;

}

export default App;
