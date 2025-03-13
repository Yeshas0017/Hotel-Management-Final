# Hotel-Management-Final
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# Hotel Management System - React + Vite Project

This project is a hotel management system built with React and Vite. It allows users to book rooms, confirm bookings, and edit their bookings. This repository also includes automated testing using Jest and Cypress.

## Prerequisites

Before setting up the project, make sure you have the following installed:

- **Node.js** (v16 or later)
- **npm** (or **yarn**)

You can check if you have them installed by running:

```bash
node -v
npm -v
```

If not, install Node.js from [here](https://nodejs.org/).

## Setting up the Project

### 1. Clone the repository
Clone the repository to your local machine:

```bash
git clone https://github.com/Study-Program-Applied-Computer-Science/usability-testing-and-verification-newtest.git
cd your-repository-name
```

### 2. Install dependencies
To install all the necessary dependencies, run the following command:

```bash
npm install
```

Alternatively, if you're using yarn, run:

```bash
yarn install
```

## Running the Development Server
To start the development server, run the following command:

```bash
npm run dev
```

This will start the Vite development server, and you can view the project at http://localhost:5173

Alternatively, with yarn:

```bash
yarn dev
```

## Running Tests

### Jest Testing
Jest is used for unit and integration tests.

To run the Jest tests, use the following command:

```bash
npm run test
```

This will run all the Jest test cases in your project.

Alternatively, with yarn:

```bash
yarn test
```

To run tests in watch mode, where Jest re-runs tests as you modify them, run:

```bash
npm run test:watch
```

Or with yarn:

```bash
yarn test:watch
```

### Cypress Testing
Cypress is used for end-to-end tests.

To run the Cypress tests, use the following command:

```bash
npm run cy:open
```

This will open the Cypress Test Runner, where you can select the tests you want to run.

Alternatively, with yarn:

```bash
yarn cy:open
```

To run Cypress tests in headless mode (without opening the Test Runner), run:

```bash
npm run cy:run
```

Or with yarn:

```bash
yarn cy:run
```

## Custom Test Scripts
You can configure additional test scripts in your `package.json` file. By default, the following scripts are available:

- **test**: Run Jest tests.
- **test:watch**: Run Jest tests in watch mode.
- **cy:open**: Open the Cypress Test Runner.
- **cy:run**: Run Cypress tests in headless mode.

## Running Tests in CI/CD

If you're using Continuous Integration/Continuous Deployment (CI/CD), you can configure your CI pipeline to run the tests automatically. This repository includes test scripts compatible with services like GitHub Actions, GitLab CI, CircleCI, etc.

## Folder Structure
Here is an overview of the project's folder structure:

```bash
/node_modules         # Project dependencies
/public               # Public assets (index.html, favicon, etc.)
/src                  # Source code
  /components         # React components
  /pages              # React page components
  /tests              # Test files (Jest & Cypress)
    /unit             # Jest unit test files
    /e2e              # Cypress end-to-end test files
/vite.config.js       # Vite configuration
/package.json         # Project metadata and scripts
```

