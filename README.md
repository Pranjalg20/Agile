# CampusConnect

A responsive front-end prototype for a campus events and clubs platform, built with **HTML, CSS and vanilla JavaScript**.

## Features
- Student sign-in / demo account creation
- Profile editing
- Browse, search and filter campus events
- Register for events
- Browse and join campus clubs
- Create and publish events
- Submit event feedback
- Personal activity dashboard

## Run locally
No build tools or package installation are required.

1. Download or clone this repository.
2. Open `index.html` in a modern browser.
3. For a local development server, use VS Code's Live Server extension or run `python -m http.server 5500` from the project folder and visit `http://localhost:5500`.

## Project structure
```text
CampusConnect/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
└── README.md
```

## Important demo limitations
This is a **front-end academic prototype**, not a production authentication system. Demo user details, event registrations, clubs and feedback are stored in the browser's `localStorage` on the current device. There is no backend, database, email verification, role-based access control or cross-device sync. Do not enter real passwords or sensitive personal information.

## Jira project
Project: CampusConnect  
Project key: `CAMPUS`

The UI provides a starting point for the Jira stories covering student accounts, event discovery, registration, clubs, event creation, attendance/feedback and activity summaries. Features such as organiser permissions and attendance recording still need to be expanded in later iterations.

## Suggested next steps
1. Commit this starter project to GitHub.
2. Add Jira issue keys to branch names and commit messages as work is implemented.
3. Build and test each sprint's stories incrementally.
