const chalk = require("chalk");

function errorHandler(res, error) {
  let errorMsg = "";
  //MONGO VALIDATION ERRORS
  if (error.errors) {
    const errorArray = [];
    for (let i = 0; i < Object.values(error.errors).length; i++) {
      errorArray.push(Object.values(error.errors)[i]);
    }
    errorMsg = errorArray.join(". ") + "."; //final error msg
    // STANDARD ERROR
  } else if (error.code === 11000) {
    const key = Object.keys(error.keyValue)[0];
    errorMsg = key + " already taken";
    console.log(error);
  } else if (error.message) {
    errorMsg = error.message;
    console.log(error);
  } else {
    if (typeof error !== "string") {
      errorMsg = JSON.stringify(error);
    }
  }
  console.log(chalk.red(errorMsg));
  res.status(error.statusCode || 500).json({ errorMsg }); // remember to send an oject not a string!
}

export default errorHandler;
