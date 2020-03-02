<!DOCTYPE html>

<html <?php language_attributes(); ?>>

<head>
    <?php wp_head(); ?>
</head>

<body>

    <?php get_header() ?>

    <?php if(is_front_page()): ?>
    <div class="jumbotron ghs_hero_banner">
        <div class="ghs_hero_banner_content">
            <h1 class="ghs_hero_banner_content_title"></h1>
            <p class="ghs_hero_banner_content_desc"></p>
        </div>
    </div>
    <?php endif; ?>

    <div class="container ghs-content">

        <div class="row">

            <div class="col-md-12 col-sm-12 <?php if(is_front_page()): echo 'ghs-front-page'; endif; ?>">

                <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

                    <div class="card" style="">
                        <img src="<?php echo get_the_post_thumbnail_url(); ?>" class="card-img-top" alt="">
                        <div class="card-body">
                            <h5 class="card-title"><?php echo get_the_title(); ?></h5>
                            <p class="card-text"><?php echo get_the_excerpt(); ?></p>
                            <a href="<?php echo get_the_permalink() ?>" class="btn btn-primary">Read More</a>
                        </div>
                    </div>

                <?php endwhile; else : ?>
                    <p><?php esc_html_e( 'Sorry, no posts matched your criteria.' ); ?></p>
                <?php endif; ?>

            </div>

        </div>

    </div>


    <?php get_footer(); ?>
</body>

</html>