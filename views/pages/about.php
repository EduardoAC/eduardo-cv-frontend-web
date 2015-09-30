<?php
use yii\helpers\Html;
use yii\widgets\Breadcrumbs;
use app\assets\AboutAsset;

/* @var $this yii\web\View */
$this->title = 'About Eduardo';

AboutAsset::register($this);
?>
<section class="about-me">
    <div class="introduction">        
        <div class="gradient-effect">
            <?= Html::img('images/about-eduardo-hacktheviual-1280.jpg',array('class'=>'img-responsive'));?>
        </div>
        <div class="heading-block">
            <h1>The Story of Eduardo Aparicio Cardenes</h1>
            <p>Hi! I'm Eduardo Aparicio Cardenes. I'm a Web Developer, Software architect and Entrepreneur.</p>
            <p>
                Currently, I'm co-founder of <a href='http://www.innervirtuoso.com'>Inner Virtuoso</a>. Inner Virtuoso uses Global Incubator technology to create tailor made solutions that boost the development of human capital.
            </p>
            <p>And founder of <a href='http://www.dreammakerfactory.com'>Dream Maker Factory</a>, takes ideas with potential and implement in successful products where I have three projects in my pipeline, <a href='http://www.tuocio.org'>TuOcio</a>, <a href='http://www.trainerswod.com/'>Trainer's WOD</a> and <a href='http://www.proyectoadoptame.es'>Proyecto Adoptame</a>.</p>
            <p>When I'm not doing those things, I'm working for companies as a web developer or software architect. I'm always happy to join to your projects and make it happens.</p>
            <?= Html::img('images/photo-working.jpg',array('class'=>'img-responsive img-thumbnail visible-xs visible-lg'));?>
        </div>
    </div>
    <div class="container site-about">
        <h2>How did I started in this world?</h2>
        <p>
                I grew with computers, coding and internet. My mom was informatic teacher and my first experience 
            with computers, it was when my mom took me to her informatic class when I was 8 years old. After that I've
            been with computers at home all my life, starting for Amstrad CPC to My current Intel Core i5, 
            (I used most of the IBM and INTEL as 186, 286, 486, Pentium I, II, III, IV, etc.)  
        </p>
        <?= Html::img('images/my-life-timeline.png',array('class'=>'img-responsive'));?>
        <p>
            Since then, I was the first of my school colleges to have the latest version of computer at home. 
            I mounted my first computer with 14 and fixing computers at 16 years old. 
            I still remember how we used to connect to internet with our Intel 486 and 28k modem. 
            I knew that technology and internet it was my world, create things that other people use filled my soul.
        </p>
        <p>
            Everyone used to ask my about hardware and technologies all the time, help, fix and advice was my work until I joined to the university. 
            My first year was the most exited day of my life, from Matemathic analysis to build computers, I did a really hard work studing every day 
            but I enjoyed every second of my <a href='http://www2.ulpgc.es//index.php?pagina=estudios&ver=weees002&tipoplan=&codigo=180_1801_10_00#2' rel='nofollow'>Informatic engineer</a>
        </p>
    </div>
</section>
