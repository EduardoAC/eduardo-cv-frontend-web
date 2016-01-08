<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
use yii\helpers\Html;
use yii\helpers\Url;

$codeProjectsLink = $link;
?>
<div class="projects-desc-block <?=$class?>">
    <div class="row <?=$type?> shadow">
        <div class="logo col-sm-4 col-md-12">
            <a href="<?=$codeProjectsLink?>" target="_blank" rel="nofollow">
                <?= Html::img($imgUrl, array('class'=>'img-responsive img-thumbnail'));?>
            </a>
        </div>
        <div class="details col-sm-8 col-md-12">
            <a href="<?=$codeProjectsLink?>" target="_blank" rel="nofollow">
                <h2><?=$title?></h2>
            </a>
            <?php if(isset($subtitle)):?>
                <?php if(is_array($subtitle) && isset($subtitle['link'])):?>
                    <a href="<?=$subtitle['link']?>" target="_blank" rel="nofollow">
                        <h3><?=$subtitle['title']?></h3>
                    </a>                
                <?php else: ?>
                    <?php $text = (!is_array($subtitle))? $subtitle:$subtitle['title']; ?>
                    <h3><?=$text?></h3>
                <?php endif; ?>
            <?php endif; ?>
            <p class="text"><?=$description?></p>
        </div>
    </div>
</div>
