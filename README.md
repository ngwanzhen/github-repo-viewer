
## Features
* able to autocomplete github usernames for popular users
* able to search by email or usernames and display list of closest match
* able to see list of projects and dates for each user
* able to expand and hide project's readme

## Note
* original design was to fetch readme once repo list was populated (for faster loading) but this resulted in rate limit issues so was moved to be only upon click

## To run project
```
npm run start
```

## To build for prod
```
npm run build
```

## About
This project is built in angular and makes use of the github api to fetch public users' repo, lists them out, and renders readme.

## Todo
* remove routing if not needed?
* add tests
* include oauth for private github users?
* make popular users a dynamic list
