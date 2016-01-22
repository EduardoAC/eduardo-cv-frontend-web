<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use app\models\ContactForm;

class PagesController extends Controller
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
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
            ],
        ];
    }

    public function actionIndex()
    {
        return $this->render('index');
    }
    
    public function actionSitemap()
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_RAW;
        $headers = Yii::$app->response->headers;
        $headers->add('Content-Type', 'application/xml');
        $this->layout = false;
        return $this->render('sitemap.xml');
    }

    public function actionFrontendProfile()
    {
        return $this->render('frontend-profile');
    }

    public function actionBackendProfile()
    {
        return $this->render('backend-profile');
    }

    public function actionSoftwareArchitectProfile()
    {
        return $this->render('software-architect-profile');
    }
    public function actionMyInteractiveCv()
    {
        return $this->render('how-do-i-build-it');
    }
    public function actionMyExperience()
    {
        return $this->render('my-experience');
    }

    public function actionMyProjects()
    {
        $provisionalStaticProjects = Array(
            [
                'type' => 'projects',
                'class' => 'col-md-4',
                'title' => 'Dream Maker Factory',
                'description' => "We invest in creative and innovative products. It's a incubation company oriented to help realize my spare time projects",
                'imgUrl' => 'images/projects/dreammakerfactory.jpg',
                'link' => 'http://www.dreammakerfactory.com/'
            ],
            [
                'type' => 'hackathons',
                'class' => 'col-md-4',
                'title' => "Sharon",
                'subtitle' => array(
                    'title' => 'HackTheVisual 2015',
                    'link' => 'http://www.hackthevisual.com/'
                ),
                'description' => "Interaction like you've never seen before. Winner of third challenge in the Hack The Visual, app that allow interact in real time share vidios with your contacts",
                'link' => 'http://devpost.com/software/sharon',
                'imgUrl' => 'images/projects/SharonLogo.jpg'
            ],
            [
                'type'  => 'hackathons',
                'class' => 'col-md-4',
                'title' => 'EventBuddy',            
                'subtitle' => array(
                    'title' => 'Oxford Launch 2014',
                    'link' => 'http://oxfordlaunch.com/'
                ),
                'description' => "Planner app that will help you organise your activities before, during and after the event. Finalists in Event Buddy Called Emotour after Oxford Launch Weekend 2014.",
                'imgUrl' => 'images/projects/eventBuddyLogo.jpg',
                'link' => 'https://youtu.be/sjXZpOvCfV8'
            ],
            [
                'type' => 'projects',
                'class' => 'col-md-4',
                'title' => "Trainer's WOD",
                'description' => 'La aplicación para entrenador y deportistas de alto rendimiento. I oriented this application to develop high quality content for trainers that helps to plans they WOD',
                'link' => 'http://www.trainerswod.com',
                'imgUrl' => 'images/projects/TrainersWoD.jpg',
            ],
            [
                'type' => 'ideas',
                'class' => 'col-md-4',
                'title' => 'Proyecto adoptame',
                'description' => 'Proyecto adoptame is a virtual donation platform to help a particular animals or new animal refuge where you can keep track what your money provide them',
                'imgUrl' => 'images/projects/proyectoAdoptame.jpg',
                'link' => 'http://www.proyectoadoptame.es'
            ],
            [
                'type' => 'projects',
                'class' => 'col-md-4',
                'title' => 'TuOcio',
                'description' => 'A free event network that store organizers events and provide tools to improves its publications reach',
                'imgUrl' => 'images/projects/TuOcioPorfolio.png',
                'link' => 'http://tuocio.org'
            ]
        );
        return $this->render('my-projects',array('projects' =>$provisionalStaticProjects));
    }

    public function actionContact()
    {
        $model = new ContactForm();
        if ($model->load(Yii::$app->request->post()) && $model->contact(Yii::$app->params['adminEmail'])) {
            Yii::$app->session->setFlash('contactFormSubmitted');

            return $this->refresh();
        } else {
            return $this->render('contact', [
                'model' => $model,
            ]);
        }
    }

    public function actionAbout()
    {
        return $this->render('about');
    }
}
