  // selecting the container with all the time-rows at once
  var taskDisplayEl = $('#all-tasks');



  // dayjs api used for displaying current local time inside header and getting current-hour value
  var todayDate = dayjs().format('h:mm a, dddd, MMMM DD');
  $('#currentDay').text(todayDate);

  var currentHour = dayjs().hour();  
 
  // returns a single object with all the hour-x rows 
  var allTimeRows = $('.time-block');

  // loops through all the hour-x rows 
  for (let i = 0; i < allTimeRows.length; i++) {
    // gets the hour associated with the row
    var getHour = Number(allTimeRows[i].id.split('-')[1]);
    // compares hour-of-row to current-hour, to pass through conditions for setting 
    // the (past,present,future) class
    if (getHour < currentHour) {
      var addClass= allTimeRows[i].classList.add('past');
    }else if(getHour > currentHour) {
      var addClass = allTimeRows[i].classList.add('future');
    } else {
      var addClass = allTimeRows[i].classList.add('present');
    }
    
  }
// ---------------------------------------------------------------------------------------
// local storage-retrieval with display functions

  // saves data to local storage
  let saveTasksToStorage = function (dailyTasks) {
    localStorage.setItem('tasks', JSON.stringify(dailyTasks));
  }

  // reads data from local storage
  let readTasksFromStorage = function () {
    var dailyTasks = localStorage.getItem('tasks');

    if (dailyTasks) {
      dailyTasks = JSON.parse(dailyTasks);
    } else {
      dailyTasks = [];
    }
    return dailyTasks;
  }

  // save button handling when clicked
  let handleTaskSave = function () {   

    // obtains the data-index number of the targeted event
    var taskIndex = parseInt($(this).attr('data-index'));
    // calls an object with all text-area divs and indexes with button index to obtain
    // the respective value of the text-area
    var newTask = $('.text-area')[taskIndex].value;
    // reads the most current data in local storage 
    var dailyTasks = readTasksFromStorage();
    // uses the row index to update the local storage object
        dailyTasks[taskIndex] = newTask; 
    // saves the new task array to the local storage
    saveTasksToStorage(dailyTasks);
  } 

  // on page refresh, retrieves data from local storage and populates the time-rows
  let printTaskData = function () {
    var dailyTasks = readTasksFromStorage();

    for (let i = 0; i < dailyTasks.length; i++) {
      $('.text-area')[i].value = dailyTasks[i];      
    }
  }
  
  // event listener for save button, on-click will run the handleTaskSave function
  taskDisplayEl.on('click', '.saveBtn', handleTaskSave);
  
  // function to autorun at initial page load
  printTaskData();







