<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
use yii\helpers\Url;
?>
<section class="container clearfix profiles">
    <h2>My Background</h2>
    <p class="text">Since I started with my engineer in computer science. I'm always been curious about many subjects in specific all of things related as Artificial Intelligence until I discovered the web technologies that allow you to become real any ideas or business.</p>
    <p class="text">A whole life of passion for software developments (creations, projects, dreams, hobbies, hackathons, ...), It was hard to summarize in a four pages CV as usual is required.</p>
    <p class="text">I decided to group it in these three main categories</p>
    <div class="frontend-developer col-sm-4">
        <?php echo \Yii::$app->view->renderFile('@molecules/profile-block.php',[
            'title' => 'frontend developer',
            'imgUrl' => 'images/frontend-developer.png',
            'link' => Url::to(['pages/frontend-profile'])
        ]);?>
    </div>
    <div class="software-architect col-sm-4">
        <?php echo \Yii::$app->view->renderFile('@molecules/profile-block.php',[
            'title' => 'software architect',
            'imgUrl' => 'images/software-architect.png',
            'link' => Url::to(['pages/software-architect-profile'])
        ]);?>
    </div>
    <div class="bandend-developer col-sm-4">
        <?php echo \Yii::$app->view->renderFile('@molecules/profile-block.php',[
            'title' => 'backend developer',
            'imgUrl' => 'images/backend-developer.png',
            'link' => Url::toRoute(['pages/backend-profile'])
        ]);?>
    </div>
</section>
