<?php
namespace app\assets;

use yii\web\AssetBundle;

/**
 * @author Eduardo Aparicio Cardenes <eduardo@dreammakerfactory.com>
 * @since 2.0
 */
class BackendProfileAsset extends AssetBundle
{
    public $sourcePath = '@app/assets';
    public $css = [
        'sass/templates/backend-profile.scss',
    ];
    public $js = [
    ];
    public $depends = [];
}
