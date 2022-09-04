// {
//     // method to submit the form data for new post using AJAX
//     let createComments=function(){
//         console.log('hello');
//         let newCommentForm=$(`#post-${post._id}-comments-form`);
//         newCommentForm.submit(function(e){
//             e.preventDefault();
//             $.ajax({
//                 type:'post',
//                 url:'/comments/create',
//                 data:newCommentForm.serialize(),
//                 success:function(data){
//                     let newComment=newCommentDom(data.data.comment);
//                     $('#post-comments-<%= post._id %>').prepend();
//                 },
//                 error:function(err){
//                     console.log(err.responseText);
//                 }
//             })
//         })
//     }

//     let newCommentDom=function(comment){
//         return $(`<li>

//         <p>
          
//             <small>
//               <a href="/comments/destroy/${comment.id}">delete com</a>
//             </small>
    
    
//             ${comment.content}
//           <br>
//           <small>
//           ${comment.user.name}
//           </small>
//         </p>
//       </li>`)
//     }

//     createComments();
// }