<?php
/**
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */

namespace app\assets;

use yii\web\AssetBundle;
use yii\bootstrap\BootstrapAsset;

/**
 * Asset bundle for the Twitter bootstrap css files.
 *
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @since 2.0
 */
class CustomBootstrapAsset extends BootstrapAsset
{
    public $publishOptions = [
        'variablesFile' => "@app/assets/sass/variables.scss",
        'bootstrapFile' => "@app/assets/sass/bootstrap.scss",
    ];
}
