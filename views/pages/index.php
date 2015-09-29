<?php
$this->title = 'Contractor for hire - Eduardo Aparicio Cardenes';
$this->registerMetaTag(['name' => 'description', 'content' => 'I am passionate software architect that loves create new products and see how they become successful. I did this site to collect my career.'], 'description');
    
use app\assets\HomepageAsset;

/* @var $this \yii\web\View */
/* @var $content string */

HomepageAsset::register($this);
echo \Yii::$app->view->renderFile('@templates/homepage.php');
?>