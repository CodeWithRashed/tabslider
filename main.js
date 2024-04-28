var gap = 20; // Define the gap size
var btnArr = document.querySelectorAll(".btn");
var contentArray = document.querySelectorAll(".content");
var glider = document.querySelector(".glider");

btnArr.forEach(function (btn, index) {
  btn.addEventListener("click", function () {
    changeTab(index);
  });
});

function changeTab(index) {
  // Adding and Removing Active Class
  btnArr.forEach(function (btn, i) {
    if (i === index) {
      btn.classList.add("active");
    //   glider.style.transform = "translateX(" + (i) * 100 + "%)";
    } else {
      btn.classList.remove("active");
    }
  });

   // Get the active tab button
   var activeTabButton = btnArr[index];

   // Get the position of the active tab button
   var tabButtonRect = activeTabButton.getBoundingClientRect();
 
   // Calculate the position of the glider relative to the active tab button
   var gliderLeft = tabButtonRect.left + (tabButtonRect.width - glider.offsetWidth) / 3;
 
   // Set the position of the glider
   glider.style.left = gliderLeft + "px";
   glider.style.width = tabButtonRect.width + 20 + "px"
  var containerWidth = contentArray[0].parentNode.offsetWidth;
  var activeDivWidth = contentArray[index].offsetWidth;
  var centerOffset = (containerWidth - activeDivWidth) / 2;

  // Slide
  contentArray.forEach(function (content, i) {
    var translate;

    if (i === index) {
      translate = `${centerOffset}px`; // Translate the current tab based on index and gap
    } else {
      var translateValue = 0;
      var startIdx, endIdx, direction;

      if (i < index) {
        startIdx = i;
        endIdx = index - 1;
        direction = -1;
      } else {
        startIdx = index;
        endIdx = i - 1;
        direction = 1;
      }

      for (var j = startIdx; j <= endIdx; j++) {
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

changeTab(0);
