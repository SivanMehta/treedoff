[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)


# Getting Started

Right now the only external downloads you need to do get is [MongoDB](https://docs.mongodb.com/manual/installation/). After downloading the binary and getting the `mongod` command available to you, make a `data/db` folder in the root of this directory. To run the server, simply run `npm run start-mongo` to initialize the server. Otherwise the application server will not run.

# About Treedoff

### Inspiration

The problem that we are looking to solve is that arguments are too often poorly presented and interpreted, despite their inherent nuances. **Treedoff** (a portmanteau of tree and tradeoff), utilizes a tree data structure to provide a clearly scaffolded interpretation an argument.

### What it does

Treedoff's fundamental piece is a **statement**, each statement has a title, a basic summary, and a level of confidence. If a statement can be support or refuted by other statements, it will appear in the `pros` or `cons` fields of those statements.

### How we built it

We built a React.js application on the frontend to represent traversing through a statement tree. This allows us to explore complex arguments across browsers with a single code base. By using Material UI, a design framework for React, we circumvented the need for excessive styling and formatting, and were able to focus most of our time on optimizing fluid user interactions.

### Challenges we ran into

While all members of the team had familiarity or the problem set, no one had a complete mastery over both. Over the course of the hackathon, each team member grew their own skills to solve both technical and structural problems.

### Accomplishments that we're proud of

The tool that we built is actually _really_ easy to use. The learning curve is quite shallow, and mapping out your arguments in Treedoff becomes very fast with any remote familiarity.

### What we learned

Communication and proper version control is crucial. Getting clear practices for these down in the first few hours is key to avoiding nightmarish scenarios down the line when time becomes an issue.
