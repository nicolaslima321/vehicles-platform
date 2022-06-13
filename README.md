# Shippify Challenge - Vehicle's Platform (Front-End)

### Overview
- That project is a Vehicle's Platform proposed as a Technical Test from Shippify company.

- It was developed using [ReactJS](https://reactjs.org/) along [NextJS](https://nextjs.org/), and with some components from the React UI library [MUI](https://mui.com/). (**Some** decisions will be explained more below).

- The platform haves the follow features
  - List vehicles by driver
  - Create a new vehicle
  - Update an existing vehicle
  - Delete a vehicle

### Setup
- To setup the project, you I'll need to have installed Node.JS (The minimal version is 12.3+, but I strongly recomend the stable v16)

- With NPM or Yarn, install the project dependenies.

```
npm install
```

- Then, run:

```
npm run dev
```

### Tests/Lint
- This topic will be commented in **"Things I could love to do"**

### Deploy
- The application was deployed on Vercel, and it is currently in production at https://shippify-nicolas-challenge.vercel.app/ already configurated to communicate with the API (That is also in production, vy Heroku) at https://shippify-nicolas-challenge.herokuapp.com/.

### Things I could love to do
- Because of the deadline, I couldn't create **Unit tests**, cause the "core" features of the project custed me the entire deadline. But its something essential for me, and one of the **extra things** that I initially planned to develop, and provide test coverage for all cases and the entire code. (The same applies for Back-End Project)

- Because of the same reason, I also couldn't create a **CI - Continuous Integration**, and also configure a **linter** with **eslint/react lint** (That also would be inside the CI). But its also something essential for me, and one of the **extra things** that I initially planned to develop.

- These things above are the most essentialy, that I wanted to document here. But also have some other minor "things" that would bee nice to do too.

### Some Decision
- Use components from MUI React library instead creating from scratch, was deciced also because of the deadline, to became faster and don't "waste much time" I focused in develop the core features and solve the problem proposed.

- Use NextJS instead React, was deciced to became faster and have things like the React Router already implemented, so it also helps me to focus on the core features and solve the problem proposed.
Just explaining, I feel myself confortable with React as the same way I feel with NextJs, it was only to became faster indeed, and also, I dont like SSR (Server Side Rendering) to solve that specific problem, NextJS and SSR was only used for that "agility" reason.