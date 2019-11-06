# named-day-delivery
A named day delivery service that uses react habitat to embed a react component into a pre-existing HTML page and serve it data from an asynchronous request.

# Get started
Clone the repo

Run ``` npm install ``` at the root

Run ``` npm start ```

The application will be available at localhost:3000

# Bundling the application

This application was designed to be served as a bundle. You can bundle the application by running ``` npm run build ```. This will create an optimized production build.

# How does it work?

The app was designed to be served as a react widget inside a pre-existing HTML page, effectively allowing us to build react components and insert them into a legacy frontend which could receive, handle and submit data to the legacy backend.

This is achieved using React Habitat. A target div is added to the HTML page. The bundle.js file is loaded which populates the target div with the new react component. The component is designed to work with an existing form on the page by rendering hidden inputs.
