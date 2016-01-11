<?php
use yii\helpers\Html;
use yii\helpers\Url;
use yii\bootstrap\ActiveForm;
use yii\captcha\Captcha;
use app\assets\ContactAsset;

/* @var $this yii\web\View */
/* @var $form yii\bootstrap\ActiveForm */
/* @var $model app\models\ContactForm */
$this->title = 'Hire or contact me - Eduardo Aparicio Cardenes';
$description = "For any futher information or feedback about my interactive website CV, please send me your details and I will contact you as soon as possible.";
$imgUrl = Url::to(['images/introduction-image-1280.jpg'],true);

$this->registerMetaTag(['name' => 'description', 'content' => $description], 'description');
$this->registerMetaTag(['name' => 'og:type', 'content' => "website"], 'og:type');
$this->registerMetaTag(['name' => 'og:url', 'content' => Url::current([],true)], 'og:url');
$this->registerMetaTag(['name' => 'og:title', 'content' => "Hire or contact me"], 'og:title');
$this->registerMetaTag(['name' => 'og:site_name', 'content' => "Eduardo Aparicio Cardenes Website"], 'og:site_name');
$this->registerMetaTag(['name' => 'og:image', 'content' => $imgUrl], 'og:image');
$this->registerMetaTag(['name' => 'og:description', 'content' => $description], 'og:description');

ContactAsset::register($this);
?>
<div class="contact-or-hire-me">
    <object class="wold-wide-map" id="world-wide-svg-map" data="<?=Url::to('images/world-wide-map-high-res.svg')?>" type="image/svg+xml">
        
    </object>
    <div class="heading-block">
        <h1>Hire or contact me</h1>

        <?php if (Yii::$app->session->hasFlash('contactFormSubmitted')): ?>

        <div class="alert alert-success">
            Thank you for contacting us. We will respond to you as soon as possible.
        </div>

        <p>
            Note that if you turn on the Yii debugger, you should be able
            to view the mail message on the mail panel of the debugger.
            <?php if (Yii::$app->mailer->useFileTransport): ?>
            Because the application is in development mode, the email is not sent but saved as
            a file under <code><?= Yii::getAlias(Yii::$app->mailer->fileTransportPath) ?></code>.
            Please configure the <code>useFileTransport</code> property of the <code>mail</code>
            application component to be false to enable email sending.
            <?php endif; ?>
        </p>

        <?php else: ?>

        <p>
            If you have business inquiries or other questions, please fill out the following form to contact us. Thank you.
        </p> 

        <div>
            <?php $form = ActiveForm::begin(['id' => 'contact-form']); ?>
                <?= $form->field($model, 'name') ?>
                <?= $form->field($model, 'email') ?>
                <?= $form->field($model, 'body')->textArea(['rows' => 6]) ?>
                <?= $form->field($model, 'verifyCode')->widget(Captcha::className(), [
                    'captchaAction' => 'pages/captcha',
                    'template' => '<div class="row"><div class="col-lg-3">{image}</div><div class="col-lg-6">{input}</div></div>',
                ]) ?>
                <div class="form-group">
                    <?= Html::submitButton('Submit', ['class' => 'btn btn-primary', 'name' => 'contact-button']) ?>
                </div>
            <?php ActiveForm::end(); ?>
        </div>

        <?php endif; ?>
    </div>
</div>
