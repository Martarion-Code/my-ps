# My React App

This project is a React application that displays transaction details using Ant Design components. It consists of several components and pages that work together to fetch and display transaction information.

## Project Structure

```
my-react-app
├── src
│   ├── components
│   │   └── TransactionDetail.jsx
│   ├── pages
│   │   └── TransactionDetailPage.jsx
│   └── index.jsx
├── package.json
├── tsconfig.json
└── README.md
```

## Components

### TransactionDetail

- **File:** `src/components/TransactionDetail.jsx`
- **Description:** This component receives transaction data as props and displays the details using Ant Design components.

### TransactionDetailPage

- **File:** `src/pages/TransactionDetailPage.jsx`
- **Description:** This component fetches transaction details from a database using an ID from the parameters and uses the `TransactionDetail` component to render the data.

## Entry Point

- **File:** `src/index.jsx`
- **Description:** This is the entry point of the application. It renders the main application component and sets up routing if necessary.

## Configuration Files

- **package.json:** Contains the configuration for npm, including dependencies and scripts.
- **tsconfig.json:** Configuration file for TypeScript, specifying compiler options and files to include in the compilation.

## Getting Started

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Start the application using `npm start`.

## License

This project is licensed under the MIT License.