// function changeImageStatus(e) {
// 	// this is the id of the form
// 	$("#imageStatus").submit(function(e) {

// 	    var url = "/image_changeStatus"; // the script where you handle the form input.

// 	    $.ajax({
// 	           type: "POST",
// 	           url: url,
// 	           data: $("#imageStatus").serialize(), // serializes the form's elements.
// 	           success: function(data)
// 	           {
// 	               alert(data); // show response from the php script.
// 	           }
// 	         });

// 	    e.preventDefault(); // avoid to execute the actual submit of the form.
// 	});
// }


// window.onload = function() {

// 	$("#changeStatus")[0].addEventListener('click', function(e){
// 		// e.preventDefault();
// 		// console.log(e)

// 		// $("#imageStatus")[0].submit(function(){
// 		//     e.preventDefault();
// 		//     console.log(this.data);
// 		//     changeImageStatus(e);
// 		//   });

// 		changeImageStatus();
// 	})
// } 
