<?php
use yii\helpers\Html;
use yii\helpers\Url;

?>
<div class="row experience-block">
    <div class="col-xs-12 col-sm-3 col-md-2 col-lg-2">
        <div class="workYear">
            <span class="prevY"><?=$endDate?></span>
            <span class="afterY"><?=$startDate?></span>
        </div>
    </div>
    <div class="col-xs-12 col-sm-9 col-md-10 col-lg-10 rightArea">
        <div class="arrowpart"></div>
        <div class="exCon">
            <h4><?=$company?></h4>
            <h5><?=$position?></h5>
            <?=$description?>
        </div>
    </div>
</div>
