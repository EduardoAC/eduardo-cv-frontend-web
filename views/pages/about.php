<?php
use yii\helpers\Html;
use yii\widgets\Breadcrumbs;
use app\assets\AboutAsset;

/* @var $this yii\web\View */
$this->title = 'About Eduardo';

AboutAsset::register($this);
?>
<section class="about-me">
    <div class="introduction">        
        <div class="gradient-effect">
            <?= Html::img('images/about-eduardo-hacktheviual-1280.jpg',array('class'=>'img-responsive'));?>
        </div>
        <div class="heading-block">
            <h1>The Story of Eduardo Aparicio Cardenes</h1>
            <p>This is the About page. You may modify the following file to customize its content: This is the About page. You may modify the following file to customize its content: This is the About page. You may modify the following file to customize its content:</p>
        </div>
    </div>
<div class="container site-about">
    
    <?= Breadcrumbs::widget([
        'links' => array($this->title),
        'options' => array('class' => 'container breadcrumb')
    ]) ?>

    <p>
        This is the About page. You may modify the following file to customize its content:
    </p>

    <code><?= __FILE__ ?></code>
</div>
</section>
