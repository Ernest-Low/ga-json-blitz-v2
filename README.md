# JSON Blitz V2
### JQuery | Nodejs

This project is an enhanced version of the [first game](https://github.com/Ernest-Low/ga-json-blitz). Now, it has expanded to fullstack with NodeJS, as well as having additional functionalities.

## Features

### **1. NodeJS Backend Server**
- The server does not intrude in the gameplay at the moment as it's still a Single player experience, and is completely optional
- It incorporates user accounts with JSON Web Token (JWT) Authentication
- The main use for the backend is for saving game files, as well as uploading & sharing mod support files.

### **2. Spritesheets and Animations**
- With the addition of spritesheets, the file size of the frontend is now a lot smaller.
- It also opens the possibility of mass-uploading images, and more detailed character animations in the future.
- The addition of Green Sock Animation Platform (GSAP) helps make animations smoother and better, as well as opening more complex animation opportunities.

### **3. Truly JSON Based**
- By shifting the game data to all come from a JSON file, this has turned from a simple RPG, into a create-your-own-rpg style.
- This means that by changing or even uploading their own JSON file, players can have a very different experience.
- Ideally, it should come with an inbuilt editor to ease the experience of making their own adventure. Maybe in the future.

### **4. Expanding features**
- Of course an update comes with extra gameplay features, such as the character select screen (with a cool animation!), more levels and items.
- Would be nice to add more... but ran out of time for now.
- Would like to remake the project in future, stay tuned.

## Technology Stack
- **Programming Language**: Javascript
- **Framework**: JQuery for Frontend, NodeJS for Backend
- **Database**: MongoDB
- **Authentication**: JSON Web Token (JWT)

### Other Dependencies
- `bcrypt` (Password hashing)
- `cors` (Cross-Origin Resource Sharing)
- `mongoose` (Connection to MongoDB)
- `dotenv` (Environment variables)
- `axios` (HTTP Client)
- `gsap` (Green Sock Animation Platform (GSAP))

#### Credit for all the image assets used goes to my good friend `Siddharth Karmakar`, they're all original work made for this project.
