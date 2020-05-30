$(document).ready(function () {

	/*-----------------------------------/
	/*	TOP NAVIGATION AND LAYOUT
	/*----------------------------------*/

    $('.btn-toggle-fullwidth').on('click', function () {
        if (!$('body').hasClass('layout-fullwidth')) {
            $('body').addClass('layout-fullwidth');

        } else {
            $('body').removeClass('layout-fullwidth');
            $('body').removeClass('layout-default'); // also remove default behaviour if set
        }

        $(this).find('.lnr').toggleClass('lnr-arrow-left-circle lnr-arrow-right-circle');

        if ($(window).innerWidth() < 1025) {
            if (!$('body').hasClass('offcanvas-active')) {
                $('body').addClass('offcanvas-active');
            } else {
                $('body').removeClass('offcanvas-active');
            }
        }

        if ($(window).innerWidth() > 1120) {
            //$('.mapviewer').css('width', 'calc(100% - 350px);');
            if (!$('.mapviewer').hasClass('Map-Fit')) {
                $('.mapviewer').addClass('Map-Fit');
            } else {
                $('.mapviewer').removeClass('Map-Fit');
            }
        }
    });

    $('.btn-toggle-search').on('click', function () {

        $(this).find('.lnr').toggleClass('lnr-magnifier lnr-arrow-right-circle');

        $('#sidebar-nav-right').toggleClass('sidebar-right-open');

    });

    $('.landmark > ul li').on('click', function () {

        $(this).toggleClass('Landmark-on');


    });

    $(window).on('load', function () {
        if ($(window).innerWidth() < 1025) {
            $('.btn-toggle-fullwidth').find('.icon-arrows')
                .removeClass('icon-arrows-move-left')
                .addClass('icon-arrows-move-right');
        }

        // adjust right sidebar top position
        $('.right-sidebar').css('top', $('.navbar').innerHeight());

        // if page has content-menu, set top padding of main-content
        if ($('.has-content-menu').length > 0) {
            $('.navbar + .main-content').css('padding-top', $('.navbar').innerHeight());
        }

        // for shorter main content
        if ($('.main').height() < $('#sidebar-nav').height()) {
            $('.main').css('min-height', $('#sidebar-nav').height());
        }
    });

    $(window).on('load', function () {
        if ($(window).innerWidth() < 768) {
            $('.btn-toggle-fullwidth').find('.icon-arrows')
                .removeClass('icon-arrows-move-left')
                .addClass('icon-arrows-move-right');

            if (!$('body').hasClass('layout-fullwidth')) {
                $('body').addClass('layout-fullwidth');

            } else {
                $('body').removeClass('layout-fullwidth');
                $('body').removeClass('layout-default'); // also remove default behaviour if set
            }

            $(this).find('.lnr').toggleClass('lnr-arrow-left-circle lnr-arrow-right-circle');

            if ($(window).innerWidth() < 768) {
                if (!$('body').hasClass('offcanvas-active')) {
                    $('body').addClass('offcanvas-active');
                } else {
                    $('body').removeClass('offcanvas-active');
                }
            }
        }


    });

	/*-----------------------------------/
	/*	SIDEBAR NAVIGATION
	/*----------------------------------*/

    $('.sidebar a[data-toggle="collapse"]').on('click', function () {
        if ($(this).hasClass('collapsed')) {
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }
    });

    if ($('.sidebar-scroll').length > 0) {
        $('.sidebar-scroll').slimScroll({
            height: '95%',
            wheelStep: 10,
            touchScrollStep: 75
        });
    }


	/*-----------------------------------/
	/*	PANEL FUNCTIONS
	/*----------------------------------*/

    // panel remove
    $('.panel .btn-remove').click(function (e) {

        e.preventDefault();
        $(this).parents('.panel').fadeOut(300, function () {
            $(this).remove();
        });
    });

    // panel collapse/expand
    var affectedElement = $('.panel-body');

    $('.panel .btn-toggle-collapse').clickToggle(
        function (e) {
            e.preventDefault();

            // if has scroll
            if ($(this).parents('.panel').find('.slimScrollDiv').length > 0) {
                affectedElement = $('.slimScrollDiv');
            }

            $(this).parents('.panel').find(affectedElement).slideUp(300);
            $(this).find('i.lnr-chevron-up').toggleClass('lnr-chevron-down');
        },
        function (e) {
            e.preventDefault();

            // if has scroll
            if ($(this).parents('.panel').find('.slimScrollDiv').length > 0) {
                affectedElement = $('.slimScrollDiv');
            }

            $(this).parents('.panel').find(affectedElement).slideDown(300);
            $(this).find('i.lnr-chevron-up').toggleClass('lnr-chevron-down');
        }
    );


	/*-----------------------------------/
	/*	PANEL SCROLLING
	/*----------------------------------*/

    if ($('.panel-scrolling').length > 0) {
        $('.panel-scrolling .panel-body').slimScroll({
            height: '430px',
            wheelStep: 10,
            touchScrollStep: 75
        });
    }

    if ($('#panel-scrolling-demo').length > 0) {
        $('#panel-scrolling-demo .panel-body').slimScroll({
            height: '175px',
            wheelStep: 10,
            touchScrollStep: 75
        });
    }

	/*-----------------------------------/
	/*	TODO LIST
	/*----------------------------------*/

    $('.todo-list input').change(function () {
        if ($(this).prop('checked')) {
            $(this).parents('li').addClass('completed');
        } else {
            $(this).parents('li').removeClass('completed');
        }
    });


	/*-----------------------------------/
	/* TOASTR NOTIFICATION
	/*----------------------------------*/

    if ($('#toastr-demo').length > 0) {
        toastr.options.timeOut = "false";
        toastr.options.closeButton = true;
        toastr['info']('Hi there, this is notification demo with HTML support. So, you can add HTML elements like <a href="#">this link</a>');

        $('.btn-toastr').on('click', function () {
            $context = $(this).data('context');
            $message = $(this).data('message');
            $position = $(this).data('position');

            if ($context == '') {
                $context = 'info';
            }

            if ($position == '') {
                $positionClass = 'toast-left-top';
            } else {
                $positionClass = 'toast-' + $position;
            }

            toastr.remove();
            toastr[$context]($message, '', { positionClass: $positionClass });
        });

        $('#toastr-callback1').on('click', function () {
            $message = $(this).data('message');

            toastr.options = {
                "timeOut": "300",
                "onShown": function () { alert('onShown callback'); },
                "onHidden": function () { alert('onHidden callback'); }
            };

            toastr['info']($message);
        });

        $('#toastr-callback2').on('click', function () {
            $message = $(this).data('message');

            toastr.options = {
                "timeOut": "10000",
                "onclick": function () { alert('onclick callback'); },
            };

            toastr['info']($message);

        });

        $('#toastr-callback3').on('click', function () {
            $message = $(this).data('message');

            toastr.options = {
                "timeOut": "10000",
                "closeButton": true,
                "onCloseClick": function () { alert('onCloseClick callback'); }
            };

            toastr['info']($message);
        });
    }
});

// toggle function
$.fn.clickToggle = function (f1, f2) {
    return this.each(function () {
        var clicked = false;
        $(this).bind('click', function () {
            if (clicked) {
                clicked = false;
                return f2.apply(this, arguments);
            }

            clicked = true;
            return f1.apply(this, arguments);
        });
    });

};


//$('#RegionsInput').tagsinput({
//    typeahead: {
//        source: ['Riyadh', 'Jeddah', 'Madina', 'Taif', 'Makah']
//    },
//    freeInput: true
//});
$('input').on('itemAdded', function (event) {
    setTimeout(function () {
        $(">input[type=text]", ".bootstrap-tagsinput").val("");
    }, 1);
});


$(document).ready(function () {
    $(".love").click(function () {
        if ($(this).hasClass("liked")) {
            $(this).html('<i class="fa fa-heart-o" aria-hidden="true" style="position: absolute;right: 0;"></i>');
            $(this).removeClass("liked");
        } else {
            $(this).html('<i class="fa fa-heart" aria-hidden="true" style="position: absolute;right: 0;"></i>');
            $(this).addClass("liked");
        }
    });

    ShowPageTimeout();
    //$('.active-feature-carousel').owlCarousel({
    //    items: 1,
    //    loop: true,
    //    center: true,
    //    autoplay: true,
    //    autoplayTimeout: 2000,
    //    autoplayHoverPause: true
    //});

    //var iFrameMoreDetailsClose = $("iframe#ifrmMoreInfo").contents().find(".ImagesG-close");
    //$("iframe#ifrmMoreInfo").contents().find(".ImagesG-close").click(function () {
    //    alert('thanks');
    //});
});




function ShowPageTimeout() {
    setTimeout(showPage, 3000);
}

function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("wrapper").style.display = "block";
    $('.slideshow').cycle();
}

function toggelSidePanel() {
    $("#Slide-panel-right").toggleClass("panel-right-open");
}

$(function () {
    $(".pCard_add").click(function () {
        $(".pCard_card").toggleClass("pCard_on");
        $(".pCard_add i").toggleClass("fa-ellipsis-h fa-close");
    });
    $(".popupFav").click(function () {
        $(this).toggleClass("fa-heart-o fa-heart");
    });

    $(".popupSavePlace").click(function () {
        $(this).toggleClass("fa-bookmark-o fa-bookmark");
    });
    
    $(".pinPlace").click(function (event) {
        $('.pCard_card').show();
    });

    $(".ImagesG-close").click(function (s) {
        toggelSidePanel();
    });
    
    
});