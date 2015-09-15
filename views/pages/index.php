<?php
$this->title = 'Contractor for hire - Eduardo Aparicio Cardenes';
use app\assets\HomepageAsset;

/* @var $this \yii\web\View */
/* @var $content string */

HomepageAsset::register($this);
echo \Yii::$app->view->renderFile('@templates/homepage.php');
?>