<template>
<div>
<div class="navigation navigation_two">
  <div class="container" id="topbar">
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
        <li class="active"><a href="#">主页</a>
        </li>
        <li><a href="/register">注册</a></li>
<!--        <li class="has-sub"><a href="">Pages</a>-->
<!--          <ul>-->
<!--            <li><a href="course-category.html">Course Category</a> </li>-->
<!--            <li><a href="courses.html">Our Course</a> </li>-->
<!--            <li><a href="single-course.html">Course Details</a> </li>-->
<!--          </ul>-->
<!--        </li>-->
      </ul>
    </div>
    <!-- End: navigation  -->
    <div class="header_sign">
      <a href="/#/login" class="more-link">登录</a>
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
  <el-carousel trigger="click" height="550px">
    <el-carousel-item>
  <div class="hero-section hero_two">
    <div class="container">
      <el-row class="row">
        <el-col :md="12" :sm="24" class="col-md-6 col-sm-12">
          <div class="hero_text">
            <h4>完备、高效、安全的考试平台<br><br></h4>
            <h2>Sote在线考试系统<br>
            </h2>
            <p>操作简单 | 安全审批 | 防作弊 | 智能阅卷<br>
            </p>
            <br>
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
              <img src="@/assets/picture/hero_students.png" alt="" width="100%">
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
            <h4>Sote在线考试系统<br><br></h4>
            <h2>教考分离机制<br>
              </h2>
            <p> 专注考试业务 | 将教考分离落于实处<br>
            </p>
            <br>
            <a href="#" class="more-link"> 开始使用 </a>
          </div>
          <!-- /.hero_text -->
        </el-col>
        <!-- /.col-md-6 col-sm-12-->

        <el-col :md="12" :sm="24" class="col-md-6 col-sm-12">
          <div class="hero_img">
<!--            <img src="static/picture/coding.png" alt="" class="coding">-->
            <div class="hero_img_ani" id="scene4">
              <img src="@/assets/picture/app development.svg" alt="" data-depth="0.10" class="layer">
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

</div>

<!-- End: Hero Section
==================================================-->
  <section class="product-counter-section">
    <div class="product-counter-wrap">
  <div class="container">
    <el-row>
      <el-col :lg="1" :span="2">
        <img src="@/assets/picture/process-num-2.png">
      </el-col>
      <el-col :lg="11" :span="22" class="col-lg-6 col-12">
        <div class="counter-content-wrap">
          <h6 class="counter-title">
            <strong>完成考试人次 1200+</strong></h6>
          <p class="counter-text">High performing team worldwide</p>
        </div>
      </el-col>
      <el-col :lg="12" :span="24" class="col-lg-6 col-12">
        <ul class="counter-list list-inline text-right">
          <li>
            <span class="number count">500+</span>
            <span class="title">使用用户</span>
          </li>
          <li>
            <span class="number count">500+</span>
            <span class="title">累计发布考试</span>
          </li>
          <li>
            <span class="number count">4500+</span>
            <span class="title">累计题目数量</span>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
    </div>
  </section>
<!-- Start: Work Flow Section
==================================================-->
<section class="workflow-section pt-120">
  <!-- Container -->
  <div class="container">
    <!-- Start: Heading -->
    <div class="base-header text-center">
      <h3> 完备、高效、安全的考试平台 </h3>
    </div>
    <!-- End: Heading -->
    <el-row class="row" :gutter="20">
      <el-col :lg="8" :md="12" :sm="24" class="col-lg-4 col-md-6 col-sm-12">
        <!-- category 1 -->
        <div class="workflow_item">
          <i class="pe-7s-search"></i>
          <h4>智能高效</h4>
          <p>提供完整的出题、组卷、发布、考试、批阅、统计、编辑流程，多条件供出题者遴选，手动及智能组卷并行</p>
        </div>
      </el-col>
      <!--/ col-lg-4 col-md-6 col-sm-12  -->
      <el-col :lg="8" :md="12" :sm="24" class="col-lg-4 col-md-6 col-sm-12">
        <!-- category 1 -->
        <div class="workflow_item">
          <i class="pe-7s-date"></i>
          <h4>稳定易用</h4>
          <p>高并发、高可用、考试环境稳定，用户体验良好，支持大量考生同时进行考试<br/></p>
        </div>
      </el-col>
      <!--/ col-lg-4 col-md-6 col-sm-12  -->
      <el-col :lg="8" :md="12" :sm="24">
        <!-- category 1 -->
        <div class="workflow_item">
          <i class="pe-7s-medal"></i>
          <h4>多业务场景支持 </h4>
          <p>满足学生、员工练习及考试、各类资格考试、企事业招聘考试等，进行考生管理和题库建设等多应用场景</p>
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
  <div class="container" @mousemove="parallax">
    <div class="base-header text-center">
      <h3> 核心功能 </h3>
    </div>
    <el-row class="row">
      <el-col :md="13" :sm="24" class="col-md-6 col-sm-12">
        <div class="abt_rating">
          <h4 class="redtitle"> 50+</h4>
          <span>现有课程</span>
        </div>
        <!-- /.abt_rating-->
        <div >
          <img  src="@/assets/picture/pic1-accomplish.png" alt="image" class="layer" data-depth="0.28"
               data-speed="4">
        </div>
        <!-- /.about_img-->
        <div class="abt_course">
          <h4 class="redtitle">4K+</h4>
          <i class="fa fa-heart"></i>
          <span>现有题目</span>
        </div>
        <!-- /.abt_course-->
      </el-col>
      <el-col :md="11" :sm="24" class="col-md-6 col-sm-12">
        <div class="about_text">
          <h4 class="redtitle"> 01 </h4>
          <h2> 题库管理 </h2>
          <p> <a>支持多样化题型</a> | 包含单选、多选、填空、综合、判断等题型<br/>
            <a>题库权限治理</a> | 限制题库访问和操作，实现题库安全<br/>
            <a>题库操作审批制度</a> | 实现审批增加、删除、修改操作<br/>
            <a>题库导出功能</a> | 一键筛选导出所需题目<br/>
          </p>
          <a href="/#/bank/bank" class="more-link"> 前往试用 </a>
        </div>
      </el-col>
      <!--/ col-md-12  -->
    </el-row>
    <el-row class="row">
      <el-col :md="13" :sm="24" class="col-md-6 col-sm-12">
        <div class="about_text">
          <h4 > 02 </h4>
          <h2> 考试管理 </h2>
          <p> <a>自由高效的组卷方式</a> | 包含手动择题组卷和按需智能组卷<br/>
            <a>便捷的试卷复用功能</a> | 无需再次操作组卷<br/>
            <a>简洁流畅的考试流程</a> | 实现完整易操作的整个考试流程<br/>
            <a>智能省心的阅卷模式</a> | 智能选择批阅方式、客观题自动批阅<br/>
            <a>全方位的成绩统计分析 </a> | 多角度展示学习效果<br/>
          </p>
          <a href="/#/bank/bank" class="more-link"> 前往试用 </a>
        </div>
      </el-col>
      <el-col :md="11" :sm="24" class="col-md-6 col-sm-12">
        <!-- /.abt_rating-->
        <div >
          <img  src="@/assets/picture/pic1-flaw.png" alt="image" class="layer" data-depth="0.28"
                data-speed="4">
        </div>
        <!-- /.about_img-->
      </el-col>
      <!--/ col-md-12  -->
    </el-row>
    <!--/ row - -->
    <el-row class="row">
      <el-col :md="13" :sm="24" class="col-md-6 col-sm-12">
        <div class="abt_rating">
          <h4 class="redtitle"> 50+</h4>
          <span>现有课程</span>
        </div>
        <!-- /.abt_rating-->
        <div >
          <img  src="@/assets/picture/pic1-login.png" alt="image" class="layer" data-depth="0.28"
                data-speed="4">
        </div>
        <!-- /.about_img-->
        <div class="abt_course">
          <h4 class="redtitle">4K+</h4>
          <i class="fa fa-heart"></i>
          <span>现有题目</span>
        </div>
        <!-- /.abt_course-->
      </el-col>
      <el-col :md="11" :sm="24" class="col-md-6 col-sm-12">
        <div class="about_text">
          <h4 class="redtitle"> 03 </h4>
          <h2> 防作弊机制 </h2>
          <p> <a>打乱试题顺序</a> | 一场考试中考生的试题不同包含单选<br/>
            <a>人脸识别</a> | 限制题库访问和操作，实现题库安全<br/>
            <a>切屏限制</a> | 实现审批增加、删除、修改操作<br/>
          </p>
          <a href="/#/bank/bank" class="more-link"> 前往试用 </a>
        </div>
      </el-col>
      <!--/ col-md-12  -->
    </el-row>
  </div>

  <!--/ Container - -->
</section>
<!--   End: About US  Section
==================================================-->


<!-- Start: Popular Categories Section
==================================================-->
<!--<section class="category-section">-->
<!--  &lt;!&ndash; Container &ndash;&gt;-->
<!--  <div class="container">-->
<!--    &lt;!&ndash; Start: Heading &ndash;&gt;-->
<!--    <div class="base-header">-->
<!--      <h3> Popular Categories </h3>-->
<!--    </div>-->
<!--    &lt;!&ndash; End: Heading &ndash;&gt;-->
<!--    <el-row class="row">-->
<!--      <el-col :md="24" class="col-md-12" id="popula_cat">-->
<!--        &lt;!&ndash; category 1 &ndash;&gt;-->
<!--        <div class="category-item">-->
<!--          <img src="static/picture/cat-icon1.png" alt="image">-->
<!--          <h4>Design</h4>-->
<!--        </div>-->
<!--        &lt;!&ndash; category 2 &ndash;&gt;-->
<!--        <div class="category-item">-->
<!--          <img src="static/picture/cat-icon2.png" alt="image">-->
<!--          <h4>Education</h4>-->
<!--        </div>-->
<!--        &lt;!&ndash; category 3 &ndash;&gt;-->
<!--        <div class="category-item">-->
<!--          <img src="static/picture/cat-icon3.png" alt="image">-->
<!--          <h4>Craft</h4>-->
<!--        </div>-->
<!--        &lt;!&ndash; category 4 &ndash;&gt;-->
<!--        <div class="category-item">-->
<!--          <img src="static/picture/cat-icon4.png" alt="image">-->
<!--          <h4>Marketing</h4>-->
<!--        </div>-->
<!--        &lt;!&ndash; category 5 &ndash;&gt;-->
<!--        <div class="category-item">-->
<!--          <img src="static/picture/cat-icon2.png" alt="image">-->
<!--          <h4>Design</h4>-->
<!--        </div>-->
<!--      </el-col>-->
<!--      &lt;!&ndash;/ col-md-12  &ndash;&gt;-->
<!--    </el-row>-->
<!--    &lt;!&ndash;/ row - &ndash;&gt;-->
<!--  </div>-->
<!--  &lt;!&ndash;/ Container - &ndash;&gt;-->
<!--</section>-->
<!--   End: Popular Categories Section
==================================================-->


<!--<section class="best-book-section">-->
<!--  &lt;!&ndash; Container &ndash;&gt;-->
<!--  <div class="container">-->
<!--    <el-row class="row">-->
<!--      <el-col :lg="12" :sm="24" class="col-lg-6 col-sm-12">-->
<!--        &lt;!&ndash; Start: Heading &ndash;&gt;-->
<!--        <div class="base-header">-->
<!--          <h3> Some Best Books </h3>-->
<!--        </div>-->
<!--        &lt;!&ndash; End: Heading &ndash;&gt;-->
<!--        &lt;!&ndash; category 1 &ndash;&gt;-->
<!--        <div class="bbook_wrap">-->
<!--          <div class="bbook_item">-->
<!--            <i class="pe-7s-note2"></i>-->
<!--            <span> 132+ <br> Total Pages </span>-->
<!--          </div>-->
<!--          <div class="bbook_item">-->
<!--            <i class="pe-7s-download"></i>-->
<!--            <span> 237+ <br> Downloads </span>-->
<!--          </div>-->
<!--          <div class="bbook_item">-->
<!--            <i class="pe-7s-cup"></i>-->
<!--            <span> 13+ <br> Award Won </span>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="bbook_btn">-->
<!--          <a href="#" class="more-link link-transparent"> Free Preview </a>-->
<!--          <a href="#" class="more-link"> Download </a>-->
<!--        </div>-->
<!--      </el-col>-->
<!--      <el-col :lg="12" :sm="24"  class="col-lg-6 col-sm-12" id="best_book">-->
<!--        &lt;!&ndash; Best Book Image 1 &ndash;&gt;-->
<!--        <div class="bbook_crs_item">-->
<!--          <img src="static/picture/best_book.jpg" alt="image">-->
<!--        </div>-->
<!--        &lt;!&ndash; Best Book Image 2 &ndash;&gt;-->
<!--        <div class="bbook_crs_item">-->
<!--          <img src="static/picture/best_book.jpg" alt="image">-->
<!--        </div>-->
<!--        &lt;!&ndash; Best Book Image 3 &ndash;&gt;-->
<!--        <div class="bbook_crs_item">-->
<!--          <img src="static/picture/best_book.jpg" alt="image">-->
<!--        </div>-->
<!--        &lt;!&ndash; Best Book Image 4 &ndash;&gt;-->
<!--        <div class="bbook_crs_item">-->
<!--          <img src="static/picture/best_book.jpg" alt="image">-->
<!--        </div>-->
<!--      </el-col>-->
<!--      &lt;!&ndash;/ col-md-12  &ndash;&gt;-->
<!--    </el-row>-->
<!--    &lt;!&ndash;/ row - &ndash;&gt;-->
<!--  </div>-->
<!--  &lt;!&ndash;/ Container - &ndash;&gt;-->
<!--</section>-->
<!--&lt;!&ndash;   End: Best Books Section-->
<!--==================================================&ndash;&gt;-->



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
          <form method="post" action="">
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
    <p>Copyright &copy; 2022. Examination system based on Separation Of Teaching and Examination on  All rights reserved.</p>
  </div>
  <!-- End:Subfooter -->
</footer>
</div>
</template>
<script>
export default {
  methods: {
    parallax(e) {
      document.querySelectorAll(".layer").forEach((layer) => {
        const speed = layer.getAttribute("data-speed") || 2;
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        //设置 X轴和Y轴同时同时移动
        layer.style.transform = `translateX(${x}px)`+`translateY(${y}px)`;

      });
    },
  },
}

</script>
<style lang="scss" scoped>
@import "../../styles/intro-css/animate.css";
@import "../../styles/intro-css/hover.css";
@import "../../styles/intro-css/magnific-popup.css";
//@import "../../styles/intro-css/owl.carousel.intro-css";
@import "../../styles/intro-css/responsive.css";
@import "../../styles/intro-css/slick.css";
@import "../../styles/intro-css/style.css";
#topbar{
 border-bottom: #bbbbbb solid 1px;
}
h4
{
  color: #5069ca;
}
.redtitle {
  color:#FD661F;
}
</style>
