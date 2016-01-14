<?php

use yii\helpers\Url;
use app\assets\MyExperienceAsset;

$contactUrl = Url::to(['pages/contact']);
$this->title = 'My Work Experience - Eduardo Aparicio Cardenes';
$description = "My Work Experience";
$imgUrl = Url::to(['images/introduction-image-1280.jpg'],true);

$this->registerMetaTag(['name' => 'description', 'content' => $description], 'description');
$this->registerMetaTag(['name' => 'og:type', 'content' => "website"], 'og:type');
$this->registerMetaTag(['name' => 'og:url', 'content' => Url::current([],true)], 'og:url');
$this->registerMetaTag(['name' => 'og:title', 'content' => "My Work Experience"], 'og:title');
$this->registerMetaTag(['name' => 'og:site_name', 'content' => "Eduardo Aparicio Cardenes Website"], 'og:site_name');
$this->registerMetaTag(['name' => 'og:image', 'content' => $imgUrl], 'og:image');
$this->registerMetaTag(['name' => 'og:description', 'content' => $description], 'og:description');

MyExperienceAsset::register($this);
$experienceList = [
    [
        'startDate'   =>'August, 2014',
        'endDate'     =>'October, 2015',
        'company'     =>'Time Inc UK',
        'position'    =>'Web developer. ',
        'description' => "<p>During my time in Time Inc UK (Previously Time & Warner). "
        . "I will be able to participate in project as housetohome.co.uk and theroomedit.com. </p>"
        . "<p>As web developer role I had the opportunity to focus more in "
        . "Frontend in this period of my career than Backend developmet in a "
        . "proporciton 75% and 25%. I got the opportunity to improve my SEO "
        . "skills and test how impact and improve a website as housetohome "
        . "with over 15 million pageviews a month. I've been responsible "
        . "to do most of the new redesign on this website.</p>"
        . "<p>Adittionally, I've been involve in the creation of a new "
        . "product for this company call theroomedit.com which is responsive "
        . "site across all range of device where I played a full stack role "
        . "where a large range of tasks from develop templates and view to "
        . "parsethe model skeleton to parse the response from our Drupal API "
        . "to our Laravel frontend models.</p>",
    ],
    [
        'startDate'   =>'February, 2012',
        'endDate'     =>'April ,2014',
        'company'     =>'GlobalIncubator',
        'position'    =>'Web developer',
        'description' => '<p>I was responsible to develop new technologies to '
        . 'give support to our virtual incubation as well to provide a platform '
        . 'that allows them to collect data for business intelligence called Q-apps.</p>'
        . '<p>Therefore I was mainly oriented to develop backend structure '
        . 'using technologies as Threads, APC, Memcache, Semaphore, etc. I put '
        . 'in place a solution that currently still working today based in PHP '
        . 'language. </p><p> However, as you can realise a good backend '
        . 'platform needs also a optimize frontend client. Therefore I had the '
        . 'opportunity to develop parts of the frontend of Q-apps applications '
        . 'that is a complex system that allow to collect, process and view '
        . 'results in real-time. In order to do such requirement, one of tasks '
        . 'were to implement a results view that I create a complex filter '
        . 'system in JavaScript that allow to the user change dynamically '
        . 'what filters they want to see. Basically high configurable filter '
        . 'system based in the questions, types and data that you have in your '
        . 'Q-app.</p>',
    ],
    [
        'startDate'   => 'October, 2011',
        'endDate'     => 'July ,2012',
        'company'     => 'Rey Juan Carlos University',
        'position'    => 'Master in Computer graphics, games and virtual reality',
        'description' =>
         '<p>The overall objective of University / Master in Computer Graphics, '
        . 'Games and Virtual Reality is currently providing training and quality '
        . 'in video games, animation, physics simulation and virtual reality, '
        . 'both technological and methodological aspects of implementation.</p>',
    ],
    [
        'startDate'   => 'September, 2011',
        'endDate'     => 'December ,2011',
        'company'     => 'Canarias 7 Digital',
        'position'    => 'Junior Web developer',
        'description' => '<p>Contract to develop '
        . '<a href="http://monicavieira.com/" rel="nofollow" target="_blank">Monica Vieira</a>. '
        . 'my second contract for Canarias 7 digital to develop a new website. '
        . 'I created this one using Symfony 1.4 based in a new design provided from Canarias 7 Digital. '
        . 'As my previous contract with them, I implemented a full website using '
        . 'HTML, CSS, JAVASCRIPT and PHP technologies including javascript '
        . 'and symfony plugins to allow with a backend management that '
        . 'allow a basic CMS. The support I provided was 6 months for changes.</p>',
    ],
    [
        'startDate'   => 'May, 2011',
        'endDate'     => 'September,2011',
        'company'     => 'Canarias 7 Digital',
        'position'    => 'Junior Web developer',
        'description' => '<p>Contract to develop '
        . '<a href="http://www.gestaltcanarias.es/" rel="nofollow" target="_blank">Gelstalt Canarias Website</a>. '
        . 'I started my professional career as a web developer '
        . 'creating full sites in symphony 1.0 and 1.4 where I was responsible to '
        . 'deliver a full website based on a design provide for the company. '
        . 'For this task, I got involved with HTML, CSS, JAVASCRIPT and PHP '
        . 'technologies including javascript and symfony plugins to allow '
        . 'a really basic CMS that they still using today The support I '
        . 'provided was 6 months for changes.</p>',
    ],
    [
        'startDate'   => 'June, 2009',
        'endDate'     => 'April ,2011',
        'company'     => 'University of Las Palmas de Gran Canaria',
        'position'    => '<a href="http://berlioz.dis.ulpgc.es/roc-siani/publicaciones-principal/pdfs/memoria-pfc-eduardo-aparicio-cardenes-jul-2011.pdf" rel="nofollow" target="_blank">'
        . 'Odometry error reduction in a mobile robot using scan '
        . 'matching algorithms based in laser sensor range</a>',
        'description' => '<p>The MbICP is a variant of the ICP algorithm (Iterative '
        . 'Closest Point). This method has aim to correct the error caused by '
        . 'external odometry errors are not reflected Robot in codifcadores '
        . 'such as: landslides on wheels, rounding errors, etc. For It employs '
        . 'measurements of range sensor (laser) whose measurements have high '
        . 'accuracy within its operating range giving a negligible level of '
        . 'noise, which favors dimension of the problem.</p>',
    ],
    [
        'startDate'   => 'August, 2008',
        'endDate'     => 'May ,2009',
        'company'     => 'Mirada PLC',
        'position'    => 'Junior Software developer',
        'description' => '<p>I started my professional career in my last year '
        . 'of university as a Junior Developer in C++ under Eclipse IDE. </p>'
        . '<p>My role were developing next graphic interface for the new platform '
        . 'of ONO capturing the data from the stream for the satellite using '
        . 'them API and render this subsequence of data in a Grid view where '
        . 'the client can see the television schedule for all the channels.</p>'
        . '<p>We compiled using Cross compiling in Code Warrior for decoder '
        . 'devices provided from ONO, project that still currently in our homes '
        . 'today when we contract our paid television.</p>',
    ],
    [
        'startDate'   => 'October ,2003',
        'endDate'     => 'July, 2008',
        'company'     => 'University of Las Palmas de Gran Canaria',
        'position'    => 'Software Engineer',
        'description' => '<p>I developed as a Software Engineer with knowledge in '
        . 'artificial intelligence, robotics, programming and a long list of '
        . 'skills to be ready to become a Software architect. From the beginning,'
        . 'I studied every signature with a big passion to be ready for a good '
        . 'professional career. If you want to know more about what did I study'
        . 'here please enter in the <a href="http://www.eii.ulpgc.es/tb_university_ex/?q=ingenier%C3%ADa-inform%C3%A1tica-ii" rel="nofollow" target="_blank">'
        . 'ULPGC university plan</a></p>',
    ],
];
?>
<article class="container my-experience">
    <h1>My Work Experience</h1>
    <section class="introduction">
        <p>I've been working as web developer for almost five years 
            switched from a software engineer job because I found more 
            attractive for my professional career. Therefore, in this page 
            you will find the big picture of my evolution as a web developer, 
            where I decided to include my principal studies 
            that put me away for a long period of time for work world in order 
            to develop better my skills.
        </p>
        <p> 
            Essentially, in these years I learned how to build and 
            develop platforms where I acquired backend and frontend knowledge 
            to do more effective my job in these companies. However, my team 
            managers decided in a intuitive way always to assign me 
            more tasks related with frontend in the last three years. 
            It's probably then when I discovered that I really enjoyed 
            doing this work.
        </p>
        <p>
            Currently <strong>I decided that I want to become a successful frontend 
            engineer</strong>, I feel that it's my true vocation bring alive the amazing 
            design comming from the designers so please scroll down to see 
            my evolution across my work timeline .
        </p>
    </section>
    <section class="my-experience-timeline">
    <?php 
        foreach($experienceList as $experience):
            echo \Yii::$app->view->renderFile('@molecules/experience-block.php', $experience);
        endforeach;
    ?>
    </section>
    <section class="conclusion">
        <p>If you want to ask me, please feel free to 
            <a href="<?=$contactUrl?>">contact me</a> or drop me 
            a <a href="mailto:eduardo@dreammakerfactory.com">email</a>. 
            I will be happy to answer any question, offer or consideration as 
            soon as possible</p>
    </section>
</article>

