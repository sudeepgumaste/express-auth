# Express Authenticaiton using JWT
### How to use
- Run this commands in terminal to install the dependencies

    ``` 
    npm install
    ```
- Create a .env file with following 
    ```
    PORT=[number that you wish the server to run on]
    DB_URI=[mongo db URI]

    ACCESS_TOKEN_SECRET=[secret key to sign access token with]

    REFRESH_TOKEN_SECRET=[secret key to sign refresh token with]

    VERIFY_TOKEN_SECRET=[secret key to sign email verification token with]

    HOSTED_URL=[url where server is hosted on]

    MAIL_ID=[Gmail ID to send verification mails from]
    MAIL_PASSWORD=[Gmail app password]
    ```
- Add verifyToken function from resources/auth/auth.middleware.js as middleware for protected routes

### Scripts available
- To start development server
    ```
    npm run-script watch
    ```
- To compile a production build
    ```
    npm run-script build
    ```
- To compile and start the server
    ```
    npm run-script start
    ```

### APIs available
- POST /api/auth/register
    - Headers
        content-type: application/json
    - Body
        ```
        {
            "email" : "test@example.com",
            "password" : "password",
            "name" : "testUser1"
        }  
        ```
    - Response
        ```
        {
             "msg": "Verification link has been sent to your email"
        }
        ```
    - Lifetime of access token is 5 min. Send the refresh token to get new access token
- POST /api/auth/login
    - Headers
        content-type: application/json
    - Body
        ```
        {
            "email" : "test@example.com",
            "password" : "password",
            "name" : "testUser1"
        }  
        ```
    - Response 
        ```
        {
            "accessToken" : "access token",
            "refreshToken" : "refresh token"
        }
        ```
- POST /api/auth/logout
    - Headers
        content-type: application/json
        authorization : Bearer [ Token ]
    - Body
        ```
        None
        ```
    - Response
        - Status 204 on success 500 oterwise

- POST /api/auth/refresh
    - Headers
        content-type: application/json
    - Body
        ```
        {
            "token" : "User's refresh token"
        }  
        ```
    - Response
        ```
        {
            "accessToken": "new access token"
        }
        ```
- GET /api/auth/:verifyToken
    - Headers
        ``` 
        none
        ```
    - Body
        ``` 
        none
        ```
    - Response
        ``` 
        {
            "msg" : "account verified"
        }
        ```


