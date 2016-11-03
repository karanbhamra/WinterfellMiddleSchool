/**
 * Created by Karan and Armenak on 5/10/16.
 */
/*jslint devel: true */


// Handles the hovering effect of student images
document.getElementById('student').addEventListener("mouseover", newStudentPic);
document.getElementById('student').addEventListener("mouseout", studentPic);

//set focus to first form element when user clicks the form pic
document.getElementById('formpic').addEventListener("click", formFocus);

// Handles submit button
document.getElementById('submit').addEventListener("click", submitButton);

// Handles reset button
document.getElementById('reset').addEventListener("click", resetButton);


// contains list of students that will be absent for the given day
// used for a report
var students = [];

// list of required form elements
var formElements = ["name", "number", "key", "grade", "parentName", "tel", "email", "reason"];

function formFocus() {
    document.getElementById('name').focus();
}


// new section1 picture on hover
function newStudentPic() {
    document.getElementById('student').src = "images/students2.jpg";
}

// initial section1 picture
function studentPic() {
    document.getElementById('student').src = "images/students.png";
}


// check if a given string is empty
function isEmpty(str) {
    return (!str || str.length === 0);
}

// checks to make sure entries are not empty, and that key is "valid"
function submitButton() {
    checkRequiredEntries();

    var checkResult = checkSecretKey();
    if (checkResult == true) {  // valid key
        var child = {   // create child object with the form values
            sName: getValue("name"),
            sDayMissed: getValue("number"),
            sGrade: getValue("grade"),
            sParent: getValue("parentName"),
            sPhone: getValue("tel"),
            sEmail: getValue("email"),
            sReason: getValue("reason"),
            sKey: getValue("key")
        };

        students.push(child);   // add child to list of absentees

        //console.log("total students: " + students.length);
        //console.log("name: " + child.sName);

        alert("Absence reported. Thank you.");
    }
    else {
        alert("Invalid Security Key!")
        return;
    }

    generateReport();

}

// Generates a report (in actuality it would be server side but for demonstration it is client side)
// Should be once daily in production
function generateReport() {

    console.log("********** REPORT **********")
    for (var i = 0; i < students.length; i++) {
        console.log("Student #" + (i + 1));
        console.log("Student name: " + students[i].sName);
        console.log("Guardian name: " + students[i].sParent);
        console.log("Days absent: " + students[i].sDayMissed);
        console.log("Absent reason: " + students[i].sReason);
        console.log();
    }

}

// a fast dirty solution to check if valid key or not, only accepts evens
function checkSecretKey() {
    if (!isEmpty(getValue("key")) && Number(getValue("key")) % 2 == 0)
        return true; //valid
    else
        return false; //invalid

}

// make sure required entries in form aren't empty
function checkRequiredEntries() {
    if (isEmpty(getValue("name"))) {
        alert("Student name is required.");
    }
    else if (isEmpty(getValue("number"))) {
        alert("Number of days absent is required.");
    }
    else if (isEmpty(getValue("key"))) {
        alert("Secret key is required.");
    }
    else if (isEmpty(getValue("grade"))) {
        alert("Student's grade is required.");
    }
    else if (isEmpty(getValue("tel"))) {
        alert("Parent/Guardian's telephone number is required.");
    }
    else if (isEmpty(getValue("reason"))) {
        alert("A valid reason for absence is required.");
    }

}


// loop through all form ids and clear them and set focus back to the start of form
function resetButton() {

    for (var i = 0; i < formElements.length; i++) {
        setValue(formElements[i], "");
    }

    formFocus();

}

// Sets value for given id for element with a new value
function setValue(elementId, newValue) {

    document.getElementById(elementId).value = newValue;

}

// gets the value of the given element by id
function getValue(elementId) {
    var temp = document.getElementById(elementId).value;
    return temp;
}