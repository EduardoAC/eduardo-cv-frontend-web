<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
use yii\helpers\Url;
use yii\helpers\Html;
use app\assets\FrontendProfileAsset;
$this->title = 'How Do I build my interactive CV - Eduardo Aparicio Cardenes';
$description = "How Do I build my interactive CV";
$imgUrl = Url::to(['images/comingsoon.png'],true);

$this->registerMetaTag(['name' => 'description', 'content' => $description], 'description');
$this->registerMetaTag(['name' => 'og:type', 'content' => "website"], 'og:type');
$this->registerMetaTag(['name' => 'og:url', 'content' => Url::current([],true)], 'og:url');
$this->registerMetaTag(['name' => 'og:title', 'content' => "Business And Technology blog"], 'og:title');
$this->registerMetaTag(['name' => 'og:site_name', 'content' => "Eduardo Aparicio Cardenes Website"], 'og:site_name');
$this->registerMetaTag(['name' => 'og:image', 'content' => $imgUrl], 'og:image');
$this->registerMetaTag(['name' => 'og:description', 'content' => $description], 'og:description');

?>
<style>
    /*Temporary styles for coming soon*/
    .business-tech-blog h1 {
        text-align: center;
        color: #337ab7;
        margin: 30px 0;
    }
    .business-tech-blog img{
        margin: 50px auto;
    }
</style>
<section class="business-tech-blog">
    <h1>How Do I build my interactive CV</h1>
    <?= Html::img($imgUrl, array('class'=>'img-responsive'));?>
</section>