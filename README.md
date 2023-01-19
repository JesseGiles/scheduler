# Interview Scheduler

**_Interview Scheduler_** is a **React** web app that allows users to book and cancel interviews in a fluid, _realtime_ experience.

Users are able to see a list of scheduled appointments for a selected day, and book an interview in an empty timeslot. Once a slot is chosen, users enter their name and select from a list of available interviewers. Once saved, the app will update to reflect the new interview appointment in that chosen timeslot, displaying the entered student name and selected interviewer, while updating the remaining appointment spots for that day.

Users can also edit or delete existing appointments, are shown a status indicator for asynchronous operations, and error messages in the event of invalid form submissions or an issue connecting to the database.

This app was built as a project during the **_Lighthouse Labs Web Development Bootcamp_**. It was created primarily using **Create React App**; data is persisted by the **Express** API server via **Axios** connecting to a **PostgreSQL** database, meaning data is not lost on refresh of the app. Both servers run concurrently; requests are proxied from the Webpack development server to the API server.

Thorough unit, integration and E2E testing was created with a combination of **Jest**, **Storybook** and **Cypress**.

## Setup

Install dependencies with `npm install`.

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
