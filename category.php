<?php get_header(); $cat = get_the_category()[0]; $feat_thumb = get_option( "category_$cat->term_id"); ?>


<div class="jumbotron jumbotron-fluid ghs_hero_banner mb-4" style="background-image: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('<?php if($feat_thumb['img']): echo $feat_thumb['img']; endif; ?>');">
    <div class="container">
        <h1 class="display-5 ghs_title"><?php echo $cat->name; ?></h1>
        <p class="lead"><?php echo $cat->description ?></p>
    </div>
</div>

<section class="recent-posts">

    <div class="container">

        <?php $key = 0; if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

            <div class="row">
                <?php if(($key % 2)): ?>
                    <div onclick="goToPage('<?php echo get_the_permalink() ?>')" class="col-md-6 recent-posts__img order-sm-1 order-md-2 mb-4" style="background-image: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('<?php echo get_the_post_thumbnail_url() ?>')"></div>
                    <div class="col-md-6 order-sm-2 order-md-2 mb-4">
                        <h2 class="ghs_title"><?php echo get_the_title() ?></h2>
                        <p class="lead"><?php echo get_the_excerpt() ?></p>
                        <a class="btn btn-primary ghs_button" href="<?php echo get_the_permalink() ?>" role="button">Read More</a>
                    </div>
                <?php else: ?>
                    <div class="col-md-6 order-sm-1 order-md-1 mb-4">
                        <h2 class="ghs_title"><?php echo get_the_title() ?></h2>
                        <p class="lead"><?php echo get_the_excerpt() ?></p>
                        <a class="btn btn-primary ghs_button" href="<?php echo get_the_permalink() ?>" role="button">Read More</a>
                    </div>
                    <div onclick="goToPage('<?php echo get_the_permalink() ?>')" class="col-md-6 recent-posts__img mb-4 order-sm-2 order-md-2" style="background-image: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('<?php echo get_the_post_thumbnail_url() ?>')"></div>
                <?php endif; $key++; ?>
            </div>

        <?php $key++; endwhile; ?>

            <ul class="pagination pagination-lg">
                <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item"><a class="page-link" href="#">Next</a></li>
            </ul>

        <?php endif; ?>

    </div>
</section>

<?php get_footer(); ?>
