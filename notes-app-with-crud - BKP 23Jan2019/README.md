# notes-app

## Component breakdown and Hierarchy
```bash
View - 1
|__ NotesApp
|  |__Header
|  |  |__SearchBar
|  |__NotesContainer
|  |__NoteTaker
|  |__GridView
|  |  |__Note
|  |  |__Note ...
|  |__ListView
|  |  |__Note
|  |  |__Note ...
View - 2
|__EditNote
```
## Assignment PART-1

Create a view similar to keep.google.com Dashboard Page. Persist the Notes using JSON-SERVER.

## Steps to Setup the project
1. Fork this repository into your personal workspace.
2. Clone the forked repository.
3. run `npm install`
4. run `npm run start-json-server` (NOTE: json-server is running on PORT 8080 and NOT 3000)
5. run `npm run start`
6. open browser and type (`localhost:3000`)


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.