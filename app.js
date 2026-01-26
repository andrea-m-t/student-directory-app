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



/*----------------------------- Helpers -------------------------*/
const normalizeName = (name) => name.trim().toLowerCase();

const showMessage = (text, type = "ok") => {
  formMsg.textContent = text;
  formMsg.classList.remove("ok", "err");
  formMsg.classList.add(type === "err" ? "err" : "ok");
};

const clearMessage = () => {
  formMsg.textContent = "";
  formMsg.classList.remove("ok", "err");
};

const showToast = (text) => {
  toast.textContent = text;
  toast.classList.remove("show"); // reset animation
  // force reflow so the animation restarts
  void toast.offsetWidth;
  toast.classList.add("show");
};

const calculateAverage = (arr) => {
  if (arr.length === 0) return null;
  const total = arr.reduce((sum, s) => sum + s.grade, 0);
  return total / arr.length;
};

const updateAverageUI = () => {
  const avg = calculateAverage(students);
  avgGradeEl.textContent = "Average Grade";
  if (!avgValueEl) return;

  const avgText = avg === null ? "0" : String(Math.round(avg));
  avgValueEl.textContent = avgText;
  if (avgGradeTopEl) {
    avgGradeTopEl.textContent = `Average Grade: ${avgText}`;
  }
};

const renderStudents = () => {
  studentsContainer.innerHTML = "";

  if (students.length === 0) {
    studentsContainer.innerHTML = `<p class="muted">No students yet. Add the first one!</p>`;
    studentCountEl.textContent = "0";
    updateAverageUI();
    return;
  }

  const fragment = document.createDocumentFragment();

  students.forEach(({ name, grade }) => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <span><strong>${name}</strong></span>
      <span class="badge">${grade}</span>
    `;
    fragment.appendChild(div);
  });

  studentsContainer.appendChild(fragment);
  studentCountEl.textContent = String(students.length);
  updateAverageUI();
};

const saveToLocalStorage = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
};

const loadFromLocalStorage = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return;

    // rebuild Set + data
    students = parsed
      .filter((s) => s && typeof s.name === "string" && typeof s.grade === "number")
      .map((s) => ({ name: s.name, grade: s.grade }));

    studentNameSet.clear();
    students.forEach((s) => studentNameSet.add(normalizeName(s.name)));
  } catch {
    // If corrupted, ignore
  }
};


/*----------------------------- Students: Events -------------------------*/
studentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  clearMessage();

  const name = nameInput.value.trim();
  const grade = Number(gradeInput.value);

  if (!name || Number.isNaN(grade)) {
    showMessage("Please enter a valid name and grade.", "err");
    return;
  }

  if (grade < 0 || grade > 100) {
    showMessage("Grade must be between 0 and 100.", "err");
    return;
  }

  const key = normalizeName(name);
  if (studentNameSet.has(key)) {
    showMessage("Duplicate prevented! This student already exists.", "err");
    return;
  }

  // Add to data + Set
  studentNameSet.add(key);
  students.push({ name, grade });

  renderStudents();
  showMessage(`Added: ${name} (${grade})`, "ok");
  saveToLocalStorage();

  // (#B2:Add visual feedback when saving)
  showToast(`Saved ${students.length} student(s) to localStorage.`);

  // Reset inputs
  studentForm.reset();
  nameInput.focus();
});