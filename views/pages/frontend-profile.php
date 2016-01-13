<?php

use yii\helpers\Url;
use app\assets\FrontendProfileAsset;
$this->title = 'My Frontend background - Eduardo Aparicio Cardenes';
$description = "My frontend background is currently growing with elements as "
        . "AngularJS, SVG, Grunt, etc. Here you will see my skills from my five years as web developer";
$imgUrl = Url::to(['images/frontend-developer.png'],true);

$this->registerMetaTag(['name' => 'description', 'content' => $description], 'description');
$this->registerMetaTag(['name' => 'og:type', 'content' => "website"], 'og:type');
$this->registerMetaTag(['name' => 'og:url', 'content' => Url::current([],true)], 'og:url');
$this->registerMetaTag(['name' => 'og:title', 'content' => "My Frontend background"], 'og:title');
$this->registerMetaTag(['name' => 'og:site_name', 'content' => "Eduardo Aparicio Cardenes Website"], 'og:site_name');
$this->registerMetaTag(['name' => 'og:image', 'content' => $imgUrl], 'og:image');
$this->registerMetaTag(['name' => 'og:description', 'content' => $description], 'og:description');

$softwareArchitect = Url::to(['pages/software-architect-profile']);
$backendDeveloper  = Url::toRoute(['pages/backend-profile']);

FrontendProfileAsset::register($this);
$strengths = [
    [
        'class' => '',
        'title' => 'Languages',
        'description' => "<p>I have been working in HTML, JS & CSS for the last five years,"
        . " more specifically I swapped from HTML4 & CSS2 to HTML5 & CSS3 three years ago. "
        . "I got strong experience developing complex JS systems using OOP, prototyping "
        . " and design patterns to maximize performance and user experience</p>"
        . "<p>Additionally, I began working on JSON, SASS and LESS two years ago, "
        . "mostly in SASS for Styling and JSON for REST communications because it has "
        . "better capabilities from my point of view.</p>"
        ,
        'imgUrl' => 'images/frontend/languages.jpg'
    ],
    [
        'class' => '',
        'title' => 'Frameworks, Libraries & Tools',
        'description' => "<p>Accross all these five years of development, "
        . "I got the opportunity to learn multiples frameworks, libraries and tools "
        . "that helps me to do my job. Mainly, I use in my daily basics Bootstrap and Jquery</p>"
        . "<p>However, I got wide experience with performance and testing "
        . "elements as Grunt, requireJS, Node, etc. <strong>from creating sprite "
        . "in compass to define modules that load on demand in requireJS</strong>, "
        . "going through use templates twig and AJAx requests</p>"
        . "<p>Recently, I started with some experiments SVG plus D3 a few months ago "
        . "that you can see examples in my GitHub.</p>"
        ,
        'imgUrl' => 'images/frontend/frameworks-libraries-plugins.jpg'
    ],
    [
        'class' => '',
        'title' => 'Responsive Web Design & SEO',
        'description' => "<p>These elements are key in the current developments "
        . "to be a good frontend developer. I understood the importance "
        . "from my experience in "
        . "<a href='http://www.timeincuk.com' rel='nofollow' target='_blank'>Time Inc UK</a> "
        . "where we tested every change impact in pages views, sales and ad-clicks "
        . "basing our measures in tools like CrazyEgg, Google Analitycs and Optimizely.</p>"
        . "<p>All these knowledges I acquired in this company, it allows me "
        . "to put in place changes for this website to render it properly "
        . "in any screen size device. In addition to use SEO elemets "
        . "that improves positioning.</p>",
        'imgUrl' => 'images/frontend/responsive-web-design.jpg'
    ],
    [
        'class' => '',
        'title' => 'Performance',
        'description' => "<p>This is key for the success of your website. "
        . "I have been working for last four years to find how to improve every "
        . "single detail in order to get the best performance possible for the "
        . "system because a one second of delay could cost you a client</p>"
        . "<p>Compress and split your css, images and javascript, "
        . "Load asynchronous the content, reduce the number of request "
        . "are some of the considerations to do when you are optimizing your website.</p>"
        . "<p>However, I will study what are your necesities because "
        . "I won't shoot a mosquito with a cannon, easy solution could work better in some cases</p>",
        'imgUrl' => 'images/frontend/performance.jpg'
    ],
    [
        'class' => '',
        'title' => 'Testing',
        'description' => "<p>I forgot this one for many years because in most "
        . "of the cases because it wasn't a priority in the frontend. "
        . "It was enough using tools as New Relic, Google analitycs "
        . "and Selenium to test our systems.</p>"
        . "<p>However, I started to use Grunt with Unit testing around a year ago "
        . "to verify our class expected behaviour were working properly "
        . "and I rediscovered how important is having a testing to avoid small "
        . "issues when you are in a team or you revisit a file after some time.</p>"
        . "<p>Therefore, I decided to spend some time learning new technices "
        . "useful for future projects</p>",
        'imgUrl' => 'images/frontend/testing.jpg'
    ],
//    [
//        'class' => '',
//        'title' => 'Code style guides',
//        'description' => "Code style guides",
//        'imgUrl' => 'images/frontend/code-style.jpg'
//    ],
];
?>
<article class="container frontend-profile">
    <h1>My Frontend Developer Background</h1>
    <section class="introduction">
        <p>
            My first steps on Internet started as freelance web developer creating 
            websites for companies that involves four main skills HTML, CSS, 
            JAVASCRIPT and PHP in my case. However Internet technologies
            have being growing in complexity since I did my first websites 
            at begining of 2011. 
            As a informatic engineer I knew the importance to 
            specialize to be the best in your area.
        </p>
        <p>
            That's why I decided to focus more my profesional career next steps in this wonderful discipline 
            without forget my past. Therefore, to my current knowledge growing as frontend developer 
            I want to high line my extensive experience as <a href='<?=$softwareArchitect?>'>Software architect</a> 
            and <a href='<?=$backendDeveloper?>'>Backend developer</a> as a complement of my skills 
            that allow me to deeply aware for the global vision of the designs 
            and comunicate effectively with other teams.
        </p>
        <p>
            Currently, I'm developing my knowledge in this area, in specific in
            <strong>AngularJS, SVG, performance and testing with frameworks as Jasmine.</strong>
            What are my strengths as a frontend developer?
        </p>
    </section>
    <section class='my-frontend-skills'>
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