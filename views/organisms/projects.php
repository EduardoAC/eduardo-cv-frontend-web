<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
use yii\helpers\Html;
use yii\helpers\Url;

$codeProjectsLink = Url::to(['pages/my-projects']);
?>
<section class="container-fluid clearfix projects">
    <div class="container">
        <h2>Some of my projects</h2>
        <div class="col-md-7 col-lg-8">
            <p class="text">As part of this project that try to catch new employers and clients attention to open the door to new work opportunities.</p>
            <p class="text">I upload all <a href="<?=$codeProjectsLink?>">my projects here that include hackathons, work and personal ideas</a></p>
            <p class="text">Please self yourself to enter and take a look</p>
        </div>
        <div class="col-md-5 col-lg-4">
            <a href="<?=$codeProjectsLink?>">
                <?= Html::img('images/code-projects-done.jpg', array('class'=>'img-responsive'));?>
            </a>
        </div>
    </div>
</section>
