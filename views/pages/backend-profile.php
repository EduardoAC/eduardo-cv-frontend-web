<?php
use yii\helpers\Url;
use app\assets\BackendProfileAsset;
$this->title = 'My Backend background - Eduardo Aparicio Cardenes';
$description = "I like the backend world as part of the WWW enviroment, "
        . "I got involved for the last five years. I learned php, mysql and more."
        . "Access to know where i specialize";
$imgUrl = Url::to(['images/backend-developer.png'],true);

$this->registerMetaTag(['name' => 'description', 'content' => $description], 'description');
$this->registerMetaTag(['name' => 'og:type', 'content' => "website"], 'og:type');
$this->registerMetaTag(['name' => 'og:url', 'content' => Url::current([],true)], 'og:url');
$this->registerMetaTag(['name' => 'og:title', 'content' => "My Backend background"], 'og:title');
$this->registerMetaTag(['name' => 'og:site_name', 'content' => "Eduardo Aparicio Cardenes Website"], 'og:site_name');
$this->registerMetaTag(['name' => 'og:image', 'content' => $imgUrl], 'og:image');
$this->registerMetaTag(['name' => 'og:description', 'content' => $description], 'og:description');

BackendProfileAsset::register($this);
$strengths = [
   [
        'class' => '',
        'title' => 'Languages',
        'description' => "<p>I started with Java language for assignments in the university. "
       . "<strong>Java is a language that I know about it however I lack of "
       . "profesional experience</strong>. This language I usually pick up "
       . "whenever it's neccesary to develop Android apps for my personals "
       . "projects and hackathons.</p>"
       . "<p>On the other hand, I got a strong background in <strong>PHP for the last five years</strong>, "
       . "mainly for website and SaaS developments in differents companies, I specialize "
       . "on OOP, Complex algorithms and Code optimization. "
       . "Additionally, <strong>I have five years of MySQL professional experience </strong>"
       . "capable to design and implement database models that suit with user needs "
       . "or complex systems</p>"
       . "<p>Finally, I have been using languages as shell and xml for long time to set up"
       . "UNIX enviroments as well API communications for backend enviroments</p>",
        'imgUrl' => 'images/backend/languages.jpg'
    ],
    [
        'class' => '',
        'title' => 'Frameworks, Libraries & Tools',
        'description' => "<p>From the beginning of my professional career, "
        . "I've been using frameworks and tools that helps me to do my job more "
        . "effective. In specific, I got experience using </p>"
        . "<ul><li>Symfony 1.4 and 2 (4+ years)</li>"
        . "<li> Laravel 4 (1.5 years)</li>"
        . "<li>Yii2 (4+ years)</li></ul>"
        . "<p>In addition, I use  Composer, Bower and Grunt to help to import "
        . "extensions, libraries and packages improving the modularity of my "
        . "developments.</p>"
        ,
        'imgUrl' => 'images/backend/frameworks.jpg'
    ],
    [
        'class' => '',
        'title' => 'Working tools',
        'description' => "<p>As a developer, you must be capable of "
        . "use control version systems in order to track your changes, specially "
        . "when you are collaborating in projects with more people working at "
        . "the same time. That why <strong>I started to use Git 4 years ago</strong>, "
        . "however, it wasn't until one and half years ago I added code review and pull "
        . "requests using github to my developments learned from my Time Inc UK job.</p>"
        . "<p>As a complement, I've been doing web developments in Netbeans and "
        . "PHPStorm for years. However, I do prefer Eclipse for Java and Android developments."
        . "That will make extremely easy to adapt to the IDE you are using in the company</p>",
        'imgUrl' => 'images/backend/working-tools.jpg'
    ],
    [
        'class' => '',
        'title' => 'Performance',
        'description' => "<p>I'm love to achieve the maximal perfomance in any "
        . "feature i do, as first iteration i develop my code using "
        . "<a href='https://en.wikipedia.org/wiki/Big_O_notation' target='_blank' rel='nofollow'> "
        . "Big O notation for time complexity </a> each time.</p> <p>Once I done this "
        . "I go for server tools that allow me to reduce the bottleknecks "
        . "using Memcached, APC and Apache set up to reduce algorithm calculations, "
        . "databases access and client requests. Adding to this system a "
        . "update cache system on demand avoid inconsistent data</p>"
        . "<p>Finally, I like to enable monitoring of the system with NewRelic "
        . "for two reasons. First for debugging and testing porposes, Secondly, "
        . "it's hard to extract the best performance in one iteration so this allow"
        . "to analyze the opportunities to improve the system</p>"
        ,
        'imgUrl' => 'images/backend/performance.jpg'
    ],
    [
        'class' => '',
        'title' => 'Testing & Debugging',
        'description' => "<p>I use combine NewRelic, Unit testing, XDebug and "
        . "Jenkings to test and debug the systems, I work with. These are a "
        . "good tools that allow us to validate our code or find bugs.</p>"
        . "<p>Therefore each time a person try to deploy we  will be able to "
        . "run a battery of tests on our feature and the whole system. "
        . "to helps us to see what will it be the impact of releasing our feature. "
        . "Preventing us to put on live features that can break our sites. "
        . "In addtition to that, when we join this to our control version enviroment "
        . "we can find what need to be fixed and where locate it.</p>"
        . "<p>However, I aware this setup won't avoid all the bugs in live "
        . "releases but it's a good filter against common bug and issues "
        . "in a collaborative development enviroment</p>",
        'imgUrl' => 'images/backend/testing-debuging.jpg'
    ],
];
?>
<article class="container backend-profile">
    <h1>My Backend Developer Background</h1>
    <section class="introduction">
        <p>
            I did backend developments as web developer for many years 
            and I'm still doing sometimes when it's required. It's a part of 
            myself to try to achieve the best result possible doing when need 
            to be done. I've involved in this area for the last five years 
            sometimes as a contractor, a employee and others in my personal projects. 
            I understand well how the back end works and how to build it 
            from scratch. 
        </p>
        <p>
            Also, if I currently want to specialize as frontend developer, I can
            provide experience and vision to develop together a great platform
            that helps us to achieve our goal together. 
        </p>
        <p>
            Consequently, I like to do backend work as well as frontend because
            all it's about this WWW world that I have passion about it. 
            Therefore I won't hesitate to get involved myself when you ask me for. 
            Here is my backend background so i hope you find useful because it's 
            a great complement for a frontend developer have comprehesion 
            and understanding the language the backend developers speaks.
        </p>
    </section>
    <section class='my-backend-skills'>
        <hr>
        <?php 
            $odd = true;
            foreach($strengths as $data):
                $data['odd'] = $odd;
                echo \Yii::$app->view->renderFile('@molecules/content-block.php',$data);
                echo '<hr>';
                $odd = !$odd;
            endforeach;
        ?>
        <a href="https://www.linkedin.com/in/eacardenes" rel="nofollow" target="_blank">
            <p class="conclusion">Would you like to know more?</p>
        </a>
    </section>
</article>
