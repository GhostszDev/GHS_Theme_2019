<?php get_header(); $first_post_ID = ghs_get_latest_post(); ?>


<div class="jumbotron jumbotron-fluid ghs_hero_banner mb-sm-4" style="background-image: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('<?php if(has_post_thumbnail($first_post_ID)): echo get_the_post_thumbnail_url($first_post_ID); endif; ?>');">
    <div class="container">
        <h1 class="display-5 ghs_title"><?php echo get_the_title($first_post_ID); ?></h1>
        <p class="lead"><?php echo get_the_excerpt($first_post_ID) ?></p>
        <a class="btn btn-primary ghs_button" href="<?php echo get_the_permalink($first_post_ID) ?>" role="button">Read More</a>
    </div>
</div>

<section class="feat-cats">
    <div class="container">
        <div class="row">

            <?php foreach (ghs_get_featured_cat() as $feat){ ?>

            <div class="col-md mb-sm-4" style="background-image: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('<?php echo $feat['thumbnail'] ?>')">
                <h3 class="ghs_title"><?php echo $feat['title'] ?></h3>
            </div>

            <?php } ?>
        </div>

    </div>
</section>

<section class="recent-posts">

    <div class="container">
        <div class="row">
            <?php $recentPost = get_recent_post(); $key = 0; foreach ($recentPost as $post):?>

            <?php if(($key % 2)): ?>
                <div class="col-md-6 recent-posts__img order-sm-<?php echo $key+1 ?> mb-sm-4" style="background-image: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('<?php echo get_the_post_thumbnail_url($post) ?>')"></div>
                <div class="col-md-6 order-sm-<?php echo $key+2 ?> mb-sm-4">
                    <h2 class="ghs_title"><?php echo get_the_title($post) ?></h2>
                    <p class="lead"><?php echo get_the_excerpt($post) ?></p>
                    <a class="btn btn-primary ghs_button" href="<?php echo get_the_permalink($post) ?>" role="button">Read More</a>
                </div>
            <?php else: ?>
                <div class="col-md-6 order-sm-<?php echo $key+2 ?> order-md-<?php echo $key+1 ?> mb-sm-4">
                    <h2 class="ghs_title"><?php echo get_the_title($post) ?></h2>
                    <p class="lead"><?php echo get_the_excerpt($post) ?></p>
                    <a class="btn btn-primary ghs_button" href="<?php echo get_the_permalink($post) ?>" role="button">Read More</a>
                </div>
                <div class="col-md-6 recent-posts__img mb-sm-4 order-sm-<?php echo $key+1 ?> order-md-<?php echo $key+2 ?>" style="background-image: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('<?php echo get_the_post_thumbnail_url($post) ?>')"></div>
            <?php endif; $key++; ?>

            <?php endforeach; ?>
        </div>
    </div>


</section>


<?php get_footer(); ?>