<?php $navItem = ghs_get_navigation('Nav Bar'); $active = ghs_get_current_url(); ?>

<nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">

    <a class="navbar-brand" title="<?php echo bloginfo('Name') ?>" href="<?php echo site_url('') ?>"><?php echo bloginfo('Name') ?></a>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarText">

        <?php if($navItem): ?>

            <ul class="navbar-nav mr-auto">
                <?php foreach ($navItem as $nI): ?>
                    <li class="nav-item<?php if($nI['url'] == $active): echo " active"; endif; if($nI['submenu']): echo " dropdown"; endif;?>">
                        <a
                                class="nav-link <?php if($nI['submenu']): echo " dropdown-toggle"; endif; ?>"
                                title="<?php echo $nI['title'] ?>"
                                href="<?php if($nI['submenu']): echo '#'; else: echo $nI['url']; endif; ?>"
                                id="<?php if($nI['submenu']): echo "navbarDropdownMenuLink"; endif;?>"
                                data-toggle="<?php if($nI['submenu']): echo "dropdown"; endif;?>"
                                aria-haspopup="<?php if($nI['submenu']): echo "true"; endif;?>"
                                aria-expanded="<?php if($nI['submenu']): echo "false"; endif;?>"
                                target="<?php echo $nI['target'] ?>"><?php echo $nI['title']; if($nI['url'] == $active): echo ' <span class="sr-only">(current)</span>'; endif; ?></a>

                        <?php  if($nI['submenu']): ?>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <?php foreach ($nI['submenu'] as $sub): ?>
                            <a class="dropdown-item" href="<?php echo $sub['url'] ?>" title="<?php echo $sub['title'] ?>">
                                <?php echo $sub['title'] ?>
                            </a>
                            <?php endforeach; ?>
                        </div>
                        <?php endif; ?>

                    </li>
                <?php endforeach; ?>
            </ul>

        <?php endif; ?>



    </div>
</nav>