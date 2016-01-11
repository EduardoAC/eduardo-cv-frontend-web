<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$this->title = 'My Projects - Eduardo Aparicio Cardenes';
$description = "Here you can find my projects here include hackathons, work and personal ideas. This page will be upgrade and change with the new comming projects";
$imgUrl = Url::to(['images/introduction-image-1280.jpg'],true);

$this->registerMetaTag(['name' => 'description', 'content' => $description], 'description');
$this->registerMetaTag(['name' => 'og:type', 'content' => "website"], 'og:type');
$this->registerMetaTag(['name' => 'og:url', 'content' => Url::current([],true)], 'og:url');
$this->registerMetaTag(['name' => 'og:title', 'content' => "My Projects"], 'og:title');
$this->registerMetaTag(['name' => 'og:site_name', 'content' => "Eduardo Aparicio Cardenes Website"], 'og:site_name');
$this->registerMetaTag(['name' => 'og:image', 'content' => $imgUrl], 'og:image');
$this->registerMetaTag(['name' => 'og:description', 'content' => $description], 'og:description');

use app\assets\MyprojectspageAsset;
MyprojectspageAsset::register($this);
?>
<article class="my-projects">
    <h1 class='container'>My projects</h1>
    <section class="container introduction">
        <p>
           I started to have ideas and dream since I was child however 
           it wasn't until I joined as a Web Developer for a wonderful company call 
           <a href='http://www.globaincubator.com' target="_blank" rel="nofollow">GlobalIncubator</a>
           that I realise all the ideas and opportinities that exist 
           in the world to make it better and succesful business. 
           There I met one of the most amazing people I could imagine in a 
           atmosphere of innovation and hard work, person as Pablo Trianfilo, 
           Luis Gonzalez-Blanch, Jose Sanz Polo and many others. 
        </p>            
        <p>
           During over two years I learned a lot about Innovation, Ideas and how to make it happens but
           more important that you will never achieve anything if you don't take action.
           From there I decided to start to write down every single idea and start to develop as
           a website, paper project, giving flying, making questionaries anything that put my on track.
        </p>
        <p>
            Therefore, I want to share with you some of my projects, hackathons and ideas that can briefly
            provide you more information about my skill set and who knows may be discuss futher or support me
            with them.
        </p>
    </section>
    <?php echo \Yii::$app->view->renderFile('@organisms/color-legend-projects.php',[]);?>
    <section class="collection-projects">    
        <?php 
            foreach($projects as $data):
                echo \Yii::$app->view->renderFile('@molecules/project-description-block.php',$data);
            endforeach;
        ?>
    </section>
    <section class="container conclusion">
        <h2>Final Considerations</h2>
        <p>
            All these projects you can see above are only a part of the content.
            Currently, I've been in several hackathons and event accross 3 
            countries and two continents. I develop dozens of ideas and implemented
            5 of them.            
        </p>
        <p>
            However, I admit it's take time to put all together after a decade of work
            and dedication from my spare time in a unique place but no worries, 
            I will be happy to talk about anytime and I will be adding content slowly
            but constant because I love it.
        </p>
        <p>
            Often I hear about people to tell me that I must start my own business
            and I will but currently I love to help another people to achieve them goal
            learning a lot of things from them. I guess I want to learn from you 
            if you give me the chance.          
        </p>
    </section>
</article>

