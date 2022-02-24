# Nestjs Blog REST API With JWT
Build blog rest api with Authentication system using nestjs, postgresql

## Usage 
These instructions will get you a copy of the project up and running on your local machine

## Requirement 
- [nodejs](https://nodejs.org/en/)
- [postgresql](https://www.postgresql.org/)
- [nestjs](https://nestjs.com/)


## How To Use
From your command line, first clone the repository into your local machine:

```bash
# Clone this repository
$ git clone https://github.com/MezianeKhalil/Nestjs-Blog-REST-API-With-JWT.git
# Then go into the repository
$ cd Nestjs-Blog-REST-API-With-JWT
# Then remove current remote repository
$ git remote remove origin
```
## Install the dependencies:
```bash
# Install with NPM
$ npm install
```
# In the .env file
PORT = 3000
DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"
JWT_SECRET=""
```
Lastly launch the Project:
```bash
# Launch with NPM
$ npm run dev
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```