if (document.location.search.match(/type=embed/gi)) {
  window.parent.postMessage("resize", "*");
}

window.console = window.console || function(t) {};

document.addEventListener("DOMContentLoaded", function(event) {
  var inputRange = document.getElementsByClassName('explanation-window__pullee')[0],
      maxValue = 150, // the higher the smoother when dragging
      speed = 12, // thanks to @pixelass for this
      currValue, rafID;

  // set min/max value
  inputRange.min = 0;
  inputRange.max = maxValue;


  // listen for unlock
  function unlockStartHandler() {
      // clear raf if trying again
      window.cancelAnimationFrame(rafID);
      
      // set to desired value
      currValue = +this.value;
  }

  function unlockEndHandler() {
      
      // store current value
      currValue = +this.value;
      
      // determine if we have reached success or not
      if(currValue >= maxValue) {
          successHandler();
      }
      else {
          rafID = window.requestAnimationFrame(animateHandler);
      }
  }

  // handle range animation
  function animateHandler() {
      
      // update input range
      inputRange.value = currValue;
      
      // determine if we need to continue
      if(currValue > -1) {
        window.requestAnimationFrame(animateHandler);   
      }
      
      // decrement value
      currValue = currValue - speed;
  }

  // handle successful unlock
  function successHandler() {
      document.getElementById("pass_window").style.display = "block";
      document.getElementById("explanation_window").style.display = "none";
      
      // reset input range
      inputRange.value = 0;
  };

  // bind events
  inputRange.addEventListener('mousedown', unlockStartHandler, false);
  inputRange.addEventListener('mousestart', unlockStartHandler, false);
  inputRange.addEventListener('mouseup', unlockEndHandler, false);
  inputRange.addEventListener('touchend', unlockEndHandler, false);  
});
