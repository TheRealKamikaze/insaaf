import React, { useState, useEffect } from "react";
import {
	Form,
	Radio,
	Divider,
	Grid,
	Dropdown,
	Button,
} from "semantic-ui-react";

const GistUpdateComponent = ({
	medium,
	handleGistUpdate,
	updateGistPart,
	gist,
}) => {
	const [selectedEviForSet, setSelectedFor] = useState(new Set());
	const [availEviForSet, setAvailFor] = useState(
		new Set(
			Object.keys({ ...gist["evidence"]["for"] }).map((evi, index) => ({
				key: index,
				text: evi,
				value: evi,
			}))
		)
	);

	const [selectedEviAgSet, setSelectedAg] = useState(new Set());
	const [availEviAgSet, setAvailAg] = useState(
		new Set(
			Object.keys({ ...gist["evidence"]["against"] }).map((evi, index) => ({
				key: index,
				text: evi,
				value: evi,
			}))
		)
	);

	function difference(setA, setB) {
		let _difference = [...setA];
		for (let elem of setB) {
			_difference = _difference.filter((ele) => ele.text !== elem.text);
		}
		return _difference;
	}

	function updateSelectionFor(value, element) {
		if (element.length === 0) {
			return;
		}
		const oldVal = [...selectedEviForSet].filter((ele) => ele.text === element);
		const newSet = new Set(selectedEviForSet);
		if (oldVal.length > 0) {
			newSet.delete(oldVal[0]);
		}
		newSet.add({
			value,
			text: element,
		});
		setSelectedFor(newSet);
		setAvailFor(difference(availEviForSet, newSet));
	}

	function updateSelectionAg(value, element) {
		if (element.length === 0) {
			return;
		}
		const oldVal = [...selectedEviAgSet].filter((ele) => ele.text === element);
		const newSet = new Set(selectedEviAgSet);
		if (oldVal.length > 0) {
			newSet.delete(oldVal[0]);
		}
		newSet.add({
			value,
			text: element,
		});
		setSelectedAg(newSet);
		setAvailAg(difference(availEviAgSet, newSet));
	}

	const [forSelect, setForSelect] = useState("");
	const [agSelect, setAgSelect] = useState("");

	useEffect(() => {
		let nonZeros = new Set(selectedEviForSet);

		// console.log(availEviForSet,selectedEviForSet);

		Object.keys(gist["evidence"]["for"]).forEach((evi, index) => {
			if (gist["evidence"]["for"][evi] > 0) {
				nonZeros.add({
					text: evi,
					value: gist["evidence"]["for"][evi],
				});
			}
		});

		setSelectedFor(nonZeros);
		setAvailFor(difference(availEviForSet, nonZeros));

		nonZeros = new Set(selectedEviAgSet);

		Object.keys(gist["evidence"]["against"]).forEach((evi, index) => {
			if (gist["evidence"]["against"][evi] > 0) {
				nonZeros.add({
					text: evi,
					value: gist["evidence"]["against"][evi],
				});
			}
		});

		setSelectedAg(nonZeros);
		setAvailAg(difference(availEviAgSet, nonZeros));
		// eslint-disable-next-line
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		let newEvi = { ...gist["evidence"] };
		for (let eviFor of selectedEviForSet) {
			newEvi["for"][eviFor.text] = eviFor.value;
		}
		for (let eviAg of selectedEviAgSet) {
			newEvi["against"][eviAg.text] = eviAg.value;
		}
		updateGistPart(newEvi, "evidence");
		handleGistUpdate(e);
	};

	const constantRender = (
		<>
			<Grid.Row>
				<Grid.Column>
					<label htmlFor="caseNumber">Case Number</label>
				</Grid.Column>
				<Grid.Column width={6}>
					<input
						className="inp"
						type="text"
						value={gist["caseNumber"]}
						name="caseNumber"
						onChange={({ target }) =>
							updateGistPart(target.value, "caseNumber")
						}
					/>
				</Grid.Column>

				<Grid.Column>
					<label htmlFor="caseStart">Case Start (YYYY/MM)</label>
				</Grid.Column>
				<Grid.Column width={6}>
					<input
						className="inp"
						type="text"
						value={gist["caseStart"]}
						name="caseStart"
						onChange={({ target }) => updateGistPart(target.value, "caseStart")}
					/>
				</Grid.Column>
			</Grid.Row>

			<Divider />

			<Grid.Row>
				<Grid.Column>
					<label htmlFor="accused">Accused</label>
				</Grid.Column>

				<Grid.Column width={12}>
					<input
						className="inp"
						type="text"
						value={gist["accused"]}
						name="accused"
						onChange={({ target }) => updateGistPart(target.value, "accused")}
					/>
				</Grid.Column>
			</Grid.Row>

			<Divider />

			<Grid.Row>
				<Grid.Column>
					<label htmlFor="prosecution">Prosecution</label>
				</Grid.Column>

				<Grid.Column width={12}>
					<input
						className="inp"
						type="text"
						value={gist["prosecution"]}
						name="prosecution"
						onChange={({ target }) =>
							updateGistPart(target.value, "prosecution")
						}
					/>
				</Grid.Column>
			</Grid.Row>

			<Divider />

			<Grid.Row>
				<Grid.Column>
					<label htmlFor="victim">Victim</label>
				</Grid.Column>

				<Grid.Column width={12}>
					<input
						className="inp"
						type="text"
						value={gist["victim"]}
						name="victim"
						onChange={({ target }) => updateGistPart(target.value, "victim")}
					/>
				</Grid.Column>
			</Grid.Row>

			<Divider />

			<Grid.Row>
				<Grid.Column>
					<label htmlFor="accused">Penal Codes</label>
				</Grid.Column>

				<Grid.Column width={12}>
					<input
						className="inp"
						type="text"
						value={gist["penalCode"]}
						name="penalCode"
						onChange={({ target }) => updateGistPart(target.value, "penalCode")}
					/>
				</Grid.Column>
			</Grid.Row>

			<Divider />

			<Grid.Row>
				<Grid.Column>
					<label htmlFor="motive">Motive</label>
				</Grid.Column>

				<Grid.Column>
					<Radio
						toggle
						checked={gist["motive"] || false}
						onChange={() => updateGistPart(!gist["motive"], "motive")}
					/>
				</Grid.Column>

				<Grid.Column>
					<label htmlFor="means">Means</label>
				</Grid.Column>

				<Grid.Column>
					<Radio
						toggle
						checked={gist["means"] || false}
						onChange={() => updateGistPart(!gist["means"], "means")}
					/>
				</Grid.Column>

				<Grid.Column>
					<label htmlFor="opp">Opportunity</label>
				</Grid.Column>

				<Grid.Column>
					<Radio
						toggle
						checked={gist["opportunity"] || false}
						onChange={() => updateGistPart(!gist["opportunity"], "opportunity")}
					/>
				</Grid.Column>
			</Grid.Row>
			<Divider />

			<Grid.Row>
				<Grid.Column>
					<label htmlFor="evidence">Evidence</label>
				</Grid.Column>
			</Grid.Row>

			<Grid.Row>
				<Grid.Column>
					<div>For(not guilty)</div>
					<br />

					{[...selectedEviForSet].map((selected) => (
						<div key={selected.text} className="evidence">
							<label htmlFor={selected.text}>{selected.text}</label>
							<input
								type="number"
								className="inp"
								value={selected.value}
								onChange={({ target }) =>
									updateSelectionFor(target.value, selected.text)
								}
							/>
						</div>
					))}

					<Button
						icon="add"
						color="black"
						className="inp"
						style={{ float: "left" }}
						onClick={(e) => {
							e.preventDefault();
							updateSelectionFor(gist["evidence"]["for"][forSelect], forSelect);
							setForSelect("");
						}}
					/>

					<Dropdown
						options={[...availEviForSet]}
						placeholder="Choose an option"
						selection
						value={forSelect}
						onChange={(e, { value }) => setForSelect(value)}
						className="inp"
						style={{ float: "right", margin: "0 1rem", width: "70%" }}
					/>
				</Grid.Column>

				<Grid.Column>
					<div>Against(guilty)</div>
					<br />

					{[...selectedEviAgSet].map((selected) => (
						<div key={selected.text} className="evidence">
							<label htmlFor={selected.text}>{selected.text}</label>
							<input
								type="number"
								className="inp"
								value={selected.value}
								onChange={({ target }) =>
									updateSelectionAg(target.value, selected.text)
								}
							/>
						</div>
					))}

					<Button
						icon="add"
						color="black"
						style={{ float: "left" }}
						className="inp"
						onClick={(e) => {
							e.preventDefault();
							updateSelectionAg(
								gist["evidence"]["against"][agSelect],
								agSelect
							);
							setAgSelect("");
						}}
					/>

					<Dropdown
						options={[...availEviAgSet]}
						placeholder="Choose an option"
						selection
						className="inp"
						value={agSelect}
						onChange={(e, { value }) => setAgSelect(value)}
						style={{ float: "right", margin: "0 1rem", width: "70%" }}
					/>
				</Grid.Column>
			</Grid.Row>

			<Divider />
		</>
	);

	return (
		<div>
			<h1 style={{ margin: "1rem 5rem" }}>
				<span className="title">Case Details</span>
			</h1>
			<Form onSubmit={handleSubmit} style={{ margin: "1rem 5rem" }}>
				<Grid columns="equal" doubling>
					{constantRender}

					{medium === "train" ? (
						<Grid.Row>
							<Grid.Column>
								<label htmlFor="guilty">Guilty</label>
							</Grid.Column>
							<Grid.Column>
								<Radio
									toggle
									checked={gist["guilty"] || false}
									onChange={() => updateGistPart(!gist["guilty"], "guilty")}
								/>
							</Grid.Column>

							<Grid.Column>
								<label htmlFor="guilty">Complete</label>
							</Grid.Column>
							<Grid.Column>
								<Radio
									toggle
									checked={!gist["incomplete"] || false}
									onChange={() =>
										updateGistPart(!gist["incomplete"], "incomplete")
									}
								/>
							</Grid.Column>
						</Grid.Row>
					) : (
						<></>
					)}

					<Grid.Row textAlign="center">
						<Grid.Column>
							<button className="btn" type="submit">
								{medium === "predict" ? "Predict" : "Train"}
							</button>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Form>
		</div>
	);
};

export default GistUpdateComponent;
