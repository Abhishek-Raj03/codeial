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
                    console.log(data);
                   let newPost=newPostDom(data.data.post);
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

    //method to create a post in DOM
    let newPostDom=function(post){
        return $(`<li id="post-${post._id}">
       
            <small>
                <a class="delete-post-button" href="/posts/destroy/${post._id}">delete</a>
            </small>
            <br>
            <br>
            
            <a class="like-post-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">0 <i class="fa-regular fa-thumbs-up"></i></a>
             
        <br>
        <br>  
    <p>
    ${post.content}
        <br>
        <small>
        ${post.user.name}
    
        </small>
    </p>
    <div class="post-comments">
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
            $(likeLink).html(`${likesCount} <i class="fa-regular fa-thumbs-up"></i>`);
                
            }else{
                likesCount += 1;
            $(likeLink).html(`${likesCount} <i class="fa-sharp fa-solid fa-thumbs-up"></i>`);
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


    createPost();
    convertToAjax();

}