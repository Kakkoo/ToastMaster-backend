<img src="toast-master.png" alt="Filler Word Counter" width="60%">


# Filler-Word_Counter
Filler Word Counter. User can keep track of Filler Words (ah, um, so , ok....) in any particular meeting spoken by all speakers. Later user can see record too. Participants's can be added or removed too.

I built all aspects of this application, from the databases to the APIs, from the ground up. Features include responsive design, JWTToken authentication, password encryption,  and more. Data is passed between components utilizing Redux store.

## Video Walkthrough
[Video](https://www.youtube.com/watch?v=VjJGImwj6V8)

## See it Deployed
Deployed via Heroku at [Filler Words Counter](https://whispering-fjord-08994.herokuapp.com/)

## Installation

Running your own instance of this app will not connect with our users, posts, and profiles databases.  If you would still like to run this app:

1. Clone this repo to your local machine
2. For full functionality you will need to create a keys_dev.js file in the "config" folder containing: 
    - a mongoURI
    - secretOrKey
    - an email smtp
3. Run <code>npm install</code>
4. Run <code>npm run dev</code>

