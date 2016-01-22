<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
use yii\helpers\Html;
use yii\helpers\Url;

$jobsTimelineLink = Url::to(['/pages/my-experience']);
?>
<section class="container-fluid clearfix jobs-timeline">
    <div class="container">
        <h2>My Career Timeline</h2>
        <div class="col-md-7">
            <p class="text">Finally I created to have a deeper idea what it's <a href="<?=$jobsTimelineLink?>">my work expirence</a>, I collected all job timeline</p>
            <p class="text">where you can see my career evolution since I was a child to what I'm currently doing</p>
            <p class="text">It will include personal projects, jobs, hackathons so you will get idea where I spend my professional and personal time to develop my skills</p>
        </div>
        <div class="col-md-5">
            <a href="<?=$jobsTimelineLink?>">
                <?= Html::img('images/jobs-timeline.jpg', array('class'=>'img-responsive'));?>
            </a>
        </div>
    </div>
</section>
