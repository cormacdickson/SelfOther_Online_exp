// this is the empty schdule we pass to the timline block so it knows how many trials we want
var main_sch = [
  {}, //trial 1
  {}, //trial 2
  {}, //trial 3
  {}, //trial 4
  {} //trial 5
  ];

  // each element {} represents one trial, scale the number of elements to equal the number of trials we want to have in the main block
  // by adding momore rows.
  // each element is empty because we now assign the trial variables within the trial node.
  // (its a hack but works as a quick fix)

// these are the actual schedules
var main_sch_1 = [
  {
    "S_perf": [0,0,1,0,0,0],
    "P_perf": [0,1,0,1,0,0],
    "O1_perf": [1,0,0,0,0,1],
    "O2_perf": [0,1,0,0,1,0],
    "dectype": [1,3],
    "outcomeEngage": [2,1],
  },
  {
    "S_perf": [1,0,0,1,0,1],
    "P_perf": [1,1,1,0,0,1],
    "O1_perf": [0,1,0,1,0,1],
    "O2_perf": [0,0,1,0,1,0],
    "dectype": [2,3],
    "outcomeEngage": [1,-2],
  },
 {
   "S_perf": [0,1,0,0,1,0],
   "P_perf": [0,1,0,0,1,0],
   "O1_perf": [0,0,0,1,0,1],
   "O2_perf": [0,1,1,0,0,1],
   "dectype": [3,3],
   "outcomeEngage": [-3,2],
  },
  {
    "S_perf": [0,1,1,1,1,0],
    "P_perf": [0,1,1,0,0,0],
    "O1_perf": [1,0,0,1,0,0],
    "O2_perf": [0,0,0,0,0,0],
    "dectype": [4,3],
    "outcomeEngage": [2,3],
  },
  {
    "S_perf": [0,0,0,0,0,0],
    "P_perf": [0,0,0,0,0,0],
    "O1_perf": [0,0,0,0,0,0],
    "O2_perf": [0,0,0,0,0,0],
    "dectype": [1,3],
    "outcomeEngage": [2,-3],
  }
  ];


  var main_sch_2 = [
  {
    "S_perf": [0,0,1,0,0,0],
    "P_perf": [0,1,0,1,0,0],
    "O1_perf": [1,0,0,0,0,1],
    "O2_perf": [0,1,0,0,1,0],
    "dectype": [1,3],
    "outcomeEngage": [2,1],
  },
  {
    "S_perf": [1,0,0,1,0,1],
    "P_perf": [1,1,1,0,0,1],
    "O1_perf": [0,1,0,1,0,1],
    "O2_perf": [0,0,1,0,1,0],
    "dectype": [2,3],
    "outcomeEngage": [1,-2],
  },
 {
   "S_perf": [0,1,0,0,1,0],
   "P_perf": [0,1,0,0,1,0],
   "O1_perf": [0,0,0,1,0,1],
   "O2_perf": [0,1,1,0,0,1],
   "dectype": [3,3],
   "outcomeEngage": [-3,2],
  },
  {
    "S_perf": [0,1,1,1,1,0],
    "P_perf": [0,1,1,0,0,0],
    "O1_perf": [1,0,0,1,0,0],
    "O2_perf": [0,0,0,0,0,0],
    "dectype": [4,3],
    "outcomeEngage": [2,3],
  },
  {
    "S_perf": [0,0,0,0,0,0],
    "P_perf": [0,0,0,0,0,0],
    "O1_perf": [0,0,0,0,0,0],
    "O2_perf": [0,0,0,0,0,0],
    "dectype": [1,3],
    "outcomeEngage": [2,-3],
  }
  ]


//etc
//add aditional schedules here to make up a total of 56 possible schedules hich we choose from depending on the participants performance