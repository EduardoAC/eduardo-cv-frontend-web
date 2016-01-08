<?php

namespace app\assets;

use yii\web\AssetBundle;
use yii\bootstrap\BootstrapAsset;

/**
 * Asset bundle for the Twitter bootstrap css files.
 *
 * @author Eduardo Aparicio Cardenes <eduardo@dreammakerfactory.com>
 * @since 2.0
 */
class CustomBootstrapAsset extends BootstrapAsset
{
    public $publishOptions = [
        'variablesFile' => "@app/assets/sass/variables.scss",
        'bootstrapFile' => "@app/assets/sass/bootstrap.scss",
    ];
}
