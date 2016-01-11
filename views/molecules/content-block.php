<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
use yii\helpers\Html;
use yii\helpers\Url;

$colLeftSwap = "col-sm-push-6 col-md-push-8";
$colRightSwap = "col-sm-pull-6 col-md-pull-4";
if($odd){
    $colLeftSwap = "";
    $colRightSwap = "";   
}
?>
<div class="content-block <?=$class?>">
    <div class="row">
        <div class="logo col-sm-6 col-md-4 <?=$colLeftSwap?>">
            <div class="thumbnail-mid-container">
                <div class="thumbnail-mid">
                        <?= Html::img($imgUrl, array('class'=>'img-responsive img-thumbnail'));?>
                </div>
            </div>
        </div>
        <div class="details col-sm-6 col-md-8 <?=$colRightSwap?>">
            <h2><?=$title?></h2>
            <p class="text"><?=$description?></p>
        </div>
    </div>
</div>
