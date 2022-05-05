<template>
<div>
<div class="navigation navigation_two">
  <div class="container">
    <div class="logo">
      <div style="padding:2px 20px">
        <img width="40"
             src="../../assets/images/img.png" />
        <img width="80"
             src="../../assets/images/sote-o.png"/>
      </div>
    </div>
    <div id="navigation" class="menu-wrap">
      <ul>
        <li class="active has-sub"><a href="">Home</a>
          <ul>
            <li><a href="">Home One</a> </li>
            <li><a href="index-two.html">Home Two</a> </li>
          </ul>
        </li>
        <li><a href="about.html">About</a></li>
        <li class="has-sub"><a href="">Pages</a>
          <ul>
            <li><a href="course-category.html">Course Category</a> </li>
            <li><a href="courses.html">Our Course</a> </li>
            <li><a href="single-course.html">Course Details</a> </li>
            <li><a href="login.html">Login Page</a> </li>
            <li><a href="register.html">Register Page</a> </li>
            <li><a href="teachers.html">Instructor Page</a> </li>
            <li><a href="single-teacher.html">Instructor Details</a> </li>
            <li><a href="events.html">Event Page</a> </li>
            <li><a href="single-event.html">Event Details</a> </li>
            <li><a href="gallery.html">Gallery Page</a> </li>
            <li><a href="404.html">404 Page</a> </li>
          </ul>
        </li>
        <li class="has-sub"><a href="courses.html"> Courses</a>
          <ul>
            <li><a href="course-category.html">Course Category</a> </li>
            <li><a href="courses.html">Our Course</a> </li>
            <li><a href="single-course.html">Course Details</a> </li>
          </ul>
        </li>
        <li class="has-sub"><a href="blog.html">Blog</a>
          <ul>
            <li><a href="blog.html">Blog One</a> </li>
            <li><a href="single-blog.html">Blog Details</a> </li>
            <li><a href="events.html">Event Page</a> </li>
            <li><a href="single-event.html">Event Details</a> </li>
          </ul>
        </li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>
    <!-- End: navigation  -->
    <div class="header_sign">
      <a href="#" class="more-link">登录</a>
    </div>
    <!-- End: Sign in -->
  </div>
  <!--/ container -->
</div>
<!-- End: header navigation
==================================================-->


<!-- Start: Hero Section
==================================================-->
<div class="slider_owl">
  <el-carousel trigger="click" height="600px">
    <el-carousel-item>
  <div class="hero-section hero_two">
    <div class="container">

      <el-row class="row">
        <el-col :md="12" :sm="24" class="col-md-6 col-sm-12">
          <div class="hero_text">
            <h2> e <br>
              Anytime From a <br>
              Device Only</h2>
            <p> Online learning is not the next big thing, <br>
              it is now the greatest thing ever. </p>
            <a href="#" class="more-link"> 开始使用 </a>
          </div>
          <!-- /.hero_text -->
        </el-col>
        <!-- /.col-md-6 col-sm-12-->

        <el-col :md="12" :sm="24" class="col-md-6 col-sm-12">
          <div class="hero_img">
<!--            <img src="static/picture/coding.png" alt="" class="coding">-->
            <div class="hero_img_ani" id="scene">
              <img src="@/assets/picture/hero-image.svg" alt="" data-depth="0.2" class="layer">
            </div>
            <div class="hero_stu">
              <h4> 13k+ Students</h4>
              <img src="@/assets/picture/hero_students.png" alt="">
            </div>
            <img src="@/assets/picture/pencil.png" alt="" class="pencil">
            <!-- /.hero_stu-->
          </div>
        </el-col>
        <!-- /.col-md-6 col-sm-12-->
      </el-row>
      <!-- /. row -->
    </div>
    <!-- /. container -->
    <div class="hero_ellipse_icon">
      <img class="ellipse1" src="@/assets/picture/ellipse1.png" alt="">
      <img class="ellipse2" src="@/assets/picture/ellipse11.png" alt="">
      <img class="ellipse3" src="@/assets/picture/ellipse3.png" alt="">
      <img class="ellipse4" src="@/assets/picture/ellipse4.png" alt="">
      <img class="ellipse7" src="@/assets/picture/ellipse7.png" alt="">
      <img class="ellipse8" src="@/assets/picture/ellipse10.png" alt="">
      <img class="ellipse6" src="@/assets/picture/ellipse9.png" alt="">
    </div>
    <!-- /.hero_ellipse_icon-->
  </div>
    </el-carousel-item>
    <el-carousel-item>
  <div class="hero-section hero_two">
    <div class="container">
      <el-row class="row">
        <el-col :md="12" :sm="24" class="col-md-6 col-sm-12">
          <div class="hero_text">
            <h2> Learn Anywhere <br>
              Anytime From a <br>
              Device Only</h2>
            <p> Online learning is not the next big thing, <br>
              it is now the greatest thing ever. </p>
            <a href="#" class="more-link"> 开始使用 </a>
          </div>
          <!-- /.hero_text -->
        </el-col>
        <!-- /.col-md-6 col-sm-12-->

        <el-col :md="12" :sm="24" class="col-md-6 col-sm-12">
          <div class="hero_img">
<!--            <img src="static/picture/coding.png" alt="" class="coding">-->
            <div class="hero_img_ani" id="scene4">
              <img src="@/assets/picture/hero-image.svg" alt="" data-depth="0.10" class="layer">
            </div>
            <div class="hero_stu">
              <h4> 13k+ Students</h4>
              <img src="@/assets/picture/hero_students.png" alt="">
            </div>
            <img src="@/assets/picture/pencil.png" alt="" class="pencil">
            <!-- /.hero_stu-->
          </div>
        </el-col>
        <!-- /.col-md-6 col-sm-12-->
      </el-row>
      <!-- /. row -->
    </div>
    <!-- /. container -->
    <div class="hero_ellipse_icon">
      <img class="ellipse1" src="@/assets/picture/ellipse1.png" alt="">
      <img class="ellipse2" src="@/assets/picture/ellipse11.png" alt="">
      <img class="ellipse3" src="@/assets/picture/ellipse3.png" alt="">
      <img class="ellipse4" src="@/assets/picture/ellipse4.png" alt="">
      <img class="ellipse7" src="@/assets/picture/ellipse7.png" alt="">
      <img class="ellipse8" src="@/assets/picture/ellipse10.png" alt="">
      <img class="ellipse6" src="@/assets/picture/ellipse9.png" alt="">
    </div>
    <!-- /.hero_ellipse_icon-->
  </div>
    </el-carousel-item>
  </el-carousel>
  <el-divider></el-divider>
</div>

<!-- End: Hero Section
==================================================-->


<!-- Start: Work Flow Section
==================================================-->
<section class="workflow-section pt-120">
  <!-- Container -->
  <div class="container">
    <!-- Start: Heading -->
    <div class="base-header text-center">
      <h3> Our Work Flow</h3>
    </div>
    <!-- End: Heading -->
    <el-row class="row" :gutter="20">
      <el-col :lg="8" :md="12" :sm="24" class="col-lg-4 col-md-6 col-sm-12">
        <!-- category 1 -->
        <div class="workflow_item">
          <i class="pe-7s-search"></i>
          <h4> Find Your Course </h4>
          <p>Lorem ipsum dolor sit amet can be sed diam nonumy eirmod keeps an
            the satriction of whole life that enter.</p>
        </div>
      </el-col>
      <!--/ col-lg-4 col-md-6 col-sm-12  -->
      <el-col :lg="8" :md="12" :sm="24" class="col-lg-4 col-md-6 col-sm-12">
        <!-- category 1 -->
        <div class="workflow_item">
          <i class="pe-7s-date"></i>
          <h4>Book Your Seat </h4>
          <p>Lorem ipsum dolor sit amet can be sed diam nonumy eirmod keeps an
            the satriction of whole life that enter.</p>
        </div>
      </el-col>
      <!--/ col-lg-4 col-md-6 col-sm-12  -->
      <el-col :lg="8" :md="12" :sm="24">
        <!-- category 1 -->
        <div class="workflow_item">
          <i class="pe-7s-medal"></i>
          <h4> Instant Certified </h4>
          <p>Lorem ipsum dolor sit amet can be sed diam nonumy eirmod keeps an
            the satriction of whole life that enter.</p>
        </div>
      </el-col>
      <!--/ col-lg-4 col-md-6 col-sm-12  -->
    </el-row>
    <!--/ row - -->
  </div>
  <!--/ Container - -->
</section>
<!--   End: Work Flow Section
==================================================-->



<!-- Start:  About US  Section
==================================================-->
<section class="about-section">
  <!-- Container -->
  <div class="container">
    <el-row class="row">
      <el-row :md="12" :sm="24" class="col-md-6 col-sm-12">
        <div class="abt_rating">
          <h4> 4.9+</h4>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <span> User Rating</span>
        </div>
        <!-- /.abt_rating-->
        <div class="about_img" id="scene2">
          <img src="static/picture/about.png" alt="image" class="layer" data-depth="0.28">
        </div>
        <!-- /.about_img-->
        <div class="abt_course">
          <h4>47K+</h4>
          <i class="fa fa-heart"></i>
          <i class="fa fa-heart"></i>
          <i class="fa fa-heart"></i>
          <i class="fa fa-heart"></i>
          <i class="fa fa-heart"></i>
          <span> Active Courses</span>
        </div>
        <!-- /.abt_course-->
      </el-row>
      <el-col :md="12" :sm="24" class="col-md-6 col-sm-12">
        <div class="about_text">
          <h3> We Make Your Learning Through Awesome </h3>
          <p> Become the dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
            et justo duo dolores et ea rebum. Stet.</p>
          <a href="contact.html" class="more-link"> Learn More </a>
        </div>
      </el-col>
      <!--/ col-md-12  -->
    </el-row>
    <!--/ row - -->
  </div>
  <!--/ Container - -->
</section>
<!--   End: About US  Section
==================================================-->


<!-- Start: Popular Categories Section
==================================================-->
<section class="category-section">
  <!-- Container -->
  <div class="container">
    <!-- Start: Heading -->
    <div class="base-header">
      <h3> Popular Categories </h3>
    </div>
    <!-- End: Heading -->
    <el-row class="row">
      <el-col :md="24" class="col-md-12" id="popula_cat">
        <!-- category 1 -->
        <div class="category-item">
          <img src="static/picture/cat-icon1.png" alt="image">
          <h4>Design</h4>
        </div>
        <!-- category 2 -->
        <div class="category-item">
          <img src="static/picture/cat-icon2.png" alt="image">
          <h4>Education</h4>
        </div>
        <!-- category 3 -->
        <div class="category-item">
          <img src="static/picture/cat-icon3.png" alt="image">
          <h4>Craft</h4>
        </div>
        <!-- category 4 -->
        <div class="category-item">
          <img src="static/picture/cat-icon4.png" alt="image">
          <h4>Marketing</h4>
        </div>
        <!-- category 5 -->
        <div class="category-item">
          <img src="static/picture/cat-icon2.png" alt="image">
          <h4>Design</h4>
        </div>
      </el-col>
      <!--/ col-md-12  -->
    </el-row>
    <!--/ row - -->
  </div>
  <!--/ Container - -->
</section>
<!--   End: Popular Categories Section
==================================================-->



<!-- Start: Featured Courses Section
==================================================-->
<section class="feat-course-section">
  <div class="container">
    <!-- Start: Heading -->
    <div class="base-header">
      <h3> Our Featured Courses </h3>
    </div>
    <!-- End: Heading -->
    <el-row class="row">
      <el-col :lg="8" :md="12" :sm="24" class="col-lg-4 col-md-6 col-sm-12">
        <div class="feat_course_item">
          <img src="static/picture/courses1.jpg" alt="image">
          <div class="feat_cour_price">
            <span class="feat_cour_tag"> Development </span>
            <span class="feat_cour_p"> $170 </span>
          </div>
          <h4 class="feat_cour_tit"> Become a professional designer be
            with passion & dignity </h4>
          <div class="feat_cour_lesson">
            <span class="feat_cour_less"> <i class="pe-7s-note2"></i> 20 lessons </span>
            <span class="feat_cour_stu"> <i class="pe-7s-add-user"></i> 237 Students </span>
          </div>
          <div class="feat_cour_rating">
                            <span class="feat_cour_rat">
                                4.6
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                (3,539)
                            </span>
            <a href="single-course.html"> <i class="arrow_right"></i> </a>
          </div>
        </div>
      </el-col>
      <!-- /. col-lg-4 col-md-6 col-sm-12-->

      <div class="col-lg-4 col-md-6 col-sm-12">
        <div class="feat_course_item">
          <img src="static/picture/courses2.jpg" alt="image">
          <div class="feat_cour_price">
            <span class="feat_cour_tag"> UI/UX Design </span>
            <span class="feat_cour_p"> $180 </span>
          </div>
          <h4 class="feat_cour_tit"> Java programming A-Z fully classes
            with full task </h4>
          <div class="feat_cour_lesson">
            <span class="feat_cour_less"> <i class="pe-7s-note2"></i> 24 lessons </span>
            <span class="feat_cour_stu"> <i class="pe-7s-add-user"></i> 259 Students </span>
          </div>
          <div class="feat_cour_rating">
                            <span class="feat_cour_rat">
                                4.7
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                (4,5609)
                            </span>
            <a href="single-course.html"> <i class="arrow_right"></i> </a>
          </div>
        </div>
      </div>
      <!-- /. col-lg-4 col-md-6 col-sm-12-->

      <div class="col-lg-4 col-md-6 col-sm-12">
        <div class="feat_course_item">
          <img src="static/picture/courses3.jpg" alt="image">
          <div class="feat_cour_price">
            <span class="feat_cour_tag"> Art & Craft </span>
            <span class="feat_cour_p"> $370 </span>
          </div>
          <h4 class="feat_cour_tit"> You will fell in love with this mustly
            if you have desire
          </h4>
          <div class="feat_cour_lesson">
            <span class="feat_cour_less"> <i class="pe-7s-note2"></i> 25 lessons </span>
            <span class="feat_cour_stu"> <i class="pe-7s-add-user"></i> 537 Students </span>
          </div>
          <div class="feat_cour_rating">
                            <span class="feat_cour_rat">
                                4.8
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                (2,3399)
                            </span>
            <a href="single-course.html"> <i class="arrow_right"></i> </a>
          </div>
        </div>
      </div>
      <!-- /. col-lg-4 col-md-6 col-sm-12-->

      <div class="col-lg-4 col-md-6 col-sm-12">
        <div class="feat_course_item">
          <img src="static/picture/courses4.jpg" alt="image">
          <div class="feat_cour_price">
            <span class="feat_cour_tag"> Lifestyle </span>
            <span class="feat_cour_p"> $370 </span>
          </div>
          <h4 class="feat_cour_tit"> Be passionated with your regularly
            exercise and stay fit </h4>
          <div class="feat_cour_lesson">
            <span class="feat_cour_less"> <i class="pe-7s-note2"></i> 30 lessons </span>
            <span class="feat_cour_stu"> <i class="pe-7s-add-user"></i> 337 Students </span>
          </div>
          <div class="feat_cour_rating">
                            <span class="feat_cour_rat">
                                4.9
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                (2,539)
                            </span>
            <a href="single-course.html"> <i class="arrow_right"></i> </a>
          </div>
        </div>
      </div>
      <!-- /. col-lg-4 col-md-6 col-sm-12-->

      <div class="col-lg-4 col-md-6 col-sm-12">
        <div class="feat_course_item">
          <img src="static/picture/courses5.jpg" alt="image">
          <div class="feat_cour_price">
            <span class="feat_cour_tag"> Business </span>
            <span class="feat_cour_p"> $470 </span>
          </div>
          <h4 class="feat_cour_tit"> Grow your business by mastered in
            some technique</h4>
          <div class="feat_cour_lesson">
            <span class="feat_cour_less"> <i class="pe-7s-note2"></i> 40 lessons </span>
            <span class="feat_cour_stu"> <i class="pe-7s-add-user"></i> 737 Students </span>
          </div>
          <div class="feat_cour_rating">
                            <span class="feat_cour_rat">
                                4.2
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                (1,5559)
                            </span>
            <a href="single-course.html"> <i class="arrow_right"></i> </a>
          </div>
        </div>
      </div>
      <!-- /. col-lg-4 col-md-6 col-sm-12-->

      <div class="col-lg-4 col-md-6 col-sm-12">
        <div class="feat_course_item">
          <img src="static/picture/courses6.jpg" alt="image">
          <div class="feat_cour_price">
            <span class="feat_cour_tag"> Marketing </span>
            <span class="feat_cour_p"> $570 </span>
          </div>
          <h4 class="feat_cour_tit"> Top 10 tips to grow up audience to
            progress business </h4>
          <div class="feat_cour_lesson">
            <span class="feat_cour_less"> <i class="pe-7s-note2"></i> 70 lessons </span>
            <span class="feat_cour_stu"> <i class="pe-7s-add-user"></i> 537 Students </span>
          </div>
          <div class="feat_cour_rating">
                            <span class="feat_cour_rat">
                                4.9
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                (4,4000)
                            </span>
            <a href="single-course.html"> <i class="arrow_right"></i> </a>
          </div>
        </div>
      </div>
      <!-- /. col-lg-4 col-md-6 col-sm-12-->
    </el-row>
    <!-- /. row -->
    <div class="text-center">
      <a href="courses.html" class="more-link"> View All </a>
    </div>
  </div>
  <!-- /. container -->
</section>
<!-- End: Featured Courses Section
==================================================-->

<!-- Start:  Best Books Section
==================================================-->
<section class="best-book-section">
  <!-- Container -->
  <div class="container">
    <el-row class="row">
      <el-col :lg="12" :sm="24" class="col-lg-6 col-sm-12">
        <!-- Start: Heading -->
        <div class="base-header">
          <h3> Some Best Books </h3>
        </div>
        <!-- End: Heading -->
        <!-- category 1 -->
        <div class="bbook_wrap">
          <div class="bbook_item">
            <i class="pe-7s-note2"></i>
            <span> 132+ <br> Total Pages </span>
          </div>
          <div class="bbook_item">
            <i class="pe-7s-download"></i>
            <span> 237+ <br> Downloads </span>
          </div>
          <div class="bbook_item">
            <i class="pe-7s-cup"></i>
            <span> 13+ <br> Award Won </span>
          </div>
        </div>
        <div class="bbook_btn">
          <a href="#" class="more-link link-transparent"> Free Preview </a>
          <a href="#" class="more-link"> Download </a>
        </div>
      </el-col>
      <el-col :lg="12" :sm="24"  class="col-lg-6 col-sm-12" id="best_book">
        <!-- Best Book Image 1 -->
        <div class="bbook_crs_item">
          <img src="static/picture/best_book.jpg" alt="image">
        </div>
        <!-- Best Book Image 2 -->
        <div class="bbook_crs_item">
          <img src="static/picture/best_book.jpg" alt="image">
        </div>
        <!-- Best Book Image 3 -->
        <div class="bbook_crs_item">
          <img src="static/picture/best_book.jpg" alt="image">
        </div>
        <!-- Best Book Image 4 -->
        <div class="bbook_crs_item">
          <img src="static/picture/best_book.jpg" alt="image">
        </div>
      </el-col>
      <!--/ col-md-12  -->
    </el-row>
    <!--/ row - -->
  </div>
  <!--/ Container - -->
</section>
<!--   End: Best Books Section
==================================================-->



<!-- Start:  Learners Feedback Section
==================================================-->
<section class="lfeedback-section">
  <!-- Container -->
  <div class="container">
    <el-row class="row">
      <el-col :md="12" :sm="24" class="col-md-6 col-sm-12">
        <div class="lfeedback_img" id="scene3">
          <img src="static/picture/feedback.png" alt="image" class="layer" data-depth="0.28">
        </div>
      </el-col>
      <el-col :md="12" :sm="24" class="col-md-6 col-sm-12" id="lfeedback_cur">
        <div class="lfeedback_item">
          <!-- Start: Heading -->
          <div class="base-header">
            <h3> Our Learners Feedback </h3>
          </div>
          <!-- Best Book Image 1 -->
          <div class="lfeedback_text">
            <p> It's Had been a fear most experience me that I feel a great
              assumption that never thoughts that will happens to But
              great provocatives things appropities received without
              realmost qualifier that happen that never thoughts that will happens to a fear most
              experience. </p>
            <h4> David Benjamin </h4>
            <h5>Washington, United States</h5>
          </div>
        </div>
        <div class="lfeedback_item">
          <!-- Start: Heading -->
          <div class="base-header">
            <h3> Our Learners Feedback </h3>
          </div>
          <!-- Best Book Image 1 -->
          <div class="lfeedback_text">
            <p> It's Had been a fear most experience me that I feel a great
              assumption that never thoughts that will happens to But
              great provocatives things appropities received without
              realmost qualifier that happen that never thoughts that will happens to a fear most
              experience. </p>
            <h4> David Benjamin </h4>
            <h5>Washington, United States</h5>
          </div>
        </div>
      </el-col>
      <!--/ col-md-12  -->
    </el-row>
    <!--/ row - -->
  </div>
  <!--/ Container - -->
</section>
<!--   End: Learners Feedback Section
==================================================-->



<!-- Start: Newsletter Section
==================================================-->
<section class="newsletter-section pb-130">
  <div class="container">
    <el-row class="row">
      <el-col :md="24" :sm="24" class="col-md-12 col-sm-12">
        <div class="newsletter_wrap">
          <!-- Start: Heading -->
          <div class="base-header">
            <h3> Sign Up To Our Newsletter </h3>
          </div>
          <span>
                            Subscribe to our newsletter and get many <br>
                            interesting things every week
                        </span>
          <div class="newsletter_form">
            <input class="newsletter_field" name="search" id="search_field" type="text" placeholder="Type your email address">
            <a href="#"> SUBSCRIBE </a>
          </div>
          <!-- Best Book Image 1 -->
        </div>
      </el-col>
    </el-row>
    <!-- /. row -->
  </div>
  <!-- /. container -->
</section>
<!-- End: Newsletter Section
==================================================-->



<!-- Start:Footer Section
==================================================-->
<footer class="footertwo-section">
  <div class="container">
    <el-row class="row">

      <!-- Start: logo -->
      <el-col :lg="6" :md="12" :sm="24" class="col-lg-3 col-md-6 col-sm-12">
        <div class="footer_logo">
          <img src="static/picture/logo.png" alt="">
          <ul>
            <li>
              <a href="">(+75) 36 6552 9564 </a>
            </li>
            <li>
              <a href="javascript:;">contact@domain.com</a>
            </li>
            <li>
              <a href="javascript:;">Washington, United State</a>
            </li>
          </ul>
          <div class="footer_socil">
            <ul>
              <li>
                <a href="#"><i class="fab fa-facebook-f"></i></a>
              </li>
              <li>
                <a href="#"><i class="fab fa-twitter"></i></a>
              </li>
              <li>
                <a href="#"><i class="fab fa-instagram"></i></a>
              </li>
              <li>
                <a href="#"><i class="fab fa-pinterest"></i></a>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <!-- End: logo -->

      <!-- Start: Quick Link -->
      <el-col :lg="6" :md="12" :sm="24" class="col-lg-3 col-md-6 col-sm-12">
        <div class="foo_widgetquick_lnk">
          <h5>Category</h5>
          <ul>
            <li>
              <a href="courses.html">Privacy & Poilicy</a>
            </li>
            <li>
              <a href="courses.html">Terms & Condition</a>
            </li>
            <li>
              <a href="courses.html">Customer Support</a>
            </li>
            <li>
              <a href="courses.html">For Business </a>
            </li>
            <li>
              <a href="courses.html">Support</a>
            </li>
          </ul>
        </div>
      </el-col>
      <!-- End: Quick Link -->

      <!-- Start: Useful Link -->
      <el-col :lg="6" :md="12" :sm="24" class="col-lg-3 col-md-6 col-sm-12">
        <div class="foo_widgetuseful_lnk">
          <h5>Useful Links</h5>
          <ul>
            <li>
              <a href="courses.html">About Us</a>
            </li>
            <li>
              <a href="courses.html">Refer A Friend</a>
            </li>
            <li>
              <a href="courses.html">Scolarship</a>
            </li>
            <li>
              <a href="courses.html">Marketing</a>
            </li>
            <li>
              <a href="courses.html">Free Courses</a>
            </li>
          </ul>
        </div>
      </el-col>
      <!-- End: Social Link-->

      <!-- Start: Contact Form -->
      <el-col :lg="6" :md="12" :sm="24" class="col-lg-3 col-md-6 col-sm-12">
        <div class="foo_widget footer_contact_form">
          <h5>Send Message</h5>
          <form method="post" action="mailer.php">
            <input class="con-field" name="email" id="email" type="text" placeholder="Your Email">
            <textarea class="con-field" name="email" id="message" placeholder="Your Message"> </textarea>
            <input type="submit" id="submit-contact" class="btn-alt" value="Submit">
          </form>
        </div>
      </el-col>
      <!-- End: Contact Form-->
    </el-row>
  </div>
  <!-- Start:Subfooter -->
  <div class="subfooter">
    <p>Copyright &copy; 2021.Company name All rights reserved.<a target="_blank" href="https://sc.chinaz.com/moban/">&#x7F51;&#x9875;&#x6A21;&#x677F;</a></p>
  </div>
  <!-- End:Subfooter -->
</footer>
</div>
</template>
<script>

</script>
<style lang="scss" scoped>
@import "../../styles/css/animate.css";
@import "../../styles/css/hover.css";
@import "../../styles/css/magnific-popup.css";
//@import "../../styles/css/owl.carousel.css";
@import "../../styles/css/responsive.css";
@import "../../styles/css/slick.css";
@import "../../styles/css/style.css";
</style>
