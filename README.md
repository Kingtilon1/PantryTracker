# Pantry Tracker
 [View Live Here](https://pantry-tracker-seven-iota.vercel.app/)
 

![Screenshot (259)](https://github.com/user-attachments/assets/640555e6-3d44-4d5a-b3fa-ae3d28fee0d1)
Pantry Tracker is a web application designed to help users keep track of their pantry items. Users can add, edit, and delete items, as well as search for specific items in their pantry. The application provides a user-friendly interface for managing pantry inventory efficiently.

## Technologies Used

- **Next.js**: The React framework used for building the front-end of the application.
- **Firebase**: Used for authentication and Firestore as the database to store pantry items.
- **Material-UI**: For designing the user interface components and styling.
- **Vercel**: For deploying the application. And for tracking performance metrics
- **Google Analytics**: For tracking user interactions with components.

## Features

- **User Authentication**: Users can sign up, log in, and log out.
- **CRUD Operations**: Users can create, read, update, and delete pantry items.
- **Search Functionality**: Users can search for specific items in their pantry.
- **Responsive Design**: The application is designed to be responsive and user-friendly.

## Setup and Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Kingtilon1/PantryTracker.git
    cd PantryTracker
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Configure Firebase:

    - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
    - Copy your Firebase config and paste it into a new file `firebase.js` in the `src` directory.

    ```javascript
    import { initializeApp } from 'firebase/app';
    import { getFirestore } from 'firebase/firestore';
    import { getAuth } from 'firebase/auth';

    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID",
      measurementId: "YOUR_MEASUREMENT_ID",
    };

    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);
    const auth = getAuth();
    export { firestore, auth };
    ```

4. Run the development server:

    ```bash
    npm run dev
    ```

5. Open your browser and navigate to `http://localhost:3000`.

## Deployment

The application is deployed on Vercel. You can view it [here](https://pantry-tracker-seven-iota.vercel.app/).


