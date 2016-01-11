<?php
use yii\helpers\Html;
use yii\helpers\Url;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use app\assets\AppAsset;

/* @var $this \yii\web\View */
/* @var $content string */

AppAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?= Html::csrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
    <link rel="icon" type="image/x-icon" href="<?=Url::to("@web/favicon.ico")?>" />
</head>
<body>

<?php $this->beginBody() ?>
    <div class="wrap">
        <?php
            NavBar::begin([
                'brandLabel' => 'My Interactive CV',
                'brandUrl' => Yii::$app->homeUrl,
                'options' => [
                    'class' => 'navbar-inverse navbar-fixed-top',
                ],
            ]);
            echo Nav::widget([
                'options' => ['class' => 'navbar-nav navbar-right'],
                'items' => [
                    ['label' => 'Home', 'url' => ['/pages/index']],
                    ['label' => 'About', 'url' => ['/pages/about']],
                    ['label' => 'My Projects', 'url' => ['/pages/my-projects']],
                    ['label' => 'My Experience', 'url' => ['/jobs-timeline/index']],
                    ['label' => 'Contact', 'url' => ['/pages/contact']],
                ],
            ]);
            NavBar::end();
        ?>

        <div class="container-fluid">
            <?= Breadcrumbs::widget([
                'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : [],
                'options' => array('class' => 'container breadcrumb')
            ]) ?>
            <?= $content ?>
        </div>
    </div>
    <footer class="footer">
        <div class="container">
            <div class="col-sm-6 col-md-4">
                <h3>Navigation</h3>
                <ul>
                    <li><?= Html::a('Business And Technology blog', ['blog/index'], ['class' => 'profile-link']) ?></li>
                    <li><?= Html::a('The brainstorming forum', ['forum/index'], ['class' => 'profile-link']) ?></li>
                    <li><?= Html::a('About me', ['pages/about'], ['class' => 'profile-link']) ?></li>
                    <li><?= Html::a('Contact', ['pages/contact'], ['class' => 'profile-link']) ?></li>
                </ul>
            </div>
            <div class="col-sm-6 col-md-4">
                <h3>My background</h3>
                <ul>
                    <li><?= Html::a('As frontend developer', ['pages/frontend-profile'], ['class' => 'profile-link']) ?></li>
                    <li><?= Html::a('As software architect', ['pages/software-architect-profile'], ['class' => 'profile-link']) ?></li>
                    <li><?= Html::a('As backend developer', ['pages/backend-profile'], ['class' => 'profile-link']) ?></li>
                    <li><?= Html::a('My work experience', ['jobs-timeline/index'], ['class' => 'profile-link']) ?></li>
                    <li><?= Html::a('Projects, hackathons and ideas', ['pages/my-projects'], ['class' => 'profile-link']) ?></li>
                </ul>
            </div>
            <div class="hidden-sm col-md-4">
                <h3>Useful links</h3>
                <ul>
                    <li><a href="https://github.com/EduardoAC" target="blank">Check me out on GitHub</a></li>
                    <li><a href="http://www.tuocio.org" target="blank">TuOcio - Tools for event organizer</a></li>
                    <li><a href="http://www.dreammakerfactory.com" target="blank">Dream Maker Factory</a></li>
                </ul>
            </div>
        </div>
        <hr>
        <div class="container footer-label">
            <p class="center-block">&copy; Eduardo Aparicio Cardenes - Proyectonline <?= date('Y') ?></p>
        </div>
    </footer>

<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
