<?php

namespace app\assets;

use yii\web\AssetBundle;

/**
 * @author Eduardo Aparicio Cardenes
 */
class ContactAsset extends AssetBundle
{
    public $sourcePath = '@app/assets';
    public $css = [
        'sass/templates/contact.scss',
    ];
    public $js = [
        'js/contact-or-hire-me.js'
    ];
    public $depends = [
    ];
}
