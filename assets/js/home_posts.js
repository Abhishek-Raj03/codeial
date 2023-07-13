{   // method to submit the form data for new post using AJAX
    let createPost=function(){
        let newPostForm=$('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url:'/posts/create',
                data:newPostForm.serialize(),
                success:function(data){
                    // console.log(data);
                   let newPost=newPostDom(data.data.post,data.data.name);
                   console.log(newPost)
                   $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button',newPost));
                    likePost($(' .like-post-button',newPost));
                    // deletePost($('.delete-post-button'));
                },
                error:function(err){
                    console.log(err.responseText);
                }
            })
        });
    }

    let createComment=function(postId){
        let newCommentForm=$(`#${postId}`)
        newCommentForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/comments/create',
                data:newCommentForm.serialize(),
                success:function(data){
                    let newComment=newCommentDom(data.data.comment,data.data.name);
                    console.log(newComment)
                    deleteComment($(' .delete-comment-button',newComment));
                    $('.post-comments-list>ul').prepend(newComment);
                },
                error:function(err){
                    console.log(err.responseText);
                }
            })
        })
    }

    // method to create a Comment in DOM
    let newCommentDom=function(comment,name){
        return $(`<li id="comment-${comment._id}">

        <p>
      <h6>
        ${ comment.content }
      </h6>
    
          <small style="margin: 0 0 5% 15%;">
            <i class="fa-regular fa-user"></i>
            <i>
              (${ name })
            </i>
          </small>
            <div style="margin-left: 5%; margin-top: -5%; display: inline-block;">
          <small>
              <a class="delete-comment-button" href="/comments/destroy/${ comment._id }" >  <i style="color: brown;" class="fa-solid fa-circle-minus"></i> </a>
            </small>
        </div>
         
        </p>
      </li>`)
    }

    //method to create a post in DOM
    let newPostDom=function(post,name){
      return $(`<li id="post-${post._id}" class="post-back" style="border-radius: 25px; padding: 25px; margin-top:3% ; max-height: 5%; max-width: 50vw;"> 
      <p style="margin-top: 0">
        <small style="margin-top: 500px;">
        <i class="fa-solid fa-user"></i>
        <i>
            <b>${name} </b>
            </i>
            
         </small>
         <br>
         <br>
         <h5>
        ${post.content}
        </h5>
        <br>    
    </p>
    <div style="margin-left: 80%; margin-top: -5%; display: inline-block;">
        <small >
            <a class="delete-post-button" href="/posts/destroy/${post._id}"><i class="fa-solid fa-trash" style="color: rgb(132, 38, 38); margin-top: 0;"> Delete Post </i></a>
        </small>
    </div>
    <script>
         document.getElementById("post-${ post._id}").style.backgroundColor="aquamarine"
        </script> 
        <br>
        <br>
        <small>
        <div style="margin-left: 80%; font-size: larger; ">
        <a class="like-post-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                0 <i class="fa-regular fa-thumbs-up"> </i> Like
        </a>
       </div>
     </small>
     <br>
     <br> 
     <div class="post-comments" style="margin-top: -10%;">
         <form action="/comments/create" method="POST">
            <input type="text" name="content" placeholder="comment here..">
            <input type="hidden" name="post" value="${post._id}">
            <button>Add comment</button>
         </form>
     
        <div class="post-comments-list">
         <ul id="post-comments-${post._id}">
     
         </ul>
        </div>
     
     </div>
      </li>`)
    }
   //method to delete a Comment from DOM
   let deleteComment=function(deleteLink){
    // console.log(deleteLink)
    $(deleteLink).click(function(e){
        console.log(deleteLink);

        e.preventDefault();
        $.ajax({
            type: 'get',
            url: $(deleteLink).prop('href'),
            success:function(data){
                $(`#comment-${data.data.comment_id}`).remove();
              return;
            },
            error:function(error){
                console.log(error.responseText);
            }
        })
    })
   }


   //method to delete a post from DOM
   let deletePost=function(deleteLink){
    console.log('Inside delete');

      $(deleteLink).click(function(e){
        console.log(deleteLink);

        e.preventDefault();

        $.ajax({
            type:'get',
            url:$(deleteLink).prop('href'),
            success:function(data){
              console.log(data);
              $(`#post-${data.data.post_id}`).remove();
              return;
            },
            error:function(error){
                console.log(error.responseText);
            }
        })
      })
   }

   let likePost=function(likeLink){
    // console.log('ihj');

    $(likeLink).click(function(e){
        
        e.preventDefault();

        $.ajax({
            
            type:'post',
            url:$(likeLink).prop('href'),
            success:function(data){
                console.log('Inside ajax');
              let likesCount = parseInt($(likeLink).attr('data-likes'));
              if (data.data.deleted == true){
                likesCount -= 1;
            $(likeLink).html(`${likesCount} <i class="fa-regular fa-thumbs-up"></i> Like`);
                
            }else{
                likesCount += 1;
            $(likeLink).html(`${likesCount} <i class="fa-sharp fa-solid fa-thumbs-up"></i> Like`);
            }
            $(likeLink).attr('data-likes', likesCount);
            // $(likeLink).html(`${likesCount} <i class="fa-regular fa-thumbs-up"></i>`);
            },
            error:function(error){
                console.log('error in Liking the post');
            }
        })
    })
}
let convertToAjax=function(){
    $('#posts-list-container>ul>li').each(function(){
      let self = $(this);
          let deleteButton = $(' .delete-post-button', self);
          let likeButton=$(' .toggle-like-button',self);
          deletePost(deleteButton);
          likePost(likeButton);
    })
  }
  // calling CreateComment function for each comment form
    $(' .post-comments>form').each(function(){
        let self=$(this);
        createComment(self[0].id);
    })
    $(' .post-comments-list>ul>li').each(function(){
        let self=$(this);
        let deleteButton=$(' .delete-comment-button',self);
        deleteComment(deleteButton);
    })
    createPost();
    convertToAjax();

}