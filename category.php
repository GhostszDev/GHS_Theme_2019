<?php get_header(); $cat = get_query_var('cat'); $feat_thumb = get_option( "category_$cat"); ?>


<div class="jumbotron jumbotron-fluid ghs_hero_banner mb-4" style="background-image: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('<?php if($feat_thumb['img']): echo $feat_thumb['img']; endif; ?>');">
    <div class="container">
        <h1 class="display-5 ghs_title"><?php echo get_cat_name($cat); ?></h1>
        <p class="lead"><?php echo category_description($cat) ?></p>
    </div>
</div>

<section class="recent-posts mt-5">

    <div class="container">
		<?php
		$key = 0;
		$args = [
			'category__in' => $cat,
			'post_type' => 'post',
			'posts_per_page' => 3
		];
		$the_query = new WP_Query( $args );

		// The Loop
		if ( $the_query->have_posts() ) {
			while ( $the_query->have_posts() ) {
				$the_query->the_post(); ?>

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

				<?php
			}
		} else {
			// no posts found ?>
            <p>No post were found!</p>
			<?php
		}
		/* Restore original Post Data */
		wp_reset_postdata();
		?>
    </div>


</section>

<?php get_footer(); ?>
