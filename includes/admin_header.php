<header class="Header">
    <?php include "./includes/header.html" ?>
    <!-- get url string to determine which page is current, add or edit -->
    <?php 
        $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $url_part =  (explode("/", $path));
    ?>
    <ul class="Header-nav">
        <li class="Header-navItem">
            <a href="index.php">Map</a>
        </li>
        <li class="Header-navItem Header-navItem--active">
            <a href="<?php echo ($url_part[2] == 'add.php')? "edit.php": "add.php"; ?>">
                <?php echo ($url_part[2] == 'add.php')? 'Edit location': 'Add location'; ?>
            </a>
        </li>   
        <li class="Header-navItem">
            <a href="http://walthamstuff.com/waltham-forest-hackathon-2018/">About this map</a>
        </li>
    </ul>
</header>