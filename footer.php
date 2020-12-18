        <footer class="footer bg-dark py-4">

            <div class="container">
                <div class="row">

                    <div class="col-md-6 col-xs-12">
                        <p class="ghs_title">Become a beta tester now!</p>
                        <div class="input-group ghs_email_list mb-4">
                            <input type="email" class="form-control" placeholder="Place gmail here" aria-label="Place email here" aria-describedby="basic-addon2">
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary" type="button" onclick="addToMailingList()">Button</button>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6 col-xs-12">
                        <p class="ghs_title">Follow Us</p>
                        <ul class="social-list"></ul>
                    </div>

                </div>

                <?php if(strpos(site_url(), 'localhost') !== false): ?>
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                <!-- footer ad -->
                <ins class="adsbygoogle"
                     style="display:inline-block;width:728px;height:90px"
                     data-ad-client="ca-pub-3479977104944029"
                     data-ad-slot="9627966054"></ins>
                <script>
                    (adsbygoogle = window.adsbygoogle || []).push({});
                </script>
                <?php endif; ?>

            </div>

        </footer>

        <?php wp_footer(); ?>

        <?php if(is_single()): ?>
            <input id="copyInput">
        <?php endif; ?>

    </body>

</html>
