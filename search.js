document.getElementById('search-button').addEventListener('click',()=>{
   const username=document.getElementById('search-input').value
    console.log(username)
 if(username == ''){
  alert("Enter valid username");
 }else{
    const name={
        name:username,
    }
    console.log(name)
    fetch("/search",
    {
        method:"POST",
        headers:{
            "Content-type":"application/json"
         },
         body:JSON.stringify(name)
       })
       .then(response => response.json())
       .then(data => {
        console.log(data);
         })
 }

})

// document.getElementById('searchForm').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent default form submission

//     // Get the value of the input field
//     var searchTerm = document.getElementById('searchInput').value.trim();

//     // Perform AJAX request to handle form submission
//     var xhr = new XMLHttpRequest();
//     xhr.open('POST', '/search', true);
//     xhr.setRequestHeader('Content-Type', 'application/json');
//     xhr.onreadystatechange = function() {
//         if (xhr.readyState === XMLHttpRequest.DONE) {
//             if (xhr.status === 200) {
//                 // Handle successful response
//                 var response = JSON.parse(xhr.responseText);
//                 document.getElementById('searchResult').innerHTML = response.result;
//             } else {
//                 // Handle error response
//                 console.error('Error:', xhr.statusText);
//             }
//         }
//     };
//     xhr.send(JSON.stringify({ search: searchTerm }));
// });