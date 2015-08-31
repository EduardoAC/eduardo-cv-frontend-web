<?php 
// displays the view file "@app/views/site/license.php"
echo \Yii::$app->view->renderFile('@organisms/introduction.php');
echo \Yii::$app->view->renderFile('@organisms/profiles.php');
echo \Yii::$app->view->renderFile('@organisms/projects.php');
echo \Yii::$app->view->renderFile('@organisms/content-blogs.php');
echo \Yii::$app->view->renderFile('@organisms/jobs-timeline.php');
echo \Yii::$app->view->renderFile('@organisms/greetings.php');
echo \Yii::$app->view->renderFile('@organisms/yourself-information.php');