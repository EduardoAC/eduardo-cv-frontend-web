<?php

use yii\helpers\Url;
use app\assets\SoftwareArchitectProfileAsset;
$this->title = 'My Software Architect background - Eduardo Aparicio Cardenes';
$description = "I'm a informatic engineer that I specialized in software architectures "
        . "that I use in my daily basic to improve the quality of the software I deliver to my clients";
$imgUrl = Url::to(['images/software-architect/software-architect-development-steps'],true);

$this->registerMetaTag(['name' => 'description', 'content' => $description], 'description');
$this->registerMetaTag(['name' => 'og:type', 'content' => "website"], 'og:type');
$this->registerMetaTag(['name' => 'og:url', 'content' => Url::current([],true)], 'og:url');
$this->registerMetaTag(['name' => 'og:title', 'content' => "My Software Architect background"], 'og:title');
$this->registerMetaTag(['name' => 'og:site_name', 'content' => "Eduardo Aparicio Cardenes Website"], 'og:site_name');
$this->registerMetaTag(['name' => 'og:image', 'content' => $imgUrl], 'og:image');
$this->registerMetaTag(['name' => 'og:description', 'content' => $description], 'og:description');

$myprojects = Url::to(['pages/my-projects']);

SoftwareArchitectProfileAsset::register($this);
$strengths = [
    [
        'class' => '',
        'title' => 'Architectures definition',
        'description' => "<p>How to define your domain is the first part to solve it. "
        . "However, it's not always easy thing to do it that as part of my last "
        . "6 years as developer, I keep improving my skills with specific courses "
        . "as Human Computer Interaction Course from University of California, San Diego's</p>"
        . "<p>As part of this learning, I built personal projects in order to "
        . "understand it. Platform as TuOcio, Dream Maker Factory, Trainer's WoD "
        . "was made to get better understanding of users, you can see more details "
        . "in <a href='$myprojects'>my projects</a> section.",
        'imgUrl' => 'images/software-architect/architect-definition.jpg'
    ],
    [
        'class' => '',
        'title' => 'Technology selection',
        'description' => "<p>I got cumulative knowledge acquired in the past "
        . "four years as a contractor and later as a developer in GlobalIncubator "
        . "I had to manage a lot of differents technologies to build the most "
        . "effective solution for my clients that keep me busy updating constanly "
        . "my knowledge about frameworks, api, plugins and languages for frontend "
        . "and backend developments.</p>"
        . "<p>Sometimes it can be more effective and more affordable for clients "
        . "and developers to find the right balance between features and capabilities "
        . "with necesities and scalability. </p>",
        'imgUrl' => 'images/software-architect/website-technology.jpg'
    ],
    [
        'class' => '',
        'title' => 'Design, development and testing',
        'description' => "<p>Habitually, my roles had involved to delegate features "
        . "and applications under my supervision at the beginning because I got "
        . "the full development contract in other cases because I was part of "
        . "a startup like globalincubator where I build a trustful relationship "
        . "with my project manager.</p>"
        . "<p>I learned from my degree and professional career to analyze and develop"
        . "effective solutions for each situation for the past four years.</p>",
        'imgUrl' => 'images/software-architect/software-architect-development-steps.jpg'
    ],
    [
        'class' => '',
        'title' => 'Scrum methodology',
        'description' => "<p>I've been working with <strong>Scrum over a year and a half</strong>. "
        . "I fully aware about the potential that have deliver software with this method. "
        . "Although, I worked for many years using <strong>standard project management</strong> based "
        . "on <strong>tasks and gant diagrams for many years</strong>. I convince that devilver software based "
        . "in sprint and feature feels more natural in Web developments</p>"
        . "<p>Currently, I'm studying Scrum methodology and implement in my personal projetcs"
        . "in order to get full understanding of each role and training myself to become "
        . "a Scrum Master in the next future</P>",
        'imgUrl' => 'images/software-architect/scrum-methodology.jpg'
    ],
];
?>
<article class="container software-architect-profile">
    <h1>My Software Architect Background</h1>
    <section class="introduction">
        <p>
            I'm a certified Informatic Engineer that have been trained ready 
            to build technical software and hardware architectures that 
            I loved the very beginning dreaming to build the best PC ever imagine
            from the hardware to the software that will extract all the potential.
        </p>
        <p>
            However, I realised soon that this goal is a team effort, it's impossible
            to achieve it on your own in a lifespawn, so I decided to focus
            in a more realistic approach to become a really good Software architect
            that deliver high quality job. 
        </p>
        <p>
            My firsts jobs as developer started to design, build and implement 
            components and entire enviroments as websites or libraries in bigger 
            projects as a Business intelligence module or Filtering systems of 
            Big Data information. 
        </p>
        <p>
            As far I remember I've always been a developer that built a special trust
            with my bosses each time to allow me to put in place well designed solutions
            for all the platforms I've been working in my professional career. I feel deeply
            grateful for that, they gave my the chance to improve my software architect skills.
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