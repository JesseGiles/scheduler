# Interview Scheduler

**_Interview Scheduler_** is a **React** web app that allows users to book and cancel interviews in a fluid, _realtime_ experience.

Users are able to see a list of scheduled interviews for a selected day, and book an interview in an empty timeslot. Once a slot is chosen, users enter their name and select from a list of available interviewers. Once saved, the app will update to reflect the new interview appointment in that chosen timeslot, displaying the entered student name and selected interviewer, while updating the remaining interview spots for that day.

Users can also edit or delete existing interviews, are shown a status indicator for asynchronous operations, and error messages in the event of invalid form submissions or an issue connecting to the database.

This app was built as a project during the **_Lighthouse Labs Web Development Bootcamp_**. It was created primarily using **Create React App**; data is persisted by the **Express** API server via **Axios** connecting to a **PostgreSQL** database, meaning data is not lost on refresh of the app. Both servers run concurrently; requests are proxied from the Webpack development server to the API server.

Thorough unit, integration and E2E testing was created with a combination of **Jest**, **Storybook** and **Cypress**.

## Screenshots

!["Display daily interview slots"](https://github.com/JesseGiles/scheduler/blob/master/docs/show-daily-appointments.PNG?raw=true)

!["Booking new interview"](https://github.com/JesseGiles/scheduler/blob/master/docs/book-new-appointment.PNG?raw=true)

!["Async status message when deleting an interview"](https://github.com/JesseGiles/scheduler/blob/master/docs/async-deleting-appointment.PNG?raw=true)

## Setup

-Install dependencies with `npm install`.

-Fork and clone the [`scheduler-api`](https://github.com/lighthouse-labs/scheduler-api) into a new directory. Follow the README.md instructions to install dependencies, create the database, seed and run the server.

-Back in the scheduler director, run `npm start` to run the webpack development server. At this point, the client should be running on port 8000, and the API server on port 8001.

-Visit `http://localhost:8000` in the browser.

-If CORs errors are encountered, add `"proxy": "http://localhost:8001` to the package.json file in the main scheduler directory and restart the webpack server with `npm start`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

### Dependencies

- `"axios": "^0.20.0"`
- `"classnames": "^2.2.6"`
- `"normalize.css": "^8.0.1"`
- `"react": "^16.9.0"`
- `"react-dom": "^16.9.0"`
- `"react-scripts": "3.4.4"`
