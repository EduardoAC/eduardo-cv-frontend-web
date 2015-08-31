<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
?>
<section class="clearfix">
    <div class="frontend-developer col-md-2 col-md-offset-2">
        <?php echo \Yii::$app->view->renderFile('@molecules/profile-block.php',[
            'title' => 'frontend developer'
        ]);?>
    </div>
    <div class="software-architect col-md-2 col-md-offset-1">
        <?php echo \Yii::$app->view->renderFile('@molecules/profile-block.php',[
            'title' => 'software architect'
        ]);?>
    </div>
    <div class="bandend-developer col-md-2 col-md-offset-1">
        <?php echo \Yii::$app->view->renderFile('@molecules/profile-block.php',[
            'title' => 'backend developer'
        ]);?>
    </div>
</section>
