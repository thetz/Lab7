
import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

//Make sure you register your service worker here too
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', function () {
//     navigator.serviceWorker.register('./sw.js').then(function (registration) {
//       // Registration was successful
//       console.log('ServiceWorker registration successful with scope: ', registration.scope);
//     }, function (err) {
//       // registration failed :(
//       console.log('ServiceWorker registration failed: ', err);
//     });
//   });
// }


document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      var index=0;
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        index++;
        newPost.no = index;
        newPost.addEventListener("click", function(){
          entry.page = `entry${newPost.no}`;
          entry.id = newPost.no;
          setState(entry);
        });
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);
      });
    });
});

window.onpopstate = function (event) {
  // checks for home page first, and then for the settings and event entry pages
  if (event.state == null) {
    router.sethome(false);
  } else if (event.state.page[0] == 'e') {
    router.setEntry(event.state);
  }
 else if (event.state.page[0] == 's') {
  router.setSettings();
 }}

document.querySelector('img').addEventListener("click", () => {
  setState({ page: "settings" });
});

document.querySelector('h1').addEventListener('click', function(){
  router.sethome(true);
});




