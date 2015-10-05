<?php
/**
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */

namespace app\assets;

use yii\web\AssetBundle;

/**
 * @author Qiang Xue <qiang.xue@gmail.com>
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
