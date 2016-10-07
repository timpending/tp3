;(function () {
    "use strict";

    var $window, $document, $body;

    $window = $(window);
    $document = $(document);
    $body = $("body");


    /*==============================================
     Pre loader init
     ===============================================*/
    $window.on("load", function () {
        $body.imagesLoaded(function () {
            $(".tb-preloader-wave").fadeOut();
            $("#tb-preloader").delay(200).fadeOut("slow").remove();
        });
    });

    /*==============================================
     Wow init
     ===============================================*/
    if (typeof WOW == "function")
        new WOW().init();


    $document.ready(function () {

        /*==============================================
         Retina support added
         ===============================================*/
        if (window.devicePixelRatio > 1) {
            $(".retina").imagesLoaded(function () {
                $(".retina").each(function () {
                    var src = $(this).attr("src").replace(".", "@2x.");
                    var h = $(this).height();
                    $(this).attr("src", src).css({height: h, width: "auto"});
                });
            });
        }


        /*==============================================
         Smooth scroll init
         ===============================================*/
        if (typeof smoothScroll == "object") {
            smoothScroll.init();
        }


        /*==============================================
         Menuzord init
         ===============================================*/
        $(".js-primary-navigation").menuzord();


        /*==============================================
         Onepage nav init
         ===============================================*/
        $(".op-nav li").on("click", function () {
            if ($(".showhide").is(":visible")) {
                $(".showhide").trigger("click");
            }
        });

        if ($.fn.onePageNav) {
            $(".op-nav").onePageNav({
                currentClass: "active"
            });
        }


        /*==============================================
         Sticky nav
         ===============================================*/
        function initSticky() {
            var $navbarSticky, navbarHeight, $brandLogo, centerLogoNormalHeight, centerLogoStickyHeight;
            $navbarSticky = $(".js-navbar-sticky").not(".l-navbar_s-left");
            navbarHeight = $navbarSticky.height();
            $brandLogo = $(".logo-brand");
            centerLogoNormalHeight = 100;
            centerLogoStickyHeight = 60;

            if ($navbarSticky.hasClass("l-navbar_s-center")) {
                $brandLogo.height(centerLogoNormalHeight);
            }

            $navbarSticky.sticky({
                className: "l-navbar-wrapper_has-sticky",
                wrapperClassName: "l-navbar-wrapper",
                zIndex: 10000,
                bottomSpacing: 100
            }).on("sticky-start", function() {
                if ($navbarSticky.hasClass("l-navbar_s-center")) {
                    $brandLogo.height(0);
                    setTimeout(function() {
                        $brandLogo.addClass("sticky-fix").height(centerLogoStickyHeight);
                    }, 300);
                }
            }).on("sticky-end", function () {
                $navbarSticky.parent().height(navbarHeight);
                if ($navbarSticky.hasClass("l-navbar_s-center")) {
                    $brandLogo.removeClass("sticky-fix").height(centerLogoNormalHeight);
                }
            });
        }
        initSticky();

        /*==============================================
         Full screen banner init
         ===============================================*/
        $window.bind("resizeEnd", function () {
            $("#fullscreen-banner").height($window.height());
        });

        $window.resize(function () {
            if (this.resizeTO) clearTimeout(this.resizeTO);
            this.resizeTO = setTimeout(function () {
                $(this).trigger("resizeEnd");
            }, 300);
        }).trigger("resize");


        /*==============================================
         Portfolio filter nav
         ===============================================*/
        $(".portfolio-filter").on("click", "a", function (event) {
            event.preventDefault();
            var $this = $(this);
            $this.parent().addClass("active").siblings().removeClass("active");
            $this.parents(".text-center").next().isotope({filter: $this.data("filter")});
        });


        /*==============================================
         Progressbar init
         ===============================================*/
        var progressBar = $(".progress-bar");
        progressBar.each(function (indx) {
            $(this).data("animated", 0);
            if ($.fn.visible) {
                animateProgressbar(this);
            }
        });
        $window.on("scroll", function () {
            if ($.fn.visible) {
                progressBar.each(function () {
                    animateProgressbar(this);
                })
            }
        });

        function animateProgressbar(pb) {
            if ($(pb).data("animated") == 0) {
                if ($(pb).visible()) {
                    $(pb).css("width", $(pb).attr("aria-valuenow") + "%");
                    $(pb).data("animated", 1);
                }
            }
        }


        /*==============================================
         Accordion init
         ===============================================*/
        var allPanels = $(".accordion > dd").hide();
        allPanels.first().slideDown("easeOutExpo");
        $(".accordion").each(function () {
            $(this).find("dt > a").first().addClass("active").parent().next().css({display: "block"});
        });

        $(".accordion > dt > a").click(function () {

            var current = $(this).parent().next("dd");
            $(this).parents(".accordion").find("dt > a").removeClass("active");
            $(this).addClass("active");
            $(this).parents(".accordion").find("dd").slideUp("easeInExpo");
            $(this).parent().next().slideDown("easeOutExpo");

            return false;

        });


        /*==============================================
         Toggle init
         ===============================================*/
        var allToggles = $(".toggle > dd").hide();
        $(".toggle > dt > a").click(function () {

            if ($(this).hasClass("active")) {

                $(this).parent().next().slideUp("easeOutExpo");
                $(this).removeClass("active");

            }
            else {
                var current = $(this).parent().next("dd");
                $(this).addClass("active");
                $(this).parent().next().slideDown("easeOutExpo");
            }

            return false;
        });


        /*==============================================
         Career show/hide button
         ===============================================*/
        $(".show-detail").click(function (e) {
            $(this).next().slideToggle();
            e.preventDefault();
            $(this).css({opacity: 0})
        });

        $(".cancel-btn").click(function (e) {
            var prnt = $(this).parents(".career-details-info");
            prnt.slideToggle();
            e.preventDefault();
            $(prnt).prev().css({opacity: 1})
        });

        $(".career-details-info .apply-btn").on("click", function () {

        });


        /*==============================================
         Count to init
         ===============================================*/
        var timers = $(".timer");
        if ($.fn.countTo) {
            timers.each(function () {
                $(this).data("animated", 0);
                animateTimer(this);
            });
        }

        $window.on("scroll", function () {
            timers.each(function () {
                animateTimer(this);
            });
        });

        function animateTimer(timer) {
            if ($(timer).data("animated") == 0) {
                if ($.fn.visible && $(timer).visible()) {
                    $(timer).data("animated", 1);
                    $(timer).countTo();
                }
            }
        }


        /*==============================================
         Typist init
         ===============================================*/
        if (typeof Typist == "function") {
            new Typist(document.querySelector(".typist-element"), {
                letterInterval: 60,
                textInterval: 3000
            });
        }


        /*==============================================
         Back to top init
         ===============================================*/
        $body.append("<a data-scroll class='lift-off js-lift-off lift-off_hide' href='#'><i class='fa fa-angle-up'></i></a>");

        var $liftOff = $(".js-lift-off");
        $window.on("scroll", function () {
            if ($window.scrollTop() > 150) {
                $liftOff.addClass("lift-off_show").removeClass("lift-off_hide");
            } else {
                $liftOff.addClass("lift-off_hide").removeClass("lift-off_show");
            }
        });


        /*==============================================
         Contact form
         ===============================================*/
        $("form.contact-comments").on("submit", function (e) {
            e.preventDefault();
            var sender = $("#email").val();
            var name = $("#name").val();
            var subject = $("#subject").val();
            var message = $("#comments").val();
            var phone = $("#phone").val();

            var target = $(this).attr("action");
            var that = this;
            $.post(target, {name:name,subject:subject,email:sender,phone:phone,comments:message},function(data){
                if($(that).find(".mailstatus").length==0){
                    $(that).append($("<div/>").addClass("mailstatus"));
                }
                $(".mailstatus").html(data).show();
                setTimeout(function(){
                    $(".mailstatus").empty().hide();
                },5000)
            });
        });

    });

})(jQuery);
