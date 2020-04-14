<?php get_header(); ?>


<div class="jumbotron jumbotron-fluid ghs_hero_banner mb-4" style="background-image: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('<?php if(has_post_thumbnail(get_the_ID())): echo get_the_post_thumbnail_url(get_the_ID()); endif; ?>');">
    <div class="container">
        <h1 class="display-5 ghs_title"><?php echo get_the_title(get_the_ID()); ?></h1>
    </div>
</div>

<section class="ghs-content mb-4">
    <div class="container">
        <div class="row">

            <div class="col-md-8">
                <?php echo get_the_content('', false, get_the_ID()) ?>
            </div>
            <div class="col-md-4">
                <?php get_sidebar() ?>
            </div>

        </div>
    </div>
</section>


<?php if ( comments_open() || get_comments_number() ) : comments_template(); endif; ?>

<?php get_footer(); ?>