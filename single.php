<?php get_header(); $author_id = get_post_field( 'post_author', get_the_ID() ); ?>


<div class="jumbotron jumbotron-fluid ghs_hero_banner mb-4" style="background-image: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('<?php if(has_post_thumbnail(get_the_ID())): echo get_the_post_thumbnail_url(get_the_ID()); endif; ?>');">
    <div class="container">
        <?php if(!empty(get_post_meta(get_the_ID(), 'ghs_youtube_meta')[0])): ?>

        <iframe id="ytplayer" type="text/html" width="1080" height="607.5"
                src="<?php echo get_post_meta(get_the_ID(), 'ghs_youtube_meta')[0] ?>"
                frameborder="0" allowfullscreen></iframe>

        <span class="ghs_vid_play_btn"><i class="far fa-play-circle"></i></span>
        <?php endif; ?>
        <h1 class="display-5 ghs_title"><?php echo get_the_title(get_the_ID()); ?></h1>
    </div>
</div>

<section class="ghs_author mb-4">
    <div class="container">
        <div class="row">
            <div class="col-md">
                <img src="<?php echo get_avatar_url($author_id) ?>" class="rounded-circle mr-3">
                <span>
                    <p class="lead mb-0">
                        <a href="<?php echo get_the_author_meta('url', $author_id) ?>">
                            <?php echo ucwords(get_the_author_meta('first_name', $author_id)
                            .' '. get_the_author_meta('display_name', $author_id)
                                .' '. get_the_author_meta('last_name', $author_id)) ?>
                        </a>
                    </p>

                    <p class="lead"><?php echo get_the_date() ?> -
                        <a href="<?php echo get_category_link(get_the_category()[0]->cat_ID) ?>"><?php echo get_the_category()[0]->name ?></a>
                    </p>
                </span>
            </div>
            <div class="col-md ghs_share">
                <div class="btn-toolbar justify-content-md-between" role="toolbar" aria-label="Toolbar with button groups">
                    <div class="input-group">
                    </div>

                    <div class="btn-group" role="group" aria-label="First group">
                        <button type="button" class="btn btn-secondary ghs_button fb-xfbml-parse-ignore" onclick="goToPage('https://www.facebook.com/sharer/sharer.php?u=<?php echo urlencode(get_the_permalink(get_the_ID())) ?>;src=sdkpreparse')"><i class="fab fa-facebook-square"></i></button>
                        <button type="button" class="btn btn-secondary ghs_button twitter-share-button" data-via="GhostszMusic" data-hashtags="ghostszmusic" data-show-count="false" onclick="goToPage('https://twitter.com/share?ref_src=<?php echo urlencode(get_the_permalink(get_the_ID())) ?>')"><i class="fab fa-twitter-square"></i></button>
                        <button type="button" class="btn btn-secondary ghs_button" onclick="goToPage('mailto:?subject=<?php echo get_the_title() ?>&amp;body=<?php echo get_the_excerpt() ?>')"><i class="far fa-envelope"></i></button>
                        <button type="button" class="btn btn-secondary ghs_button copyLinkBtn" onclick="copyToClipboard('<?php echo get_the_permalink(get_the_ID()) ?>')"><i class="fas fa-link"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="ghs-content mb-4">
    <div class="container">
        <div class="row">

            <div class="col-md-8">
                <article>
                    <?php if(!empty(get_post_meta(get_the_ID(), 'ghs_podcast_meta')[0])): ?>

<!--                    --><?php //var_dump(get_post_meta(get_the_ID(), 'ghs_podcast_meta')) ?>
                        <iframe class="ghs_podcast_iframe mb-4" src="<?php echo get_post_meta(get_the_ID(), 'ghs_podcast_meta')[0] ?>" height="102px" width="400px" frameborder="0" scrolling="no"></iframe>

                    <?php endif; ?>
                    <?php echo get_the_content('', false, get_the_ID()) ?>
                </article>

            </div>
            <div class="col-md-4">
                <?php get_sidebar() ?>
            </div>

            <div class="col-md-12">
                <section class="recent-posts mt-5">
                    <h3 class="ghs_title ghs-header-title">Related Post</h3>

                    <div class="container">
			            <?php
			            $key = 0;
			            $args = [
				            'post__not_in' => array( get_the_ID(), ),
				            'cat' => get_the_category( $wp_query->post->ID )->cat_ID,
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
            </div>

        </div>
    </div>
</section>


<?php if ( comments_open() || get_comments_number() ) : comments_template(); endif; ?>

<?php get_footer(); ?>
