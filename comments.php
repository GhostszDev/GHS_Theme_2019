<section class="ghs_comments">
    <div class="container">

        <div class="col-md-12">

            <?php if ( have_comments() ) : ?>

                <?php foreach (get_comments(array('parent' => '0')) as $comment): ?>

                    <div class="row mb-4 ghs_comment">
                        <div class="col-md-2 mb-4">
                            <img src="<?php echo get_avatar_url($comment->user_ID) ?>" class="rounded-circle">
                        </div>
                        <div class="col-md-10 p-2">
                            <h6 class="ghs_title"><?php echo ucwords($comment->comment_author) ?> <p class="lead"><?php echo date('M d, Y h:i A', strtotime($comment->comment_date)) ?></p></h6>
                            <p><?php echo $comment->comment_content ?></p>


                            <?php foreach (get_comments(array('parent' => $comment->comment_ID)) as $comment_reply): ?>

                                <div class="row my-4 ghs_comment">
                                    <div class="col-md-2 mb-4">
                                        <img src="<?php echo get_avatar_url($comment_reply->user_ID) ?>" class="rounded-circle">
                                    </div>
                                    <div class="col-md-10 p-2">
                                        <h6 class="ghs_title"><?php echo ucwords($comment_reply->comment_author) ?> <p class="lead"><?php echo date('M d, Y h:i A', strtotime($comment->comment_date)) ?></p></h6>
                                        <p><?php echo $comment_reply->comment_content ?></p>
                                        <div class=""></div>
                                    </div>
                                </div>

                            <?php endforeach; ?>

                        </div>
                    </div>

                <?php endforeach; ?>

            <?php endif; ?>

        </div>
    </div>
</section>