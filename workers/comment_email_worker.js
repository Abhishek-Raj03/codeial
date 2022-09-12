const queue=require('../config/kue');

const commentsMailer=require('../mailers/comments_mailer');

//assigning job to worker ('queue' is the name of worker);(name of job is 'emails')
queue.process('emails',function(job,done){
    console.log('emails worker is processing a job',job.data);
    commentsMailer.newComment(job.data);
    done();
})