<?php
namespace app\assets;

use yii\web\AssetBundle;

/**
 * @author Eduardo Aparicio Cardenes <eduardo@dreammakerfactory.com>
 * @since 2.0
 */
class SoftwareArchitectProfileAsset extends AssetBundle
{
    public $sourcePath = '@app/assets';
    public $css = [
        'sass/templates/software-architect-profile.scss',
    ];
    public $js = [
    ];
    public $depends = [];
}
