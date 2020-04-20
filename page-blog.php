<?php get_header(); ?>

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

        <?php endwhile; ?>

            <ul class="pagination pagination-lg justify-content-center">
                <?php global $wp_query; $current_page = $wp_query->query_vars['paged']; $pages = $wp_query->max_num_pages; ?>
                <li class="page-item <?php if($current_page == 0){ echo 'disabled'; } ?>"><a class="page-link" href="<?php echo get_previous_posts_page_link($pages) ?>">Previous</a></li>
                <li class="page-item <?php if($current_page == $pages){ echo 'disabled'; } ?>"><a class="page-link" href="<?php echo get_next_posts_page_link($pages) ?>">Next</a></li>
            </ul>

        <?php endif; ?>

    </div>
</section>

<?php get_footer(); ?>
