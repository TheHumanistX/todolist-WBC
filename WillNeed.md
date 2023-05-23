# Various setup needs for this project

## Dependencies

* Material UI
* React Router DOM - For navigation
* fleek-storage-js - we will be using Fleek.co to host our web-app and also we will use it to add, remove, change todo list items such as tasks and task lists.
* react-grid-layout - ALlows for working with grid layout
* date-fns - for date/time formatting
* useForm - For form elements when adding or editing tasks 
* Third Web JS - General web3 connectivity
* RReact-dnd - ALlows for drag and drop capability to reorganize tasks or task lists if desired



## Installs

```
npm install @mui/material @mui/system @emotion/react @emotion/styled 
npm install react-router-dom
npm install date-fns
npm install react-hook-form
npm install @thirdweb-dev/react @thirdweb-dev/sdk ethers@^5
npm install @fleekhq/fleek-storage-js
npm install react-dnd react-dnd-html5-backend
```

## Font (Goes in /src/index.html)

```html
<link rel="preconnect" href="https://fonts.googleapis.com"> // Fonts typically one of the last things to be loaded 
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>  // This gets them loaded ahead so there are no layout shifts if the font loads late
<link href="https://fonts.googleapis.com/css2?family=Bruno+Ace+SC&display=swap" rel="stylesheet">
```