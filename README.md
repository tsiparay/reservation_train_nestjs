# reservation_train_nestjs
this is a version nestjs of reservation train, previously developped with nodejs and mongodb database. I combined several technologies like react, graphql with it.

first:
clone the repository,

npm install in root folder,

npm install in workspace/backend folder,

npm install in workspace/frontend folder

modify .env file, in frontend and backend, to connect your database mongodb url.

return in root folder
see package.json and run the command line that you want to run,
like this : npm run start:api:dev to run backend for developement;
and npm run start:app to run react frontend

if all ok,

to generate more billets of train,
switch in workspace/backend folder and
run this command
npm run generateBillets
you can see it in package json, paragraph scripts.

you can see on: http://localhost:3000/graphql
the playground graphql to simulate all request, query or mutation.

react is opened on http://localhost:3001/


