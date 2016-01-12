<?php
use yii\helpers\Url;
use app\assets\BackendProfileAsset;
$this->title = 'My Backend background - Eduardo Aparicio Cardenes';
$description = "My backend background";
$imgUrl = Url::to(['images/backend-developer.png'],true);

$this->registerMetaTag(['name' => 'description', 'content' => $description], 'description');
$this->registerMetaTag(['name' => 'og:type', 'content' => "website"], 'og:type');
$this->registerMetaTag(['name' => 'og:url', 'content' => Url::current([],true)], 'og:url');
$this->registerMetaTag(['name' => 'og:title', 'content' => "My Backend background"], 'og:title');
$this->registerMetaTag(['name' => 'og:site_name', 'content' => "Eduardo Aparicio Cardenes Website"], 'og:site_name');
$this->registerMetaTag(['name' => 'og:image', 'content' => $imgUrl], 'og:image');
$this->registerMetaTag(['name' => 'og:description', 'content' => $description], 'og:description');

BackendProfileAsset::register($this);
?>
<article class="container backend-profile">
    <h1>My Backend Developer Background</h1>
    <section class="introduction">
    </section>
</article>
