/*

	RDK plugin for JsPsych
	----------------------

	This code was created in the Consciousness and Metacognition Lab at UCLA,
	under the supervision of Brian Odegaard and Hakwan Lau

	We would appreciate it if you cited this paper when you use the RDK:
	Rajananda, S., Lau, H. & Odegaard, B., (2018). A Random-Dot Kinematogram for Web-Based Vision Research. Journal of Open Research Software. 6(1), p.6. DOI: [http://doi.org/10.5334/jors.194]

	----------------------

	Copyright (C) 2017  Sivananda Rajananda

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/


jsPsych.plugins["main-decision"] = (function() {

	var plugin = {};

	plugin.info = {
	    name: "main-decision",
	    parameters: {
	    	choices: {
		      type: jsPsych.plugins.parameterType.KEY,
		      pretty_name: "Choices",
		      default: jsPsych.ALL_KEYS,
		      array: true,
		      description: "The valid keys that the subject can press to indicate a response"
		    },
		    correct_choice: {
		      type: jsPsych.plugins.parameterType.KEY,
		      pretty_name: "Correct choice",
		      default: undefined,
		      array: true,
		      description: "The correct keys for that trial"
		    },
		    response_ends_trial: {
		      type: jsPsych.plugins.parameterType.BOOL,
		      pretty_name: "Response ends trial",
		      default: true,
		      description: "If true, then any valid key will end the trial"
		    },
		    trial_duration: {
		      type: jsPsych.plugins.parameterType.INT,
		      pretty_name: "Trial duration",
		      default: 500,
		      description: "The length of stimulus presentation"
		    },
		    aperture_width: {
		      type: jsPsych.plugins.parameterType.INT,
		      pretty_name: "Aperture width",
		      default: 600,
		      description: "The width of the aperture in pixels"
		    },
		    aperture_height: {
		      type: jsPsych.plugins.parameterType.INT,
		      pretty_name: "Aperture height",
		      default: 400,
		      description: "The height of the aperture in pixels"
		    },
		    background_color: {
		      type: jsPsych.plugins.parameterType.STRING,
		      pretty_name: "Background color",
		      default: "gray",
		      description: "The background of the stimulus"
		    },
		    aperture_center_x: {
		      type: jsPsych.plugins.parameterType.INT,
		      pretty_name: "Aperture center X",
		      default: window.innerWidth/2,
		      description: "The x-coordinate of the center of the aperture"
		    },
		    aperture_center_y: {
		      type: jsPsych.plugins.parameterType.INT,
		      pretty_name: "Aperture center Y",
		      default: window.innerHeight/2,
		      description: "The y-coordinate of the center of the aperture"
		    },
		    border: {
		      type: jsPsych.plugins.parameterType.BOOL,
		      pretty_name: "Border",
		      default: false,
		      description: "The presence of a border around the aperture"
		    },
		    border_thickness: {
		      type: jsPsych.plugins.parameterType.INT,
		      pretty_name: "Border width",
		      default: 1,
		      description: "The thickness of the border in pixels"
		    },
		    border_color: {
		      type: jsPsych.plugins.parameterType.STRING,
		      pretty_name: "Border Color",
		      default: 1,
		      description: "The color of the border"
		    },
				player_position: {
	        type: jsPsych.plugins.parameterType.HTML_STRING,
	        pretty_name: 'player_position',
	        default: "undefined",
	        description: 'The HTML string to be displayed for each player'
	      },
				player1: {
	        type: jsPsych.plugins.parameterType.HTML_STRING,
	        pretty_name: 'player1',
	        default: "undefined",
	        description: 'The HTML string to be displayed for player1'
	      },
				dectype: {
	        type: jsPsych.plugins.parameterType.HTML_STRING,
	        pretty_name: 'dectype',
	        default: "nan",
	        description: 'type of decision to be shown'
	      },
				outcomeEngage: {
	        type: jsPsych.plugins.parameterType.HTML_STRING,
	        pretty_name: 'outcomeEngage',
	        default: "nan",
	        description: 'outcome of engaging'
	      },
				dec_num: {
	        type: jsPsych.plugins.parameterType.HTML_STRING,
	        pretty_name: 'dec_num',
	        default: "nan",
	        description: 'first or second decicion'
	      },
	      player_colours: {
	        type: jsPsych.plugins.parameterType.HTML_STRING,
	        pretty_name: 'player_colours',
	        default: "nan",
	        description: 'The color of each player'
	      }
	    }
	 }


	//BEGINNING OF TRIAL
	plugin.trial = function(display_element, trial) {

		//--------------------------------------
		//---------SET PARAMETERS BEGIN---------
		//--------------------------------------


		//Note on '||' logical operator: If the first option is 'undefined', it evalutes to 'false' and the second option is returned as the assignment
		trial.player_position     	= assignParameterValue(trial.player_position, "nana");
		trial.player1           	= assignParameterValue(trial.player1, "nan");
		trial.choices 				= assignParameterValue(trial.choices, []);
		trial.correct_choice 		= assignParameterValue(trial.correct_choice, undefined);
		trial.trial_duration    	= assignParameterValue(trial.trial_duration, 500);
		trial.response_ends_trial 	= assignParameterValue(trial.response_ends_trial, true);
		trial.number_of_apertures 	= assignParameterValue(trial.number_of_apertures, 1);
		trial.aperture_width    = assignParameterValue(trial.aperture_width, 600);
		trial.aperture_height   = assignParameterValue(trial.aperture_height, 400);
		trial.background_color  = assignParameterValue(trial.background_color, "black");
		trial.aperture_type     = assignParameterValue(trial.aperture_type, 2);
		trial.aperture_center_x = assignParameterValue(trial.aperture_center_x, window.innerWidth/2);
		trial.aperture_center_y = assignParameterValue(trial.aperture_center_y, window.innerHeight/2);
		trial.border            = assignParameterValue(trial.border, false);
		trial.border_thickness  = assignParameterValue(trial.border_thickness, 1);
		trial.border_color      = assignParameterValue(trial.border_color, "nan");
		trial.player_colours      = assignParameterValue(trial.player_colours, "nan");

		//For circler aperture, set the aperture height == aperture width
		trial.aperture_height = trial.aperture_width;

		//Convert the parameter variables to those that the code below can use
		var nApertures     = 4; //The number of apertures
		var player_position   = trial.player_position; // array of each player_position initials in order
		var player1        = trial.player1;
		var player_colours 			= trial.player_colours;
		var apertureWidth  = trial.aperture_width; // How many pixels wide the aperture is. For square aperture this will be the both height and width. For circle, this will be the diameter.
		var apertureHeight = trial.aperture_height; //How many pixels high the aperture is. Only relevant for ellipse and rectangle apertures. For circle and square, this is ignored.
		var backgroundColor = trial.background_color; //Color of the background
		var apertureCenterX = trial.aperture_center_x; // The x-coordinate of center of the aperture on the screen, in pixels
		var allApertureCentreX = trial.aperture_center_x; // same but this one wont get set to current aperture and can be used to plot decision arrows
		var allApertureCentreY = trial.aperture_center_y; // same but this one wont get set to current aperture and can be used to plot decision arrows
		var apertureCenterY = trial.aperture_center_y; // The y-coordinate of center of the aperture on the screen, in pixels
		var dectype					= trial.dectype;
		var outcomeEngage		= trial.outcomeEngage;
		var dec_num					= trial.dec_num;


		/* RDK type parameter
		** See Fig. 1 in Scase, Braddick, and Raymond (1996) for a visual depiction of these different signal selection rules and noise types

		-------------------
		SUMMARY:

		Signal Selection rule:
		-Same: Each dot is designated to be either a coherent dot (signal) or incoherent dot (noise) and will remain so throughout all frames in the display. Coherent dots will always move in the direction of coherent motion in all frames.
		-Different: Each dot can be either a coherent dot (signal) or incoherent dot (noise) and will be designated randomly (weighted based on the coherence level) at each frame. Only the dots that are designated to be coherent dots will move in the direction of coherent motion, but only in that frame. In the next frame, each dot will be designated randomly again on whether it is a coherent or incoherent dot.

		Noise Type:
		-Random position: The incoherent dots appear in a random location in the aperture in each frame
		-Random walk: The incoherent dots will move in a random direction (designated randomly in each frame) in each frame.
		-Random direction: Each incoherent dot has its own alternative direction of motion (designated randomly at the beginning of the trial), and moves in that direction in each frame.

		-------------------

		 1 - same && random position
		 2 - same && random walk
		 3 - same && random direction
		 4 - different && random position
		 5 - different && random walk
		 6 - different && random direction         */

		var RDK = trial.RDK_type;


		/*
		Shape of aperture
		 1 - Circle
		 2 - Ellipse
		 3 - Square
		 4 - Rectangle
		*/
		var apertureType = trial.aperture_type;

		/*
		Out of Bounds Decision
		How we reinsert a dot that has moved outside the edges of the aperture:
		1 - Randomly appear anywhere in the aperture
		2 - Appear on the opposite edge of the aperture (Random if square or rectangle, reflected about origin in circle and ellipse)
		*/
		var reinsertType = trial.reinsert_type;


		//Border Parameters
		var border = trial.border; //To display or not to display the border
		var borderThickness = trial.border_thickness; //The width of the border in pixels
		var borderColor = trial.player_colours; //The color of the border



		//--------------------------------------
		//----------SET PARAMETERS END----------
		//--------------------------------------

		//--------Set up Canvas begin-------

		//Create a canvas element and append it to the DOM
		var canvas = document.createElement("canvas");
		display_element.appendChild(canvas);


		//The document body IS 'display_element' (i.e. <body class="jspsych-display-element"> .... </body> )
		var body = document.getElementsByClassName("jspsych-display-element")[0];

		//Save the current settings to be restored later
		var originalMargin = body.style.margin;
		var originalPadding = body.style.padding;
		var originalBackgroundColor = body.style.backgroundColor;

		//Remove the margins and paddings of the display_element
		body.style.margin = 0;
		body.style.padding = 0;
		body.style.backgroundColor = backgroundColor; //Match the background of the display element to the background color of the canvas so that the removal of the canvas at the end of the trial is not noticed

		//Remove the margins and padding of the canvas
		canvas.style.margin = 0;
		canvas.style.padding = 0;
		// use absolute positioning in top left corner to get rid of scroll bars
		canvas.style.position = 'absolute';
		canvas.style.top = 0;
		canvas.style.left = 0;

		//Get the context of the canvas so that it can be painted on.
		var ctx = canvas.getContext("2d");

		//Declare variables for width and height, and also set the canvas width and height to the window width and height
		var canvasWidth  = canvas.width = window.innerWidth;
		var canvasHeight = canvas.height = window.innerHeight;

		//Set the canvas background color
		canvas.style.backgroundColor = backgroundColor;

		//--------Set up Canvas end-------



		//--------RDK variables and function calls begin--------

		//This is the main part of the trial that makes everything run


		//Global variable for the current aperture number
		var currentApertureNumber;

		//Variables for different apertures (initialized in setUpMultipleApertures function below)

		var player_ids = [player1,'Op1','Op2','Pa'];
		var apertureWidthArray;
		var apertureHeightArray;

		var apertureCenterXArray;
		var apertureCenterYArray;

		// Set up multiple apertures
		setUpMultipleApertures();

		//Declare aperture parameters for initialization based on shape (used in initializeApertureDimensions function below)
		var horizontalAxis;
		var verticalAxis;

		//Variable to start the timer when the time comes
		var timerHasStarted = false;

		//Declare a global timeout ID to be initialized below in DotMotion function and to be used in after_response function
		var timeoutID;

		//Initialize object to store the response data. Default values of -1 are used if the trial times out and the subject has not pressed a valid key
		var response = {
			rt: -1,
			key: -1
		}

		//Declare global variable to be defined in startKeyboardListener function and to be used in end_trial function
		//var keyboardListener;


		updateAndDraw();

		//--------RDK variables and function calls end--------



		//-------------------------------------
		//-----------FUNCTIONS BEGIN-----------
		//-------------------------------------

		//----JsPsych Functions Begin----
		//Function to start the keyboard listener
		function startKeyboardListener(){
			//Start the response listener if there are choices for keys
			if (trial.choices != jsPsych.NO_KEYS) {
				//Create the keyboard listener to listen for subjects' key response
				keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
					callback_function: after_response, //Function to call once the subject presses a valid key
					valid_responses: trial.choices, //The keys that will be considered a valid response and cause the callback function to be called
					rt_method: 'performance', //The type of method to record timing information.
					persist: false, //If set to false, keyboard listener will only trigger the first time a valid key is pressed. If set to true, it has to be explicitly cancelled by the cancelKeyboardResponse plugin API.
					allow_held_key: false //Only register the key once, after this getKeyboardResponse function is called. (Check JsPsych docs for better info under 'jsPsych.pluginAPI.getKeyboardResponse').
				});
			}
		}

		//Function to end the trial proper
		function end_trial() {

			//Kill the keyboard listener if keyboardListener has been defined
			//if (typeof keyboardListener !== 'undefined') {
				jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
			//}
			console.log(response.key);
			//Place all the data to be saved from this trial in one data object
			var trial_data = {
				rt: response.rt, //The response time
				response: response.key, //The key that the subject pressed

				// correct: correctOrNot(), //If the subject response was correct
				choices: trial.choices, //The set of valid keys
				correct_choice: trial.correct_choice, //The correct choice
				response_ends_trial: trial.response_ends_trial, //If the response ends the trial
				trial_duration:      trial.trial_duration, //The trial duration
				aperture_width:      trial.aperture_width,
				aperture_height:     trial.aperture_height,
				background_color:    trial.background_color,
				RDK_type:            trial.RDK_type,
				aperture_center_x:   trial.aperture_center_x,
				aperture_center_y:   trial.aperture_center_y,
				border:              trial.border,
				border_thickness:    trial.border_thickness,
				border_color:        trial.border_color,
				canvas_width:        canvasWidth,
				canvas_height:       canvasHeight
			}

			//Remove the canvas as the child of the display_element element
			display_element.innerHTML='';

			//Restore the settings to JsPsych defaults
			body.style.margin = originalMargin;
			body.style.padding = originalPadding;
			body.style.backgroundColor = originalBackgroundColor

			//End this trial and move on to the next trial
			jsPsych.finishTrial(trial_data);

		} //End of end_trial


		//Function to record the first response by the subject
		function after_response(info) {

			//If the response has not been recorded, record it
			if (response.key == -1) {
				response = info; //Replace the response object created above
			}
			console.log("_responseMADE")
			//If the parameter is set such that the response ends the trial, then kill the timeout and end the trial
			if (trial.response_ends_trial) {
				window.clearTimeout(timeoutID);
				end_trial();
			}


		} //End of after_response


		//Function that determines if the response is correct
		function correctOrNot(){

			//Check that the correct_choice has been defined
			if(typeof trial.correct_choice !== 'undefined'){
				//If the correct_choice variable holds an array
				if(trial.correct_choice.constructor === Array){ //If it is an array
					//If the elements are characters
					if(typeof trial.correct_choice[0] === 'string' || trial.correct_choice[0] instanceof String){
						var key_in_choices = trial.correct_choice.every(function(x) {
							return jsPsych.pluginAPI.compareKeys(x,response.key);
						});
						return key_in_choices; //If the response is included in the correct_choice array, return true. Else, return false.
					}
					//Else if the elements are numbers (javascript character codes)
					else if (typeof trial.correct_choice[0] === 'number'){
						console.error('Error in RDK plugin: correct_choice value must be a string.');
					}
				}
				//Else compare the char with the response key
				else{
					//If the element is a character
					if(typeof trial.correct_choice === 'string' || trial.correct_choice instanceof String){
						//Return true if the user's response matches the correct answer. Return false otherwise.
						return jsPsych.pluginAPI.compareKeys(response.key, trial.correct_choice);
					}
					//Else if the element is a number (javascript character codes)
					else if (typeof trial.correct_choice === 'number'){
						console.error('Error in RDK plugin: correct_choice value must be a string.');
					}
				}
			}
		}

		//----JsPsych Functions End----

		//----RDK Functions Begin----

		//Set up the variables for the apertures
		function setUpMultipleApertures(){
			apertureWidthArray    = setParameter(apertureWidth);
			apertureHeightArray   = setParameter(apertureHeight);
			apertureCenterXArray  = setParameter(apertureCenterX);
			apertureCenterYArray  = setParameter(apertureCenterY);
			apertureTypeArray     = setParameter(apertureType);
			borderArray           = setParameter(border);
			borderThicknessArray  = setParameter(borderThickness);
			borderColorArray 			= setParameter(borderColor);
			currentSetArray 			= setParameter(0); //Always starts at zero

			//Loop through the number of apertures to make the dots
			for(currentApertureNumber = 0; currentApertureNumber < nApertures; currentApertureNumber++){
				//Initialize the parameters to make the 2d dot array (one for each aperture);
				initializeCurrentApertureParameters();
			}
		}

		//Function to set the parameters of the array
		function setParameter(originalVariable){
			//Check if it is an array and its length matches the aperture then return the original array
			if(originalVariable.constructor === Array && originalVariable.length === nApertures){
				return originalVariable;
			}
			//Else if it is not an array, we make it an array with duplicate values
			else if(originalVariable.constructor !== Array){

				var tempArray = [];

				//Make a for loop and duplicate the values
				for(var i = 0; i < nApertures; i++){
					tempArray.push(originalVariable);
				}
				return tempArray;
			}
			//Else if the array is not long enough, then print out that error message
			else if(originalVariable.constructor === Array && originalVariable.length !== nApertures){
				console.error("If you have more than one aperture, please ensure that arrays that are passed in as parameters are the same length as the number of apertures. Else you can use a single value without the array");
			}
			//Else print a generic error
			else{
				console.error("A parameter is incorrectly set. Please ensure that the nApertures parameter is set to the correct value (if using more than one aperture), and all others parameters are set correctly.");
			}
		}

		//Function to set the global variables to the current aperture so that the correct dots are updated and drawn
		function initializeCurrentApertureParameters(){

			//Set the global variables to that relevant to the current aperture
			apertureWidth  = apertureWidthArray[currentApertureNumber];
			apertureHeight = apertureHeightArray[currentApertureNumber];
			apertureCenterX = apertureCenterXArray[currentApertureNumber];
			apertureCenterY = apertureCenterYArray[currentApertureNumber];
			apertureType = apertureTypeArray[currentApertureNumber];
			border = borderArray[currentApertureNumber];
			borderThickness = borderThicknessArray[currentApertureNumber];
			borderColor = borderColorArray[currentApertureNumber];

			//Initialize the aperture parameters
			initializeApertureDimensions();

		}  // End of initializeCurrentApertureParameters


		//Initialize the parameters for the aperture for further calculation
		function initializeApertureDimensions() {
			//For circle
			horizontalAxis = verticalAxis = apertureWidth/2;
		}


		function drawDecisionArrow(){
			// need to know if we are in the first decisionor second decisionor
				// need to know what arrow we want to drawn

				if (dectype[dec_num] == 1){
						//draw an arrow
						ctx.beginPath();
						ctx.moveTo(allApertureCentreX[0] + apertureWidth/2, allApertureCentreY[0]);
						ctx.lineTo(allApertureCentreX[2] - apertureWidth/2, allApertureCentreY[2]);
						ctx.strokeStyle = 'red';
				    	ctx.stroke();  

				} else if (dectype[dec_num] == 2){
					//draw an arrow
						ctx.beginPath();
						ctx.moveTo(allApertureCentreX[0] + apertureWidth/2, allApertureCentreY[0] + apertureWidth/2);
						ctx.lineTo(allApertureCentreX[3] - apertureWidth/2, allApertureCentreY[3] - apertureWidth/2);
						ctx.strokeStyle = 'red';
				    	ctx.stroke(); 

				} else if (dectype[dec_num] == 3){
					//draw an arrow
						ctx.beginPath();
						ctx.moveTo(allApertureCentreX[1] + apertureWidth/2, allApertureCentreY[1] - apertureWidth/2);
						ctx.lineTo(allApertureCentreX[2] - apertureWidth/2, allApertureCentreY[2] + apertureWidth/2);
						ctx.strokeStyle = 'red';
				    	ctx.stroke(); 

				} else if (dectype[dec_num] == 4){
					//draw an arrow
						ctx.beginPath();
						ctx.moveTo(allApertureCentreX[1] + apertureWidth/2, allApertureCentreY[1]);
						ctx.lineTo(allApertureCentreX[3] - apertureWidth/2, allApertureCentreY[3]);
						ctx.strokeStyle = 'red';
				    	ctx.stroke(); 
				}
				
		}


		//Function to update all the dots all the apertures and then draw them
		function updateAndDraw(){
			// Draw all the relevant dots on the canvas
			for(currentApertureNumber = 0; currentApertureNumber < nApertures; currentApertureNumber++){
				//Initialize the variables for each parameter
				initializeCurrentApertureParameters(currentApertureNumber);

				//Draw on the canvas
				draw(currentApertureNumber);
			}

		drawDecisionArrow();

		//Start to listen to subject's key responses
		//startKeyboardListener();

		}


		//Draw the dots on the canvas after they're updated
		function draw(currentApertureNumber) {

    	//Draw the border if we want it
    	if(border === true){
      	//For circle and ellipse
      	if(apertureType === 1 || apertureType === 2){
        		ctx.lineWidth = borderThickness;
        		ctx.strokeStyle = borderColor;
        		ctx.beginPath();
        		ctx.ellipse(apertureCenterX, apertureCenterY, horizontalAxis+(borderThickness/2), verticalAxis+(borderThickness/2), 0, 0, Math.PI*2);
        		ctx.stroke();
      	}//End of if circle or ellipse

      	//For square and rectangle
      	if(apertureType === 3 || apertureType === 4){
        		ctx.lineWidth = borderThickness;
        		ctx.strokeStyle = borderColor;
        		ctx.strokeRect(apertureCenterX-horizontalAxis-(borderThickness/2), apertureCenterY-verticalAxis-(borderThickness/2), (horizontalAxis*2)+borderThickness, (verticalAxis*2)+borderThickness);
      	}//End of if square or

  		}//End of if border === true
			ctx.textAlign = "center";
			ctx.fillStyle = player_colours[player_position[currentApertureNumber]];
			ctx.fillText(player_ids[player_position[currentApertureNumber]], apertureCenterX, apertureCenterY);

		}//End of draw


		//Generates a random number (with decimals) between 2 values
		function randomNumberBetween(lowerBound, upperBound) {
			return lowerBound + Math.random() * (upperBound - lowerBound);
		}
		//----RDK Functions End----


		//----General Functions Begin//----

		//Function to assign the default values for the staircase parameters
		function assignParameterValue(argument, defaultValue){
			return typeof argument !== 'undefined' ? argument : defaultValue;
		}

		//----General Functions End//----


		//-------------------------------------
		//-----------FUNCTIONS END-------------
		//-------------------------------------

	// start the response listener
    if (trial.choices != jsPsych.NO_KEYS) {
      var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: trial.choices,
        rt_method: 'performance',
        persist: false,
        allow_held_key: false
      });
    }
	

	/*	// end trial if trial_duration is set
    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.trial_duration);
    }
    */

	}; // END OF TRIAL

	//Return the plugin object which contains the trial
	return plugin;
})();
