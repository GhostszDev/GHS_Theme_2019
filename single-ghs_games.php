<?php get_header(); $author_id = get_post_field( 'post_author', get_the_ID() ); ?>


<div class="jumbotron jumbotron-fluid ghs_hero_banner mb-4" style="background-image: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('<?php if(has_post_thumbnail(get_the_ID())): echo get_the_post_thumbnail_url(get_the_ID()); endif; ?>');">
    <div class="container">
        <?php if(!empty(get_post_meta(get_the_ID(), 'ghs_game_meta')[0])): ?>

            <div class="webgl-content" id="ghs_game">
                <div id="unityContainer" style="width: 960px; height: 600px"></div>
                <div class="footer">
                    <div class="fullscreen" onclick="unityInstance.SetFullscreen(1)"></div>
                    <h1 class="display-3 ghs_title"><?php echo get_the_title(get_the_ID()); ?></h1>
                </div>
            </div>

            <span class="ghs_vid_play_btn"><i class="far fa-play-circle"></i></span>
        <?php endif; ?>
    </div>
</div>

    <section class="ghs_author mb-4">
        <div class="container">
            <div class="row">
                <div class="col-md ghs_games" style="display: block">
                    <h1 class="ghs_title"><?php echo get_the_title(get_the_ID()); ?></h1>

                    <br>
                    <div>
                        <p>Available On:</p>

                        <div class="btn-group" role="group" aria-label="Basic example">
                            <?php if(!empty(get_post_meta(get_the_ID(), 'ghs_game_meta_nintendo')[0])): ?><button type="button" class="btn btn-secondary" onclick="window.location.href='<?php echo get_post_meta(get_the_ID(), 'ghs_game_meta_nintendo')[0] ?>'"><svg class="svgIcon ghs_avaiable_icon"><use xlink:href="<?php echo svg_defs; ?>#nintendo-switch"></use></svg></button><?php endif; ?>
	                        <?php if(!empty(get_post_meta(get_the_ID(), 'ghs_game_meta_nintendo')[0])): ?><button type="button" class="btn btn-secondary"><i class="fab fa-xbox"></i></button><?php endif; ?>
	                        <?php if(!empty(get_post_meta(get_the_ID(), 'ghs_game_meta_nintendo')[0])): ?><button type="button" class="btn btn-secondary"><i class="fab fa-playstation"></i></button><?php endif; ?>
	                        <?php if(!empty(get_post_meta(get_the_ID(), 'ghs_game_meta_android')[0])): ?><button type="button" class="btn btn-secondary"><svg class="svgIcon ghs_avaiable_icon"><use xlink:href="<?php echo svg_defs; ?>#android"></use></svg></button><?php endif; ?>
	                        <?php if(!empty(get_post_meta(get_the_ID(), 'ghs_game_meta_nintendo')[0])): ?><button type="button" class="btn btn-secondary"><i class="fab fa-apple"></i></button><?php endif; ?>
	                        <?php if(!empty(get_post_meta(get_the_ID(), 'ghs_game_meta_nintendo')[0])): ?><button type="button" class="btn btn-secondary"><i class="fab fa-steam"></i></button><?php endif; ?>
	                        <?php if(!empty(get_post_meta(get_the_ID(), 'ghs_game_meta_nintendo')[0])): ?><button type="button" class="btn btn-secondary"><svg class="svgIcon ghs_avaiable_icon"><use xlink:href="<?php echo svg_defs; ?>#epic-games"></use></svg></button><?php endif; ?>
                        </div>
                    </div>
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
                    </article>
                </div>
                <div class="col-md-4">
					<?php get_sidebar() ?>
                </div>

            </div>
        </div>
    </section>


<?php if ( comments_open() || get_comments_number() ) : comments_template(); endif; ?>

<?php get_footer(); ?>
