# *Re:source - Hub Client*

2/10/2021
React Application, Resourcehub Front-end
By **AJ Markow, Ben White, Chloe Hellberg**

Built as interns at  https://www.serverlessguru.com/

## Description

* React Frontend for an application to share resources for web developers.
    * Check the site out at [https://resource-hub.co](https://resource-hub.co/)
* Application where users can post & share helpful tech resources using a REST API backend with full CRUD functionality. AWS backend utilizing S3, DynamoDB, Lambda, Gateway & Cognito.

**_Images: 1. Landing Page 2. Component Diagram:_**
![](https://i.imgur.com/xJfI3Ly.png)
![](https://i.imgur.com/uyW82EN.png)
## Setup/Installation Requirements

**Interactive Development Environment**
To view or edit the document you will need a code/text editor. The popular open-source choices for a code editor are Atom and VisualStudio Code.

1. Code Editor Download:
    1. Option 1: Atom (https://atom.io/)
    2. Option 2: Visual Studio Code ([https://code.visualstudio.com/download)](https://code.visualstudio.com/download)
2. Click the download most applicable to your OS and system
3. Wait for download to complete, then install — Windows will run the setup exe and macOS will drag and drop into applications

**Setup and Use**

1. Click ‘Clone or Download’ to reveal the HTTPS url ending with .git and the ‘Download ZIP’ option
2. Open up your system Terminal or GitBash, navigate to your desktop with the command: ‘cd Desktop’, or whichever location suits you best
3. Clone the repository to your desktop: `$ git clone [https://github.com/ajmarkow/resourcehub-client`](https://github.com/ajmarkow/resourcehub-client)
4. Run the command `cd resourcehub-client` to enter into the project directory
5. View or Edit:
    1. Code Editor - Run the command  ‘atom .’ or ‘code .’ to open the project in Atom or VS Code respectively for review and editing
    2. Text Editor - Open by double clicking on any of the files to open in a text editor
6. In the project directory, type ‘npm install’ to download dependencies. After they install, type ‘npm start’ to run the application in development mode. Open [http://localhost:3000](http://localhost:3000/) to view it in the browser. Page will reload if you make edits. You will also see any lint errors in the console

### Application Secrets

* Several different secrets need to be defined in your environmental variables to host this application. They are listed as follows:

```
REACT_APP_API_REGION = your aws api hosting region
REACT_APP_URL = your aws api invoke url
REACT_APP_USER_POOL_ID = your aws cognito user pool id
REACT_APP_USER_POOL_ARN = your aws cognito user pool ARN
REACT_APP_CLIENT_ID = your cognito service client ID
REACT_APP_ID_POOL_ID = your cognito identity pool id
REACT_APP_BUCKET = name of S3 bucket to store attachments
REACT_APP_SPOTIFY_TOKEN = An api token obtained from spotify
```

* Additionally you’ll need a stripe publishable API key to set up the donation page on the frontend.

**Learn More**
This project was bootstrapped with Create-React-App (https://github.com/facebook/create-react-app)

* To learn more go to: [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started) or [React Documentation](https://reactjs.org/)

Serverless Stack was a big resource for learning how to build this application.

* To learn more go to: https://serverless-stack.com/

## Known Bugs

No known bugs at this time. Please report if you find any [here](https://github.com/ajmarkow/resourcehub-client/issues).

## Support and contact details

Ben White: https://github.com/BenW2140
AJ Markow: https://github.com/ajmarkow
Chloe Hellberg: https://github.com/chloehellberg

## Technologies Used

* AWS Services
    * Amplify
    * API Gateway
    * Cognito
    * IAM
    * Lambda
    * Route 
    * S3
* Frameworks / Runtime
    * Node.js
    * React
        * Create React App
    * [Serverless Framework](https://www.serverless.com/)
* Languages
    * CSS
    * HTML
    * JavaScript

### Dependencies

* [Axios](https://github.com/axios/axios)
* [jQuery](https://github.com/jquery/jquery)
* [React Bootstrap](https://github.com/react-bootstrap/react-bootstrap)
    * React Bootstrap Icons
* [React Hook Form](https://github.com/react-hook-form/react-hook-form)
* [React Lazy Load](https://github.com/loktar00/react-lazy-load)
* [React Scroll](https://github.com/milosjanda/react-scroll-up)
* [React Spotify Player](https://github.com/alexanderwallin/react-spotify-player)
* [React Star Rating Component](https://github.com/voronianski/react-star-rating-component)
* [React Stripe Elements](https://github.com/stripe/react-stripe-elements)
* [React Twitter Embed](https://github.com/saurabhnemade/react-twitter-embed)
* [React Youtube](https://github.com/tjallingt/react-youtube)

### License

[MIT License](https://opensource.org/licenses/MIT)

Copyright (c) 2021 **AJ Markow, Ben White, Chloe Hellberg**

