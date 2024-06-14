"use strict";

//PROJECT INFO

//UPLAODED IMAGE

const uploadedImg = document.querySelector(".project-image-upload-input");
const placeHolderImage = document.querySelector(".project-img");

//PROJECT START DATE
const headerDate = document.querySelector(".header-date");
const projectStartDate = document.querySelector(".project-start-date-input");
const projectEndDate = document.querySelector(".project-end-date-input");

// SELECTED PLATFORM
const selectedPlatform = document.querySelector(".platform-field-input");

//HEADER ICONS
const headerLeftTextIcons = document.querySelectorAll(".header-left-text-icon");

//PROJECT NAME SELECTION
const projectNameInput = document.querySelector(".project-name-field-input");
const projectName = document.querySelector(".title-project-name");

// PRIMARY STATS
const totalViews = document.querySelector(".total-views-number");
const totalShares = document.querySelector(".total-shares-number");
const timeOpen = document.querySelector(".time-open-number");

const totalViewsInput = document.querySelector(".total-views-field");
const totalSharesInput = document.querySelector(".total-shares-field");
const timeOpenInput = document.querySelector(".time-open-field");

// COUNTRY STATS
const inputFieldButton = document.querySelector(".input-field-button");
const exportButton = document.querySelector(".export-button");

const countryGraphColumns = document.querySelectorAll(".country-graph-column");
const countryPercentages = document.querySelectorAll(".country-percentage");

const countryNames = document.querySelectorAll(".country-name");
const countryNamesInputs = document.querySelectorAll(
  ".country-name-input-field"
);

const countryPercentageInputs = document.querySelectorAll(
  ".country-percentages-input-field"
);

const countryGraphContainer = document.querySelector(
  ".country-graph-container"
);
const countryGraphLinesContainer = document.querySelector(
  ".country-graph-lines-container"
);

// AGE GENDER

const allWomenPercentage = document.querySelector(".all-women-percentage");
const allMenPercentage = document.querySelector(".all-men-percentage");

const allWomenPercentageInput = document.querySelector(
  ".all-women-percentage-input"
);
const allMenPercentageInput = document.querySelector(
  ".all-men-percentage-input"
);

const ageGenderGraphColumn = document.querySelectorAll(
  ".age-gender-graph-column"
);
const ageGenderInputs = document.querySelectorAll(".age-gender-input-field");
const ageGenderPercentages = document.querySelectorAll(".age-gender-subtext");

const exportCanvas = document.querySelector(".export-canvas");

function getInputValues() {
  // HEADER PLATFORM SELECTION
  const platformSel = selectedPlatform.value;
  console.log(headerLeftTextIcons);
  for (const [index, value] of headerLeftTextIcons.entries()) {
    headerLeftTextIcons[index].classList.add("disabled");
    if (headerLeftTextIcons[index].classList.contains(platformSel)) {
      headerLeftTextIcons[index].classList.remove("disabled");
    }
  }

  // AGE - GENDER GRAPH AND GRAPH LINES
  const ageGenderGraphContainer = document.querySelector(
    ".age-gender-graph-container"
  );
  const ageGenderGraphLinesContainer = document.querySelector(
    ".age-gender-graph-lines-container"
  );

  //GET PROJECT START - END DATES
  headerDate.textContent = `${formatDate(
    projectStartDate.value
  )} - ${formatDate(projectEndDate.value)}`;

  // GET PROJECT NAME
  projectName.textContent = `${titleCase(projectNameInput.value)} |`;

  // GET TOTAL VIEWS
  totalViews.textContent = totalViewsInput.value;

  // GET TOTAL SHARES
  totalShares.textContent = totalSharesInput.value;

  // GET TIME OPEN
  timeOpen.textContent = `${timeOpenInput.value}`;

  // GET COUNTRY NAME INPUTS

  for (const [index, content] of countryNamesInputs.entries()) {
    countryNames[index].textContent = CapitalCaseNameFormat(
      countryNamesInputs[index].value
    );
  }

  // GET AGE GENDER PERCENTAGE INPUTS

  //ALL WOMEN - ALL MEN

  allWomenPercentage.textContent = `All Women ${allWomenPercentageInput.value}%`;
  allMenPercentage.textContent = `All Men ${allMenPercentageInput.value}%`;

  // AGE GENDER TEXTS

  for (const [index, content] of ageGenderPercentages.entries()) {
    ageGenderPercentages[
      index
    ].textContent = `${ageGenderInputs[index].value}%`;
  }

  // COUNTRY PERCENTAGE TEXTS

  for (const [index, num] of countryPercentageInputs.entries()) {
    countryPercentages[index].textContent = `${num.value}%`;
  }

  // COUNTRY GRAPH

  let countryArr = [];
  for (const [index, num] of countryPercentages.entries()) {
    countryArr.push(countryPercentageInputs[index].value);
  }

  const countryMaxValue = Math.max(...countryArr);
  const countryRatio = 100 / countryMaxValue;

  for (const [index, num] of countryPercentages.entries()) {
    let calcValueCountry =
      Math.round(countryPercentageInputs[index].value * -1 * countryRatio) - 2;
    console.log(calcValueCountry);
    countryGraphColumns[index].style.gridRow = `${calcValueCountry} / span 102`;
  }

  //COUNTRY GRAPH LINES
  const countryGraphContainerHeight = parseFloat(
    getComputedStyle(countryGraphContainer).height
  );
  console.log(countryGraphContainerHeight);
  const countryflexGap = (countryGraphContainerHeight / countryMaxValue) * 10;
  countryGraphLinesContainer.style.gap = `${countryflexGap - 1}px`;

  // AGE GENDER GRAPH

  let ageGenderArr = [];
  for (const [index, num] of ageGenderPercentages.entries()) {
    ageGenderArr.push(ageGenderInputs[index].value);
  }

  const ageGenderMaxValue = Math.max(...ageGenderArr);
  const ageGenderRatio = 100 / ageGenderMaxValue;

  for (const [index, num] of ageGenderPercentages.entries()) {
    let calcValue02 =
      Math.round(ageGenderInputs[index].value * -1 * ageGenderRatio) - 2;
    console.log(calcValue02);
    ageGenderGraphColumn[index].style.gridRow = `${calcValue02} / span 102`;
  }

  //AGE - GENDER GRAPH LINES
  const ageGenderGraphContainerHeight = parseFloat(
    getComputedStyle(ageGenderGraphContainer).height
  );
  const ageGenderLinesflexGap =
    (ageGenderGraphContainerHeight / ageGenderMaxValue) * 10;
  ageGenderGraphLinesContainer.style.gap = `${ageGenderLinesflexGap - 1}px`;

  // END OF FUNCTION HERE
}

inputFieldButton.addEventListener("click", function () {
  getInputValues();
});

countryGraphColumns.forEach(function (e) {
  e.style.gridRow = `1 / span 102`;
});

function saveimg() {
  exportCanvas.getContext("2d");
  window.location.href = image;

  window.open("", exportCanvas.toDataURL());
}

exportButton.addEventListener("click", function (e) {
  e.preventDefault();
  html2canvas(document.getElementById("capture"), { scale: 4 }).then(
    (canvas) => {
      // Create an anchor element to initiate the download
      let link = document.createElement("a");
      link.href = canvas.toDataURL("image/jpeg");
      if (projectNameInput.value) {
        link.download = `${transformStringForExport(
          projectNameInput.value
        )}_Project_Report.jpg`;
      } else {
        link.download = `Project_Report.jpg`;
      }
      link.click();
    }
  );
});

exportButton.addEventListener("submit", function (e) {
  e.preventDefault();
});

function formatDate(dateStr) {
  const [year, month, day] = dateStr.split("-");
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthNames[parseInt(month) - 1];
  const formattedDate = `${monthName} ${parseInt(day)}, ${year}`;
  return formattedDate;
}

const inputDate = "2017-06-01";
const outputDate = formatDate(inputDate);
console.log(outputDate); // Output: June 1, 2017

// CHANGE IMAGE TO UPLOADED ONE
uploadedImg.addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      placeHolderImage.src = e.target.result;
    };

    reader.readAsDataURL(file);
  }
});

function transformStringForExport(input) {
  let lowerCaseString = input.toLowerCase();
  let capitalizedString = lowerCaseString.replace(/\b\w/g, (char) =>
    char.toUpperCase()
  );
  let finalString = capitalizedString.replace(/\s+/g, "_");
  return finalString;
}

function CapitalCaseNameFormat(input) {
  let lowerCaseString = input.toLowerCase();
  let capitalizedString = lowerCaseString.replace(/\b\w/g, (char) =>
    char.toUpperCase()
  );
  return capitalizedString;
}

function titleCase(input) {
  const minorWords = [
    "a",
    "an",
    "and",
    "as",
    "at",
    "but",
    "by",
    "for",
    "if",
    "in",
    "nor",
    "of",
    "on",
    "or",
    "so",
    "the",
    "to",
    "up",
    "yet",
    "with",
  ];
  let lowerCaseString = input.toLowerCase();
  let words = lowerCaseString.split(" ");

  let titleCasedWords = words.map((word, index) => {
    if (index === 0 || !minorWords.includes(word)) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    } else {
      return word;
    }
  });

  return titleCasedWords.join(" ");
}
