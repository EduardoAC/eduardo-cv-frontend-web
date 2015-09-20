<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
use yii\helpers\Html;
use yii\helpers\Url;

$MyInteractiveCVProjectLink = Url::to(['projects/how-did-i-build-my-interactive-cv']);
?>
<section class="container clearfix greetings-contact">
    <h2>Thanks for reading my interactive curriculum</h2>
    <div class="col-md-5">
        <?= Html::img('images/finding-the-secrets.jpg', array('class'=>'img-responsive'));?>
    </div>
    <div class="col-md-7">
        <p class="text">I hope you like it. Discover more in each page some of them have amazing secrets. As my frontend career is done in Angular and NodeJs</p>
        <p class="text">Are you ready to discover all of them? Then go to <a href="<?=$MyInteractiveCVProjectLink?>">how did i build my intereactive CV</a></p>
        <p class="text">Do you want to hire me or give me some feedback? You can <a href="mailto:eduardo@dreammakerfactory.com">contact me by email</a></p>
        <?php echo \Yii::$app->view->renderFile('@molecules/follow-and-social-icons.php');?>
    </div>
</section>
