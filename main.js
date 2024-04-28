let gap = 20; // Define the gap size
let btnArr = document.querySelectorAll(".btn");
let contentArray = document.querySelectorAll(".content");
let glider = document.querySelector(".glider");


// ADDING EVENT LISTENER TO ALL THE TABS //
btnArr.forEach(function (btn, index) {
  btn.addEventListener("click", function () {
    changeTab(index);
  });
});


/// ADDING AND REMOVING ACTIVE CLASS TO THE ACTIVE TAB ///
function changeTab(index) {
  btnArr.forEach(function (btn, i) {
    if (i === index) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });


  /// THIS CODES IS SLIDING THE GLIDER ON THE TABS ///

  // Getting the active tab button
  var activeTabButton = btnArr[index];

  // Setting the width of the glider to match the width of the active tab
  glider.style.width = activeTabButton.offsetWidth + gap + "px";


  // Setting the position of the glider to the left point of the active tab
  glider.style.left = activeTabButton.offsetLeft - (gap / 2) + "px";



  /// THIS CODES IS HELPING THE SLIDER TO SLIDE ON THE RIGHT POSITION ///
 
  // getting slider container width
  let containerWidth = contentArray[0].parentNode.offsetWidth;

  //getting active slider width
  let activeDivWidth = contentArray[index].offsetWidth;

  //calculating the center position of the slider
  let centerOffset = (containerWidth - activeDivWidth) / 2;

  // Sliding main func
  contentArray.forEach(function (content, i) {
    let translate;

    if (i === index) {
      // Translate the current slid based on index and gap
      translate = `${centerOffset}px`;
    } else {
      let translateValue = 0;
      let startIdx, endIdx, direction;

      //if the slide is on the left of the active slide adding -1 
      if (i < index) {
        startIdx = i;
        endIdx = index - 1;
        direction = -1;
      } else {
        startIdx = index;
        endIdx = i - 1;
        direction = 1;
      }

      //getting translate value of the active slider
      for (let j = startIdx; j <= endIdx; j++) {
        translateValue += contentArray[j].offsetWidth + centerOffset + gap; // Accumulate widths of previous or following content divs
      }

      // Adjust the calculation for negative direction (moving left)
      if (direction < 0) {
        translate = (translateValue - centerOffset * 2) * direction + "px"; // Add centerOffset for better alignment
      } else {
        translate = translateValue * direction + "px";
      }
    }

    // Apply the transform style to the current content element
    content.style.transform = "translateX(" + translate + ")";
  });
}

//this is making the first tab as active slide
changeTab(0);
