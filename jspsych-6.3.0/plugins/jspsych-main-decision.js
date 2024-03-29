/*

This plugin displays the question arrow for main decision and records the response

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
		      default: 'nan',
		      array: true,
		      description: "The correct keys for that trial"
		    },
		    trial_duration: {
		      type: jsPsych.plugins.parameterType.INT,
		      pretty_name: "Trial duration",
		      default: 500,
		      description: "The length of stimulus presentation"
		    },
		    response_ends_trial: {
		      type: jsPsych.plugins.parameterType.BOOL,
		      pretty_name: "Response ends trial",
		      default: false,
		      description: "If true, then any valid key will end the trial"
		    },
		    number_of_apertures: {
		      type: jsPsych.plugins.parameterType.INT,
		      pretty_name: "Number of apertures",
		      default: 1,
		      description: "The number of RDK apertures (If more than one, make sure to separate them by setting aperture_center_x and aperture_center_y for each RDK)"
		    },
		    number_of_dots: {
		      type: jsPsych.plugins.parameterType.INT,
		      pretty_name: "Number of dots",
		      default: 50,
		      description: "The number of dots per set in the stimulus"
		    },
		    number_of_sets: {
		      type: jsPsych.plugins.parameterType.INT,
		      pretty_name: "Number of sets",
		      default: 1,
		      description: "The number of sets of dots to cycle through"
		    },
		    coherent_direction: {
		      type: jsPsych.plugins.parameterType.INT,
		      pretty_name: "Coherent direction",
		      default: 0,
		      description: "The direction of coherent motion in degrees"
		    },
		    coherence: {
		      type: jsPsych.plugins.parameterType.FLOAT,
		      pretty_name: "Coherence",
		      default: 0.5,
		      description: "The percentage of dots moving in the coherent direction"
		    },
		    opposite_coherence: {
		      type: jsPsych.plugins.parameterType.FLOAT,
		      pretty_name: "Opposite coherence",
		      default: 0,
		      description: "The percentage of dots moving in the direction opposite of the coherent direction"
		    },
		    dot_radius: {
		      type: jsPsych.plugins.parameterType.INT,
		      pretty_name: "Dot radius",
		      default: 2,
		      description: "The radius of the dots in pixels"
		    },
		    dot_life: {
		      type: jsPsych.plugins.parameterType.INT,
		      pretty_name: "Dot life",
		      default: -1,
		      description: "The number of frames that pass before each dot disappears and reappears somewhere else"
		    },
		    move_distance: {
		      type: jsPsych.plugins.parameterType.INT,
		      pretty_name: "Move distance",
		      default: 1,
		      description: "The distance in pixels each dot moves per frame"
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
		    dot_color: {
		      type: jsPsych.plugins.parameterType.STRING,
		      pretty_name: "Dot color",
		      default: "white",
		      description: "The color of the dots"
		    },
		    background_color: {
		      type: jsPsych.plugins.parameterType.STRING,
		      pretty_name: "Background color",
		      default: "black",
		      description: "The background of the stimulus"
		    },
		    RDK_type: {
		      type: jsPsych.plugins.parameterType.INT,
		      pretty_name: "RDK type",
		      default: 3,
		      description: "The Type of RDK (refer to documentation for details)"
		    },
		    aperture_type: {
		      type: jsPsych.plugins.parameterType.INT,
		      pretty_name: "Aperture Type",
		      default: 1,
		      description: "The shape of the aperture"
		    },
		    reinsert_type: {
		      type: jsPsych.plugins.parameterType.INT,
		      pretty_name: "Reinsert type",
		      default: 2,
		      description: "The reinsertion rule for dots that move out of the aperture"
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
				player_on: {
		      type: jsPsych.plugins.parameterType.INT,
		      pretty_name: "player being shown",
		      default: 1,
		      description: "index of rdk to turn on"
		    },
			     player1: {
			   type: jsPsych.plugins.parameterType.HTML_STRING,
				pretty_name: 'player1',
				default: 'nan',
				description: 'The HTML string to be displayed for player1'
			  },
				player_position: {
	        type: jsPsych.plugins.parameterType.HTML_STRING,
	        pretty_name: 'player_position',
	        default: 'nan',
	        description: 'The location for each player'
	      },
				player_colours: {
	        type: jsPsych.plugins.parameterType.HTML_STRING,
	        pretty_name: 'player_colours',
	        default: 'nan',
	        description: 'The color of each player'
	      },
				dectype: {
	        type: jsPsych.plugins.parameterType.HTML_STRING,
	        pretty_name: 'dectype',
	        default: "nan",
	        description: 'type of decision to be shown'
	      },
				dec_num: {
	        type: jsPsych.plugins.parameterType.INT,
	        pretty_name: 'dec_num',
	        default: 0,
	        description: 'first or second decicion'
	      },
	      		initials_font: {
	        type: jsPsych.plugins.parameterType.HTML_STRING,
	        pretty_name: 'initials_font',
	        default: 'nan',
	        description: 'The initials_font to be displayed for players'
	      },
	      		dec_arrow: {
	        type: jsPsych.plugins.parameterType.HTML_STRING,
	        pretty_name: 'dec_arrow ',
	        default: 'nan',
	        description: 'settings for how dec_arrow is displayed'
	      },
	      	 outcomeEngage: {
	        type: jsPsych.plugins.parameterType.INT,
	        pretty_name: 'outcome of engaging ',
	        default: 'nan',
	        description: 'outcome for both decisions '
	      }	
	    }
	 }


	//BEGINNING OF TRIAL
	plugin.trial = function(display_element, trial) {

		//--------------------------------------
		//---------SET PARAMETERS BEGIN---------
		//--------------------------------------


		//Note on '||' logical operator: If the first option is 'undefined', it evalutes to 'false' and the second option is returned as the assignment
		trial.player_position = assignParameterValue(trial.player_position, "nana");
		trial.player_on = assignParameterValue(trial.player_on, "nan");
		trial.player1 = assignParameterValue(trial.player1, "nan");
		trial.player_colours = assignParameterValue(trial.player_colours, "nan");
		trial.choices = assignParameterValue(trial.choices, []);
		trial.correct_choice = assignParameterValue(trial.correct_choice, undefined);
		trial.trial_duration = assignParameterValue(trial.trial_duration, 500);
		trial.response_ends_trial = assignParameterValue(trial.response_ends_trial, false);
		trial.number_of_apertures = assignParameterValue(trial.number_of_apertures, 1);
		trial.number_of_dots = assignParameterValue(trial.number_of_dots, 50);
		trial.number_of_sets = assignParameterValue(trial.number_of_sets, 1);
		trial.coherent_direction = assignParameterValue(trial.coherent_direction, 0);
		trial.coherence = assignParameterValue(trial.coherence, 0.5);
		trial.opposite_coherence = assignParameterValue(trial.opposite_coherence, 0);
		trial.dot_radius = assignParameterValue(trial.dot_radius, 2);
		trial.dot_life = assignParameterValue(trial.dot_life, -1);
		trial.move_distance = assignParameterValue(trial.move_distance, 1);
		trial.aperture_width = assignParameterValue(trial.aperture_width, 600);
		trial.aperture_height = assignParameterValue(trial.aperture_height, 400);
		trial.dot_color = assignParameterValue(trial.dot_color, "white");
		trial.background_color = assignParameterValue(trial.background_color, "black");
		trial.RDK_type = assignParameterValue(trial.RDK_type, 3);
		trial.aperture_type = assignParameterValue(trial.aperture_type, 1);
		trial.reinsert_type = assignParameterValue(trial.reinsert_type, 2);
		trial.aperture_center_x = assignParameterValue(trial.aperture_center_x, window.innerWidth/2);
		trial.aperture_center_y = assignParameterValue(trial.aperture_center_y, window.innerHeight/2);
		trial.fixation_cross = assignParameterValue(trial.fixation_cross, false);
		trial.fixation_cross_width = assignParameterValue(trial.fixation_cross_width, 20);
		trial.fixation_cross_height = assignParameterValue(trial.fixation_cross_height, 20);
		trial.fixation_cross_color = assignParameterValue(trial.fixation_cross_color, "black");
		trial.fixation_cross_thickness = assignParameterValue(trial.fixation_cross_thickness, 1);
		trial.border = assignParameterValue(trial.border, false);
		trial.border_thickness = assignParameterValue(trial.border_thickness, 1);
		trial.border_color = assignParameterValue(trial.border_color, "black");


		//For square and circle, set the aperture height == aperture width
		if (apertureType == 1 || apertureType == 3) {
			trial.aperture_height = trial.aperture_width;
		}

		//Convert the parameter variables to those that the code below can use
		var player_position = trial.player_position; // array of each player_position initials in order
		var player_on = trial.player_on;
		var player1 = trial.player1;
		var player_colours = trial.player_colours;
		var nApertures = 4; //The number of apertures
		var nDots = trial.number_of_dots; //Number of dots per set (equivalent to number of dots per frame)
		var nSets = trial.number_of_sets; //Number of sets to cycle through per frame
		var coherentDirection = trial.coherent_direction; //The direction of the coherentDots in degrees. Starts at 3 o'clock and goes counterclockwise (0 == rightwards, 90 == upwards, 180 == leftwards, 270 == downwards), range 0 - 360
		var coherence = trial.coherence; //Proportion of dots to move together, range from 0 to 1
		var oppositeCoherence = trial.opposite_coherence; // The coherence for the dots going the opposite direction as the coherent dots
		var dotRadius = trial.dot_radius; //Radius of each dot in pixels
		var dotLife = trial.dot_life; //How many frames a dot will keep following its trajectory before it is redrawn at a random location. -1 denotes infinite life (the dot will only be redrawn if it reaches the end of the aperture).
		var moveDistance = trial.move_distance; //How many pixels the dots move per frame
		var apertureWidth = trial.aperture_width; // How many pixels wide the aperture is. For square aperture this will be the both height and width. For circle, this will be the diameter.
		var apertureHeight = trial.aperture_height; //How many pixels high the aperture is. Only relevant for ellipse and rectangle apertures. For circle and square, this is ignored.
		var dotColor = player_colours; //trial.dot_color; //Color of the dots
		var backgroundColor = trial.background_color; //Color of the background
		var apertureCenterX = trial.aperture_center_x; // The x-coordinate of center of the aperture on the screen, in pixels
		var apertureCenterY = trial.aperture_center_y; // The y-coordinate of center of the aperture on the screen, in pixels
		var dectype	= trial.dectype;
		var dec_num	= trial.dec_num;
		var allApertureCentreX = trial.aperture_center_x; // same but this one wont get set to current aperture and can be used to plot decision arrows
		var allApertureCentreY = trial.aperture_center_y;
		var player_fonts = trial.initials_font;
		var dec_arrow = trial.dec_arrow;
		var outcomeEngage = trial.outcomeEngage;
		var trial_points = 0;
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
		var borderColor = trial.player_colours; //trial.border_color; //The color of the border



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
		var canvasWidth = canvas.width = window.innerWidth;
		var canvasHeight = canvas.height = window.innerHeight;

		//Set the canvas background color
		canvas.style.backgroundColor = backgroundColor;

		//--------Set up Canvas end-------



		//--------RDK variables and function calls begin--------

		//This is the main part of the trial that makes everything run

		//Global variable for the current aperture number
		var currentApertureNumber;

		//3D Array to hold the dots (1st D is Apertures, 2nd D is Sets, 3rd D is Dots)
		var dotArray3d = trial.previous_dot_positions.values[0];
		//console.log(dotArray3d)



		//Variables for different apertures (initialized in setUpMultipleApertures function below)
		var player_position;
		var player_on;
		var player_ids = [player1,'Pa','G1','G2'];
		var nDotsArray;
		var nSetsArray;
		var coherentDirectionArray;
		var coherenceArray;
		var oppositeCoherenceArray;
		var dotRadiusArray;
		var dotLifeArray;
		var moveDistanceArray;
		var apertureWidthArray;
		var apertureHeightArray;
		var dotColorArray;
		var apertureCenterXArray;
		var apertureCenterYArray;

		// Set up multiple apertures
		setUpMultipleApertures();

		//Declare aperture parameters for initialization based on shape (used in initializeApertureDimensions function below)
		var horizontalAxis;
		var verticalAxis;

		//Calculate the x and y jump sizes for coherent dots
		var coherentJumpSizeX;
		var coherentJumpSizeY;

		//Calculate the number of coherent, opposite coherent, and incoherent dots
		var nCoherentDots;
		var nOppositeCoherentDots;
		var nIncoherentDots;

		//Make the array of arrays containing dot objects
		var dotArray2d;

		var dotArray; //Declare a global variable to hold the current array
		var currentSetArray; //Declare and initialize a global variable to cycle through the dot arrays


		//Initialize stopping condition for animateDotMotion function that runs in a loop
		var stopDotMotion = false;

		//Variable to control the frame rate, to ensure that the first frame is skipped because it follows a different timing
		var firstFrame = true; //Used to skip the first frame in animate function below (in animateDotMotion function)

		//Variable to start the timer when the time comes
		var timerHasStarted = false;

		//Initialize object to store the response data. Default values of -1 are used if the trial times out and the subject has not pressed a valid key
		var response = {
			rt: -1,
			key: -1
		}

		//Declare a global timeout ID to be initialized below in animateDotMotion function and to be used in after_response function
		var timeoutID;

		//Declare global variable to be defined in startKeyboardListener function and to be used in end_trial function
		var keyboardListener;

		//Declare global variable to store the frame rate of the trial
		var frameRate = []; //How often the monitor refreshes, in ms. Currently an array to store all the intervals. Will be converted into a single number (the average) in end_trial function.

		//variable to store how many frames were presented.
		var numberOfFrames = 0;

		//This runs the dot motion simulation, updating it according to the frame refresh rate of the screen.
		//animateDotMotion();

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
		//Function to end the trial proper
		function end_trial() {

			//Kill the keyboard listener if keyboardListener has been defined
			//if (typeof keyboardListener !== 'undefined') {
			jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
			//}
			if (response.key == 'arrowright'){
				trial_points = outcomeEngage[dec_num]
			}

			//Place all the data to be saved from this trial in one data object
			var trial_data = {
				rt: response.rt, //The response time
				response: response.key, //The key that the subject pressed
				//trial_3d_dot_array: dotArray3d,
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
				canvas_height:       canvasHeight,
				dectype:             trial.dectype,
				dec_num:             trial.dec_num,
				outcome_engage:      trial.outcomeEngage[dec_num]
				


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

			//If the parameter is set such that the response ends the trial, then kill the timeout and end the trial
			if (trial.response_ends_trial) {
				window.clearTimeout(timeoutID);
				end_trial();
			}

		} //End of after_response

		

		//----JsPsych Functions End----

		//----RDK Functions Begin----

		//Set up the variables for the apertures
		function setUpMultipleApertures(){
			nDotsArray = setParameter(nDots);
			nSetsArray = setParameter(nSets);
			coherentDirectionArray = setParameter(coherentDirection);
			coherenceArray = setParameter(coherence);
			oppositeCoherenceArray = setParameter(oppositeCoherence);
			dotRadiusArray = setParameter(dotRadius);
			dotLifeArray = setParameter(dotLife);
			moveDistanceArray = setParameter(moveDistance);
			apertureWidthArray = setParameter(apertureWidth);
			apertureHeightArray = setParameter(apertureHeight);
			dotColorArray = setParameter(dotColor);
			apertureCenterXArray = setParameter(apertureCenterX);
			apertureCenterYArray = setParameter(apertureCenterY);
			RDKArray = setParameter(RDK);
			apertureTypeArray = setParameter(apertureType);
			borderArray = setParameter(border);
			borderThicknessArray = setParameter(borderThickness);
			borderColorArray = setParameter(borderColor);

			currentSetArray = setParameter(0); //Always starts at zero


			//Loop through the number of apertures to make the dots
			for(currentApertureNumber = 0; currentApertureNumber < nApertures; currentApertureNumber++){

				//Initialize the parameters to make the 2d dot array (one for each aperture);
				initializeCurrentApertureParameters();

				//Make each 2d array and push it into the 3d array
				//dotArray3d.push(makeDotArray2d());
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
			nDots = nDotsArray[currentApertureNumber];
			nSets = nSetsArray[currentApertureNumber];
			coherentDirection = coherentDirectionArray[currentApertureNumber];
			coherence = coherenceArray[currentApertureNumber];
			oppositeCoherence = oppositeCoherenceArray[currentApertureNumber];
			dotRadius = dotRadiusArray[currentApertureNumber];
			dotLife = dotLifeArray[currentApertureNumber];
			moveDistance = moveDistanceArray[currentApertureNumber];
			apertureWidth = apertureWidthArray[currentApertureNumber];
			apertureHeight = apertureHeightArray[currentApertureNumber];
			dotColor = dotColorArray[currentApertureNumber];
			apertureCenterX = apertureCenterXArray[currentApertureNumber];
			apertureCenterY = apertureCenterYArray[currentApertureNumber];
			RDK = RDKArray[currentApertureNumber];
			apertureType = apertureTypeArray[currentApertureNumber];
			border = borderArray[currentApertureNumber];
			borderThickness = borderThicknessArray[currentApertureNumber];
			borderColor = borderColorArray[currentApertureNumber];

			//Calculate the x and y jump sizes for coherent dots
			//coherentJumpSizeX = calculateCoherentJumpSizeX(coherentDirection);
			//coherentJumpSizeY = calculateCoherentJumpSizeY(coherentDirection);

			//Initialize the aperture parameters
			initializeApertureDimensions();

			//Calculate the number of coherent, opposite coherent, and incoherent dots
			nCoherentDots = nDots * coherence;
			nOppositeCoherentDots = nDots * oppositeCoherence;
			nIncoherentDots = nDots - (nCoherentDots + nOppositeCoherentDots);

			//If the 3d array has been made, then choose the 2d array and the current set
			dotArray2d = dotArray3d.length !==0 ? dotArray3d[currentApertureNumber] : undefined;

		}// End of initializeCurrentApertureParameters



		//Initialize the parameters for the aperture for further calculation
		function initializeApertureDimensions() {
			//For circle and square
			if (apertureType == 1 || apertureType == 3) {
				horizontalAxis = verticalAxis = apertureWidth/2;
			}
			//For ellipse and rectangle
			else if (apertureType == 2 || apertureType == 4) {
				horizontalAxis = apertureWidth / 2;
				verticalAxis = apertureHeight / 2;
			}
		}

		//Make the 2d array, which is an array of array of dots
		function makeDotArray2d() {
			//Declare an array to hold the sets of dot arrays
			var tempArray = []
			//Loop for each set of dot array
			for (var i = 0; i < nSets; i++) {
				tempArray.push(makeDotArray()); //Make a dot array and push it into the 2d array
			}

			return tempArray;
		}

		//Make the dot array
		function makeDotArray() {
			var tempArray = []
			for (var i = 0; i < nDots; i++) {
				//Initialize a dot to be modified and inserted into the array
				var dot = {
					x: 0, //x coordinate
					y: 0, //y coordinate
					vx: 0, //coherent x jumpsize (if any)
					vy: 0, //coherent y jumpsize (if any)
					vx2: 0, //incoherent (random) x jumpsize (if any)
					vy2: 0, //incoherent (random) y jumpsize (if any)
					latestXMove: 0, //Stores the latest x move direction for the dot (to be used in reinsertOnOppositeEdge function below)
					latestYMove: 0, //Stores the latest y move direction for the dot (to be used in reinsertOnOppositeEdge function below)
					lifeCount: Math.floor(randomNumberBetween(0, dotLife)), //Counter for the dot's life. Updates every time it is shown in a frame
					updateType: "" //String to determine how this dot is updated
				};

				//randomly set the x and y coordinates
				dot = resetLocation(dot);

				tempArray.push(dot);
			} //End of for loop
			return tempArray;
		}


		function drawDecisionArrow(){
			// need to know if we are in the first decisionor second decisionor
				// need to know what arrow we want to drawn

				if (dectype[dec_num] == 1){
						//draw an arrow
						ctx.beginPath();
						ctx.lineWidth = dec_arrow.arrow_body_thickness;
						ctx.moveTo(allApertureCentreX[0] + apertureWidth/2, allApertureCentreY[0]);
						ctx.lineTo(allApertureCentreX[2] - apertureWidth/2, allApertureCentreY[2]);
						
						ctx.lineWidth = dec_arrow.arrow_head_thickness;
						ctx.moveTo(allApertureCentreX[0] + apertureWidth/2, allApertureCentreY[0]);
						ctx.lineTo(allApertureCentreX[0] + apertureWidth/2 + apertureWidth/8, allApertureCentreY[0]+apertureWidth/8)
						
						ctx.moveTo(allApertureCentreX[0] + apertureWidth/2, allApertureCentreY[0]);
						ctx.lineTo(allApertureCentreX[0] + apertureWidth/2 + apertureWidth/8, allApertureCentreY[0]-apertureWidth/8)
	
						ctx.moveTo(allApertureCentreX[2] - apertureWidth/2, allApertureCentreY[2]);
						ctx.lineTo(allApertureCentreX[2] - apertureWidth/2 - apertureWidth/8, allApertureCentreY[2]+apertureWidth/8)
						
						ctx.moveTo(allApertureCentreX[2] - apertureWidth/2, allApertureCentreY[2]);
						ctx.lineTo(allApertureCentreX[2] - apertureWidth/2 - apertureWidth/8, allApertureCentreY[2]-apertureWidth/8)
	
						ctx.strokeStyle = 'dodgerblue';
						ctx.stroke();
				} else if (dectype[dec_num] == 2){
					//draw an arrow
					ctx.beginPath();
					ctx.lineWidth = dec_arrow.arrow_body_thickness;
					ctx.moveTo(allApertureCentreX[0] + apertureWidth/2, allApertureCentreY[0] + apertureWidth/2 - apertureWidth/4);
					ctx.lineTo(allApertureCentreX[3] - apertureWidth/2, allApertureCentreY[3] - apertureWidth/2 + apertureWidth/4);
					
					ctx.lineWidth = dec_arrow.arrow_head_thickness;
					
					ctx.moveTo(allApertureCentreX[0] + apertureWidth/2, allApertureCentreY[0] + apertureWidth/2 - apertureWidth/4);
					ctx.lineTo(allApertureCentreX[0] + apertureWidth/2, allApertureCentreY[0] + apertureWidth/2)
					
					ctx.moveTo(allApertureCentreX[0] + apertureWidth/2, allApertureCentreY[0] + apertureWidth/2 - apertureWidth/4);
					ctx.lineTo(allApertureCentreX[0] + apertureWidth/2 + apertureWidth/4, allApertureCentreY[0] + apertureWidth/2 - apertureWidth/4)

					ctx.moveTo(allApertureCentreX[3] - apertureWidth/2, allApertureCentreY[3] - apertureWidth/2 + apertureWidth/4);
					ctx.lineTo(allApertureCentreX[3] - apertureWidth/2, allApertureCentreY[3] - apertureWidth/2)
					
					ctx.moveTo(allApertureCentreX[3] - apertureWidth/2, allApertureCentreY[3] - apertureWidth/2 + apertureWidth/4);
					ctx.lineTo(allApertureCentreX[3] - apertureWidth/2 - apertureWidth/4, allApertureCentreY[3] - apertureWidth/2 + apertureWidth/4)

					ctx.strokeStyle = 'dodgerblue';
					ctx.stroke();

				} else if (dectype[dec_num] == 3){
					//draw an arrow
					ctx.beginPath();
					ctx.lineWidth = dec_arrow.arrow_body_thickness;
					ctx.moveTo(allApertureCentreX[1] + apertureWidth/2, allApertureCentreY[1] - apertureWidth/2 + apertureWidth/4);
					ctx.lineTo(allApertureCentreX[2] - apertureWidth/2, allApertureCentreY[2] + apertureWidth/2 - apertureWidth/4);
					
					ctx.lineWidth = dec_arrow.arrow_head_thickness;
					ctx.moveTo(allApertureCentreX[1] + apertureWidth/2, allApertureCentreY[1] - apertureWidth/2 + apertureWidth/4);
					ctx.lineTo(allApertureCentreX[1] + apertureWidth/2 + apertureWidth/4, allApertureCentreY[1] - apertureWidth/2 + apertureWidth/4)
					
					ctx.moveTo(allApertureCentreX[1] + apertureWidth/2, allApertureCentreY[1] - apertureWidth/2 + apertureWidth/4);
					ctx.lineTo(allApertureCentreX[1] + apertureWidth/2, allApertureCentreY[1] - apertureWidth/2)

					ctx.moveTo(allApertureCentreX[2] - apertureWidth/2, allApertureCentreY[2] + apertureWidth/2 - apertureWidth/4);
					ctx.lineTo(allApertureCentreX[2] - apertureWidth/2-apertureWidth/4, allApertureCentreY[2] + apertureWidth/2 - apertureWidth/4)
					
					ctx.moveTo(allApertureCentreX[2] - apertureWidth/2, allApertureCentreY[2] + apertureWidth/2 - apertureWidth/4);
					ctx.lineTo(allApertureCentreX[2] - apertureWidth/2, allApertureCentreY[2] + apertureWidth/2)
					

					ctx.strokeStyle = 'dodgerblue';
					ctx.stroke();
				} else if (dectype[dec_num] == 4){
					//draw an arrow
					ctx.beginPath();
					ctx.lineWidth = dec_arrow.arrow_body_thickness;
	
					ctx.moveTo(allApertureCentreX[1] + apertureWidth/2, allApertureCentreY[1]);
					ctx.lineTo(allApertureCentreX[3] - apertureWidth/2, allApertureCentreY[3]);
					
					ctx.lineWidth = dec_arw_display.arrow_head_thickness;
					ctx.moveTo(allApertureCentreX[1] + apertureWidth/2, allApertureCentreY[1]);
					ctx.lineTo(allApertureCentreX[1] + apertureWidth/2 + apertureWidth/8, allApertureCentreY[1]+apertureWidth/8)
					
					ctx.moveTo(allApertureCentreX[1] + apertureWidth/2, allApertureCentreY[1]);
					ctx.lineTo(allApertureCentreX[1] + apertureWidth/2 + apertureWidth/8, allApertureCentreY[1]-apertureWidth/8)

					ctx.moveTo(allApertureCentreX[3] - apertureWidth/2, allApertureCentreY[3]);
					ctx.lineTo(allApertureCentreX[3] - apertureWidth/2 - apertureWidth/8, allApertureCentreY[3]+apertureWidth/8)
					
					ctx.moveTo(allApertureCentreX[3] - apertureWidth/2, allApertureCentreY[3]);
					ctx.lineTo(allApertureCentreX[3] - apertureWidth/2 - apertureWidth/8, allApertureCentreY[3]-apertureWidth/8)

					ctx.strokeStyle = 'dodgerblue';						
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
				draw();
			}

			drawDecisionArrow();
		}


		//Draw the dots on the canvas after they're updated
		function draw() {

    		//Load in the current set of dot array for easy handling
    		var dotArray = dotArray2d[currentSetArray[currentApertureNumber]];

			//Loop through the dots one by one and draw them
			for (var i = 0; i < nDots; i++) {
				dot = dotArray[i];
				ctx.beginPath();
				ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2);
				ctx.fillStyle = dotColor;
				ctx.fill();
			}


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



      		}//End of if border === true


      					ctx.font = player_fonts;
						ctx.fillStyle = player_colours[player_position[currentApertureNumber]];
						ctx.textAlign = "center";
						ctx.fillText(player_ids[player_position[currentApertureNumber]], apertureCenterX, apertureCenterY);


		}//End of draw






		//Calculate a random x and y coordinate in the ellipse
		function resetLocation(dot) {

			//For circle and ellipse
			if (apertureType == 1 || apertureType == 2) {
				var phi = randomNumberBetween(-Math.PI, Math.PI);
				var rho = Math.random();

				x = Math.sqrt(rho) * Math.cos(phi);
				y = Math.sqrt(rho) * Math.sin(phi);

				x = x * horizontalAxis + apertureCenterX;
				y = y * verticalAxis + apertureCenterY;

				dot.x = x;
				dot.y = y;
			}
			//For square and rectangle
			else if (apertureType == 3 || apertureType == 4) {
				dot.x = randomNumberBetween((apertureCenterX) - horizontalAxis, (apertureCenterX) + horizontalAxis); //Between the left and right edges of the square / rectangle
				dot.y = randomNumberBetween((apertureCenterY) - verticalAxis, (apertureCenterY) + verticalAxis); //Between the top and bottom edges of the square / rectangle
			}

			return dot;
		}

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



		/*
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
