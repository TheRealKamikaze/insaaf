import React from "react";
import { Container, Grid, Divider, Form, Responsive, Header } from "semantic-ui-react";
import "../App.css";
import { useState } from "react";

const FileInput = props => {

	const [file, setFile] = useState(null);
	const [caseNumber,setCaseNumebr] = useState("");

	const fileClick = () => {
		document.getElementById("pdfLoader").click();
	}

	const dragOver = (event) => {
		event.preventDefault();
		event.persist();
		let uploadBox = event.target;
		// uploadBox.classList.remove("box");
		uploadBox.classList.add("drag-over");
	}

	const dragEnd = (event) => {
		event.preventDefault();
		event.persist();
		var uploadBox = event.target;
		uploadBox.classList.remove("drag-over");
		// uploadBox.classList.add("box");
	}

	const onDrop = (event) => {
		event.preventDefault();
		var uploadBox = event.target;
		event.persist();
		uploadBox.classList.remove("drag-over");
		event.target.files = event.dataTransfer.files;
		// setFile(event.target.files[0])
		console.log(event.target.files);
		setFile(event.target.files[0].name);
		props.handleFileChange(event.target.files[0])
	}

	const formSubmit = (event) => {
		props.handleFileSubmit(event);
	}

	return (
		<Container>
			<Grid columns={2} relaxed="very" stackable>

				<Grid.Column verticalAlign='middle'>
					<form onSubmit={formSubmit}>
						<center>
							<div className="file-input" onDragOver={dragOver} onDragEnter={dragOver} onDragLeave={dragEnd} onDragEnd={dragEnd} onDrop={onDrop}>
								<div className="file-row">
									<label>Case File: </label>
								</div>
								{file === null ?
									<>
										<div className="file-row">
											<svg xmlns="http://www.w3.org/2000/svg" onClick={fileClick} className="file-input__icon" height="512pt" version="1.1" viewBox="-23 0 512 512.00072" width="512pt" >
												<g id="surface1" >
													<path d="M 348.945312 221.640625 L 348.945312 124.746094 C 348.945312 121.972656 347.664062 119.410156 345.851562 117.382812 L 237.21875 3.308594 C 235.191406 1.175781 232.308594 0 229.429688 0 L 57.195312 0 C 25.398438 0 0 25.929688 0 57.730469 L 0 383.414062 C 0 415.214844 25.398438 440.71875 57.195312 440.71875 L 193.148438 440.71875 C 218.863281 483.402344 265.605469 512 318.851562 512 C 399.738281 512 465.792969 446.265625 465.792969 365.273438 C 465.902344 294.523438 415.105469 235.40625 348.945312 221.640625 Z M 240.101562 37.457031 L 312.984375 114.179688 L 265.710938 114.179688 C 251.625 114.179688 240.101562 102.550781 240.101562 88.464844 Z M 57.195312 419.375 C 37.242188 419.375 21.34375 403.367188 21.34375 383.414062 L 21.34375 57.730469 C 21.34375 37.667969 37.242188 21.34375 57.195312 21.34375 L 218.757812 21.34375 L 218.757812 88.464844 C 218.757812 114.394531 239.78125 135.523438 265.710938 135.523438 L 327.601562 135.523438 L 327.601562 218.863281 C 324.402344 218.757812 321.839844 218.4375 319.066406 218.4375 C 281.824219 218.4375 247.570312 232.738281 221.746094 255.148438 L 86.222656 255.148438 C 80.351562 255.148438 75.550781 259.949219 75.550781 265.816406 C 75.550781 271.6875 80.351562 276.488281 86.222656 276.488281 L 201.898438 276.488281 C 194.320312 287.160156 188.023438 297.832031 183.117188 309.570312 L 86.222656 309.570312 C 80.351562 309.570312 75.550781 314.371094 75.550781 320.242188 C 75.550781 326.109375 80.351562 330.914062 86.222656 330.914062 L 176.179688 330.914062 C 173.511719 341.585938 172.125 353.429688 172.125 365.273438 C 172.125 384.480469 175.859375 403.476562 182.582031 419.484375 L 57.195312 419.484375 Z M 318.960938 490.765625 C 249.8125 490.765625 193.574219 434.527344 193.574219 365.378906 C 193.574219 296.230469 249.703125 239.992188 318.960938 239.992188 C 388.214844 239.992188 444.34375 296.230469 444.34375 365.378906 C 444.34375 434.527344 388.109375 490.765625 318.960938 490.765625 Z M 318.960938 490.765625 " style={{ stroke: "none", fillRule: "nonzero" }} />
													<path d="M 86.222656 223.027344 L 194.320312 223.027344 C 200.191406 223.027344 204.992188 218.222656 204.992188 212.355469 C 204.992188 206.484375 200.191406 201.683594 194.320312 201.683594 L 86.222656 201.683594 C 80.351562 201.683594 75.550781 206.484375 75.550781 212.355469 C 75.550781 218.222656 80.351562 223.027344 86.222656 223.027344 Z M 86.222656 223.027344 " style={{ stroke: "none", fillRule: "nonzero" }} />
													<path d="M 326.535156 286.625 C 324.507812 284.492188 321.734375 283.210938 318.746094 283.210938 C 315.757812 283.210938 312.984375 284.492188 310.957031 286.625 L 248.421875 353.746094 C 244.367188 358.015625 244.6875 364.84375 248.957031 368.792969 C 253.226562 372.847656 260.160156 372.527344 264.214844 368.261719 L 308.394531 320.988281 L 308.394531 437.515625 C 308.394531 443.386719 313.195312 448.1875 319.066406 448.1875 C 324.933594 448.1875 329.738281 443.386719 329.738281 437.515625 L 329.738281 320.988281 L 373.59375 368.261719 C 375.730469 370.5 378.503906 371.675781 381.386719 371.675781 C 383.945312 371.675781 386.507812 370.714844 388.640625 368.792969 C 392.910156 364.738281 393.230469 358.015625 389.175781 353.746094 Z M 326.535156 286.625 " style={{ stroke: "none", fillRule: "nonzero" }} />
												</g>
											</svg>
										</div>
										<div className="file-row">
											<span className="click-here" onClick={fileClick}>
												<strong>Choose PDF</strong>
											</span>
											<span className="file-name">
												{" or drop it here"}
											</span>
										</div>
									</>

									:
									<>
										<div className="file-row">
											<svg className="file-input__icon" xmlns="http://www.w3.org/2000/svg" id="Capa_1" enableBackground="new 0 0 512 512" height="512pt" viewBox="0 0 512 512" width="512pt">
												<g>
													<path d="m492.804 198.276c0-32.598-12.693-63.244-35.741-86.292l-76.242-76.242c-23.049-23.049-53.694-35.742-86.291-35.742h-.001-137.534c-4.143 0-7.5 3.358-7.5 7.5s3.357 7.5 7.5 7.5h120.666c31.326 0 56.812 25.486 56.812 56.812v39.143c0 26.124 21.253 47.377 47.377 47.377h39.143c31.262 0 56.703 25.382 56.808 56.62v249.668c0 17.854-14.521 32.38-32.37 32.38h-327.6c-14.774 0-27.525-9.841-31.287-24.034l-.321-46.263h243.247c33.018 0 59.88-26.862 59.88-59.88v-16.214c0-4.142-3.357-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v16.214c0 24.747-20.133 44.88-44.88 44.88h-268.855c-14.567 0-26.419-11.852-26.419-26.419v-162.331c7.175 5.958 16.385 9.546 26.419 9.546h268.854c24.747 0 44.88 20.133 44.88 44.88v43.229c0 4.142 3.357 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-43.229c0-33.018-26.862-59.88-59.88-59.88h-244.01v-170.119c0-17.854 14.521-32.38 32.37-32.38h9.171c4.143 0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5h-9.17c-26.12 0-47.37 21.255-47.37 47.38v102.281h-9.845c-22.839 0-41.419 18.581-41.419 41.419v194.204c0 22.839 18.58 41.419 41.419 41.419h10.606l.328 47.269c.004.57.073 1.137.205 1.691 5.112 21.395 24.059 36.337 46.076 36.337h327.6c26.12 0 47.37-21.255 47.37-47.38zm-432.189-33.615h9.845v52.838h-9.845c-14.567 0-26.419-11.852-26.419-26.419s11.851-26.419 26.419-26.419zm360.377-21.329h-39.143c-17.853 0-32.377-14.524-32.377-32.377v-39.143c0-20.268-8.438-38.599-21.987-51.669 15.941 5.136 30.545 14.021 42.729 26.205l76.242 76.242c12.185 12.184 21.069 26.788 26.205 42.729-13.07-13.549-31.402-21.987-51.669-21.987z" /><path d="m321.254 281.773c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-38.667c-4.143 0-7.5 3.358-7.5 7.5v95.405c0 4.142 3.357 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-41.106h28.096c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-28.096v-31.799z" /><path d="m184.246 266.773c-1.991 0-3.901.792-5.309 2.202-1.406 1.41-2.195 3.321-2.191 5.313v.082.003 93.756c0 .584.073 1.15.2 1.695.038 1.946.827 3.804 2.209 5.177 1.405 1.395 3.305 2.177 5.284 2.177h.028c.815-.003 20.053-.077 27.721-.211 13.31-.232 25.16-6.262 33.371-16.977 7.566-9.876 11.734-23.376 11.734-38.014 0-33.018-18.497-55.202-46.027-55.202h-27.02zm58.047 55.203c0 23.235-12.487 39.681-30.367 39.993-4.561.08-13.549.139-20.013.174-.037-10.943-.099-30.975-.099-40.272 0-7.781-.035-28.76-.056-40.097h19.507c15.001-.001 31.028 10.561 31.028 40.202z" /><path d="m102.582 266.07c-1.993 0-3.904.793-5.312 2.205-1.398 1.402-2.182 3.3-2.187 5.279 0 .006-.002.011-.002.016v96.108c0 4.142 3.357 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-34.288c6.224-.034 14.857-.077 19.261-.077 19.383 0 35.152-15.531 35.152-34.622s-15.77-34.622-35.152-34.622h-26.76zm46.913 34.622c0 10.636-9.229 19.622-20.152 19.622-4.38 0-12.893.042-19.117.076-.034-6.391-.077-15.229-.077-19.698 0-3.77-.024-12.975-.044-19.622h19.238c10.923 0 20.152 8.985 20.152 19.622z" />
												</g>
											</svg>
										</div>
										<div className="file-row">
											<span className="file-name">
												<strong>Name:</strong> {file}
											</span>
										</div>
									</>
								}
							</div>
							<input type="file" id="pdfLoader" name="pdfLoader" className="file-map" onChange={({ target }) => { setFile(target.files[0].name); props.handleFileChange(target.files[0]) }} />
							<Grid columns={2}>
								<Grid.Row>
									<Grid.Column>
										<button className="btn" type="submit" disabled={file ? false : true}>Submit</button>
									</Grid.Column>
									<Grid.Column>
										<button className="btn" type="reset" onClick={() => { setFile(null) ;props.handleFileChange(null) }} disabled={file ? false : true} >Clear</button>
									</Grid.Column>
								</Grid.Row>
							</Grid>
						</center>
					</form>
				</Grid.Column>

				<Grid.Column verticalAlign='middle'>

					<Responsive minWidth={Responsive.onlyMobile.minWidth} maxWidth={Responsive.onlyTablet.maxWidth}>
						<Divider horizontal>
							<Header as="h4">
								Or
							</Header>
						</Divider>
					</Responsive>
				
					<Form onSubmit={(e) => {e.preventDefault();props.getGistByCaseNumber(caseNumber)}} >
						
						<div style={{fontSize: "1.5rem"}}>
							<h2 htmlFor="caseNumber" className="title" style={{fontSize: "2rem"}} >Search By case number:</h2>
							<br/>
							<input type="text" className="inp" name="caseNumber" placeholder="e.g. 254/2020" value={caseNumber} onChange={({target}) => setCaseNumebr(target.value) } />
						</div>
						
						<center>
							<button type="submit" className="btn">Get Case File</button>
						</center>
					
					</Form>
				
				</Grid.Column>

			</Grid>

			<Responsive minWidth={Responsive.onlyTablet.maxWidth + 1} maxWidth={Responsive.onlyLargeScreen.maxWidth}>
				<Divider vertical>Or</Divider>
			</Responsive>
			
			{/* <div>Icons made by <a href="https://www.flaticon.com/authors/kiranshastry" title="Kiranshastry">Kiranshastry</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
			{/* <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
		</Container >
	);
}

export default FileInput;