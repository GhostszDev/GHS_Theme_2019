<section class="ghs_comments">
    <div class="container">

        <div class="col-md-12">

            <?php if ( have_comments() ) : ?>

                <?php foreach (get_comments(array('parent' => '0')) as $comment): ?>
                    <?php var_dump($comment); ?>

                    <div class="row mb-4 ghs_comment">
                        <div class="col-md-2 mb-4">
                            <img src="<?php echo get_avatar_url($comment->user_ID) ?>" class="rounded-circle">
                        </div>
                        <div class="col-md-10 p-2">
                            <h6 class="ghs_title"><?php echo $comment->comment_author ?></h6>
                            <p><?php echo $comment->comment_content ?></p>
                        </div>
                    </div>

                <?php endforeach; ?>

            <?php endif; ?>

        </div>
    </div>
</section>