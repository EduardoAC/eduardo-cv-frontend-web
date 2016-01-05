<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$this->title = 'My Projects - Eduardo Aparicio Cardenes';
$this->registerMetaTag(['name' => 'description', 'content' => 'My projects here include hackathons, work and personal ideas'], 'description');
use yii\helpers\Url;

use app\assets\MyprojectspageAsset;
MyprojectspageAsset::register($this);
?>
<h1>My projects</h1>

<?php echo \Yii::$app->view->renderFile('@molecules/project-description-block.php',[
    'title' => 'frontend developer',
    'imgUrl' => 'images/frontend-developer.png',
    'link' => Url::to(['pages/frontend-profile'])
]);?>