<?php get_header();?>


<?php
$key = 0;
$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
$args = [
    'post_type' => 'ghs_games',
    'post_per_page'=>get_option('posts_per_page'),
    'paged' => $paged,
];

// the query
$the_query = new WP_Query( $args );
$length_of_query = count($the_query->posts);

if ( $the_query->have_posts() ) : ?>

    <!-- the loop -->
    <?php while ( $the_query->have_posts() ) : $the_query->the_post(); ?>
        <?php if($key == 0): ?>
            <div class="jumbotron jumbotron-fluid ghs_hero_banner mb-4" style="background-image: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),
                    url('<?php if(has_post_thumbnail(get_the_ID())): echo get_the_post_thumbnail_url(get_the_ID()); endif; ?>');">
                <div class="container">
                    <h1 class="display-5 ghs_title"><?php echo get_the_title(get_the_ID()); ?></h1>
                    <p class="lead"><?php echo get_the_excerpt(get_the_ID()) ?></p>
                    <a class="btn btn-primary ghs_button" href="<?php echo get_the_permalink(get_the_ID()) ?>" role="button">Find out more</a>
                </div>
            </div>

            <section class="recent-posts">

                <div class="container">
        <?php endif; ?>

        <?php if($key > 0): ?>
            <div class="row">
                <?php if(($key % 2)): ?>
                    <div onclick="goToPage('<?php echo get_the_permalink($post) ?>')" class="col-md-6 recent-posts__img order-sm-1 order-md-2 mb-4" style="background-image: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('<?php echo get_the_post_thumbnail_url($post) ?>')"></div>
                    <div class="col-md-6 order-sm-2 order-md-2 mb-4">
                        <h2 class="ghs_title"><?php echo get_the_title($post) ?></h2>
                        <p class="lead"><?php echo get_the_excerpt($post) ?></p>
                        <a class="btn btn-primary ghs_button" href="<?php echo get_the_permalink($post) ?>" role="button">Find out more</a>
                    </div>
                <?php else: ?>
                    <div class="col-md-6 order-sm-2 order-md-1 mb-4">
                        <h2 class="ghs_title"><?php echo get_the_title($post) ?></h2>
                        <p class="lead"><?php echo get_the_excerpt($post) ?></p>
                        <a class="btn btn-primary ghs_button" href="<?php echo get_the_permalink($post) ?>" role="button">Find out more</a>
                    </div>
                    <div onclick="goToPage('<?php echo get_the_permalink($post) ?>')" class="col-md-6 recent-posts__img mb-4 order-sm-1 order-md-2" style="background-image: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('<?php echo get_the_post_thumbnail_url($post) ?>')"></div>
                <?php endif; ?>
            </div>
        <?php endif; ?>

        <?php if($key == $length_of_query -1): ?>
                </div>
            </section>

        <?php endif; ?>
    <?php $key++; endwhile; ?>
    <!-- end of the loop -->

    <!-- pagination here -->
    <ul class="pagination pagination-lg justify-content-center">
        <?php global $wp_query; $current_page = $paged; $pages = $the_query->max_num_pages; ?>
        <li class="page-item <?php if($current_page == 1){ echo 'disabled'; } ?>">
            <a class="page-link" href="<?php echo get_previous_posts_page_link($pages) ?>">Previous</a>
        </li>
        <li class="page-item <?php if($current_page == $pages){ echo 'disabled'; } ?>">
            <a class="page-link" href="<?php echo get_next_posts_page_link($pages) ?>">Next</a>
        </li>
    </ul>

    <?php wp_reset_postdata(); ?>

    <?php else : ?>
        <p><?php _e( 'Sorry, no posts matched your criteria.' ); ?></p>
    <?php endif; ?>


<?php get_footer(); ?>
