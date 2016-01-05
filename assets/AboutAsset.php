<?php

namespace app\assets;

use yii\web\AssetBundle;

/**
 * @author Eduardo Aparicio Cardenes <eduardo@dreammakerfactory.com>
 * @since 2.0
 */
class AboutAsset extends AssetBundle
{
    public $sourcePath = '@app/assets';
    public $css = [
        'sass/templates/about.scss',
    ];
    public $js = [
        'js/about-me.js'
    ];
    public $depends = [
        'app\assets\CustomBootstrapAsset',
    ];
}
