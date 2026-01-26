# student-directory-app

## Author
Andrea Maslucan Moreno

## Overview
Simple student directory with local persistence and a small user lookup demo. The app lets you add students with grades, prevents duplicates, shows the average, and pulls sample users to display details on click.

## Logic Flow (non-technical)
1. When the page opens, the app looks for any students saved earlier and shows them in the list.
2. It also brings in a list of sample users so you can click and see example details.
3. When you add a student, it checks that the name and grade make sense and that the name is not repeated.
4. If everything is OK, it adds the student, updates the count and average, and saves it for next time.
5. The address `https://jsonplaceholder.typicode.com/users` is where the app goes to get those sample users.
6. When you click a sample user, the app shows that user's details.

## Logic Flow (technical)
1. On load, the app reads saved students from `localStorage`, renders the list, and fetches demo users.
2. When adding a student, it validates name/grade, blocks duplicates via a normalized `Set`, updates the UI, and saves to `localStorage`.
3. After any data change, a render is required because the DOM does not update on its own; rendering repaints the list, counters, and average to match the current in-memory data.
4. The average grade is recalculated and displayed after each render.
5. The app calls the users API endpoint `https://jsonplaceholder.typicode.com/users` to fetch demo users.
6. Those users are stored in a `Map` and rendered as clickable buttons that reveal details.
7. It is an endpoint because it is a specific URL exposed by the API to retrieve a resource (the users list).
## ES6 Features Used
| Feature | Example line in `app.js` | Explanation |
| --- | --- | --- |
| `const`/`let` (block scope) | `const` on line 5, `let` on line 26 | Use `const` for values that don’t change and `let` for values that do. |
| Arrow functions | line 34 | Shorter function syntax for helpers and callbacks. |
| Template literals | line 89 | Build strings with embedded values. |
| Destructuring | line 223 | Extract user fields from an object in one line. |
| `Set` | line 27 | Track unique student names to prevent duplicates. |
| `Map` | line 29 | Store users by ID for quick lookup. |
| `for...of` | line 207 | Iterate through `Map` entries in order. |
| `async/await` | `async` on line 243, `await` on line 246 | Handle the fetch request in a readable way. |
| Optional chaining | line 238 | Avoid errors when nested data is missing. |
| Nullish coalescing | line 238 | Provide a fallback when a value is `null` or `undefined`. |
