<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
use yii\helpers\Html;
use yii\helpers\Url;

$blogLink = Url::to(['blog/index']);
$forumLink = Url::to(['forum/index']);
?>
<section class="container clearfix content-blogs">
    <h2>Business and Technology Addiction</h2>
    <div class="col-md-5">
        <?= Html::img('images/ideas-content-blog.jpg', array('class'=>'img-responsive'));?>
    </div>
    <div class="col-md-7">
        <p class="text">I'm passionate about technology, buisness and personal growing so I wanted to contribute to internet sharing</p>
        <p class="text">Therefore I added two areas in that will contribute with my own posts and ideas about it</p>
        <p class="text">These are <a href="<?=$blogLink?>">business and technology blog</a> and <a href="<?=$forumLink?>">the brainstorming forum</a></p>
        <p class="text">where I publish different about topic related with all the topics that I mentioned before</p>
    </div>
</section>
