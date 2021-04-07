<?php get_header(); $first_post_ID = ghs_get_latest_post(); ?>


<div class="jumbotron jumbotron-fluid ghs_hero_banner mb-4" style="background-image: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('<?php if(has_post_thumbnail($first_post_ID)): echo get_the_post_thumbnail_url($first_post_ID); endif; ?>');">
    <div class="container">
        <h1 class="display-5 ghs_title"><?php echo get_the_title($first_post_ID); ?></h1>
        <p class="lead"><?php echo get_the_excerpt($first_post_ID) ?></p>
        <a class="btn btn-primary ghs_button" href="<?php echo get_the_permalink($first_post_ID) ?>" role="button">Read More</a>
    </div>
</div>

<section class="call-to-action mb-4">
    <div class="container">
        <div class="d-flex justify-content-center">
            <span class="align-middle">
                <p class="text-center ghs_title">Become a beta tester now!</p>
                <p class="text-center lead">Make sure to use an active google email. Join the mailing list now</p>
                <div class="input-group ghs_email_list">
                    <input type="email" class="form-control" placeholder="Place gmail here" aria-label="Place email here" aria-describedby="basic-addon2">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" onclick="addToMailingList()">Submit</button>
                    </div>
                </div>
            </span>
        </div>
    </div>
</section>

<section class="feat-cats">
    <div class="container">
        <div class="row">

            <?php foreach (ghs_get_featured_cat() as $feat){?>

            <div class="col-md mb-4" onclick="goToPage('<?php echo get_category_link($feat['ID']) ?>')" style="background-image: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('<?php echo $feat['thumbnail'] ?>')">
                <h3 class="ghs_title"><?php echo $feat['title'] ?></h3>
            </div>

            <?php } ?>
        </div>

    </div>
</section>

<section class="recent-posts">

    <div class="container">

        <?php $recentPost = get_recent_post(); $key = 0; foreach ($recentPost as $post):?>
            <div class="row">
		        <?php if(($key % 2)): ?>
                    <div onclick="goToPage('<?php echo get_the_permalink($post) ?>')" class="col-md-6 recent-posts__img order-sm-1 order-md-2 mb-4" style="background-image: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('<?php echo get_the_post_thumbnail_url($post) ?>')"></div>
                    <div class="col-md-6 order-sm-2 order-md-2 mb-4">
                        <h2 class="ghs_title"><?php echo get_the_title($post) ?></h2>
                        <p class="lead"><?php echo get_the_excerpt($post) ?></p>
                        <a class="btn btn-primary ghs_button" href="<?php echo get_the_permalink($post) ?>" role="button">Read More</a>
                    </div>
		        <?php else: ?>
                    <div class="col-md-6 order-sm-2 order-md-1 mb-4">
                        <h2 class="ghs_title"><?php echo get_the_title($post) ?></h2>
                        <p class="lead"><?php echo get_the_excerpt($post) ?></p>
                        <a class="btn btn-primary ghs_button" href="<?php echo get_the_permalink($post) ?>" role="button">Read More</a>
                    </div>
                    <div onclick="goToPage('<?php echo get_the_permalink($post) ?>')" class="col-md-6 recent-posts__img mb-4 order-sm-1 order-md-2" style="background-image: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('<?php echo get_the_post_thumbnail_url($post) ?>')"></div>
		        <?php endif; $key++; ?>
            </div>
        <?php endforeach; ?>

    </div>


</section>


<?php get_footer(); ?>
