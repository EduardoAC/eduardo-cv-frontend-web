<?php
use yii\helpers\Url;
$this->title = 'Contractor for hire - Eduardo Aparicio Cardenes';
$description = "I am passionate software architect that loves create new products and see how they become successful. I did this site to collect my career.";
$imgUrl = Url::to(['images/introduction-image-1280.jpg'],true);

$this->registerMetaTag(['name' => 'description', 'content' => $description], 'description');
$this->registerMetaTag(['name' => 'og:type', 'content' => "website"], 'og:type');
$this->registerMetaTag(['name' => 'og:url', 'content' => Url::current([],true)], 'og:url');
$this->registerMetaTag(['name' => 'og:title', 'content' => "Contractor for hire"], 'og:title');
$this->registerMetaTag(['name' => 'og:site_name', 'content' => "Eduardo Aparicio Cardenes Website"], 'og:site_name');
$this->registerMetaTag(['name' => 'og:image', 'content' => $imgUrl], 'og:image');
$this->registerMetaTag(['name' => 'og:description', 'content' => $description], 'og:description');

use app\assets\HomepageAsset;

/* @var $this \yii\web\View */
/* @var $content string */

HomepageAsset::register($this);
echo \Yii::$app->view->renderFile('@templates/homepage.php');
?>