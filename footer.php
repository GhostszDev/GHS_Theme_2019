<?php $social = [
    'facebook' => 'https://facebook.com',
    'twitter' => 'https://twitter.com',
    'tumblr' => 'https://tumblr.com',
    'instagram' => 'https://instagram.com',
    'youtube' => 'https://youtube.com',
    'snapchat' => 'https://snapchat.com',
]; ?>

<footer class="footer bg-dark">

    <div class="container">
        <div class="row">

            <div class="col-md-6 col-xs-12">
                <ul class="social-list">
                    <?php foreach ($social as $s): ?>
                        <li><?php echo $s ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>

            <div class="col-md-6 col-xs-12">
                Right Footer
            </div>

        </div>
    </div>

</footer>

<?php wp_footer(); ?>