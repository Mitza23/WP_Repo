<?php
    require 'Controller.php';

    if ($controller->resetFilter()) {
        echo "Filter reset successfully";
    }
    else {
        echo "Error in controller";
    }
