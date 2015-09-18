<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
use yii\helpers\Html;
$imageUrl = isset($imgUrl)?$imgUrl:'images/defaultImage.png';
$linkPage = isset($link)?$link:'#';
?>
<div class="profile-block">
    <a href="<?=$linkPage?>">
        <?= Html::img($imageUrl, array('class'=>'img-responsive'));?>
        <p class="link"><?php echo $title; ?></p>
    </a>
</div>

