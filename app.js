 "use strict"; //Enables strict mode to catch common JS mistakes

 
/*----------------------------- Config -------------------------*/
const STORAGE_KEY = "student_directory_students_v1";

/*----------------------------- DOM References -------------------------*/
const studentForm = document.getElementById("studentForm");
const nameInput = document.getElementById("studentName");
const gradeInput = document.getElementById("studentGrade");
const formMsg = document.getElementById("formMsg");

const studentsContainer = document.getElementById("studentsContainer");
const studentCountEl = document.getElementById("studentCount");
const avgGradeEl = document.getElementById("avgGrade");
const avgValueEl = document.getElementById("avgValue");
const avgGradeTopEl = document.getElementById("avgGradeTop");

const toast = document.getElementById("toast");

const usersContainer = document.getElementById("usersContainer");
const userCountEl = document.getElementById("userCount");
const userDetails = document.getElementById("userDetails");

/*----------------------------- Data Stores -------------------------*/
let students = []; // [{ name, grade }]
const studentNameSet = new Set(); // (#R3: prevent duplicates) --> normalized names 

const usersById = new Map(); // Map<id, user>