<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use app\models\ContactForm;

class ProjectsController extends Controller
{
    public function behaviors()
    {
        return [];
    }

    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
        ];
    }
   
    public function actionMyInteractiveCv()
    {
        return $this->render('how-do-i-build-it');
    }

}
