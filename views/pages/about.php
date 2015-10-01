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
            <strong>I mounted my first computer with 14 and fixing computers at 16 years old.</strong> 
            I still remember how we used to connect to internet with our Intel 486 and 28k modem. 
            I knew that technology and internet it was my world, create things that other people use filled my soul.
        </p>
        <p>
            Everyone used to ask my about hardware and technologies all the time, help, fix and advice was my work until I joined to the university. 
            My first year it was the most exited day of my life, from Matemathic analysis to build computers, I did a really hard work studing every day 
            but I enjoyed every second of my <a href='http://www2.ulpgc.es//index.php?pagina=estudios&ver=weees002&tipoplan=&codigo=180_1801_10_00#2' rel='nofollow'>Informatic engineer</a>.
        </p>
        <div class='university'>
            <?= Html::img('images/eduardo-aparicio-cardenes-graduation.jpg',array('class'=>'img-responsive'));?>
            <p>
                I always remember <strong>my time in the ULPGC and Rey Juan carlos Universities as the best time to exploit and develop my creativity</strong>,
                 improving my skills, studying every day, doing my homework and spend a lot of hours coding and solving the task from my lectures.
            </p>
            <p>
                Many times, I remember how my teachers struggle with me often doing more complex solutions that it was required for the exercise 
                that I needed to solve it because I want to discover and research. 
            </p>
            <p>
                I have been  different thinking all my life, <strong>sometimes wrong and other right</strong> 
                but I did a lot of interesting things that open my mind that made me the man who i am now. 
                I feel proud of my marks where my only a few low marks was in my expedient as you can see bellow.
            </p>
            <div class='row university-expedient'>
                <div class='item col-sm-6'>
                    <?= Html::img('images/certificacion-academica-eduardo-aparicio-cardenes-pag_1.jpg',array('class'=>'img-responsive'));?>
                    <span>Eduardo Aparicio Cardenes Marks Page 1</span>
                </div>
                <div class='item col-sm-6'>
                    <?= Html::img('images/certificacion-academica-eduardo-aparicio-cardenes-pag_2.jpg',array('class'=>'img-responsive'));?>
                    <span>Eduardo Aparicio Cardenes Marks Page 2</span>
                </div>
            </div>
        </div>
    </div>
</section>
