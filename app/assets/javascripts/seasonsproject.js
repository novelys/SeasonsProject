// Filename     : seasonsproject.js
// Version      : 1.0.0 (2011-07-02) YYYY-MM-DD
// Author       : Novelys
// Author's Uri : www.novelys.com
// Description  : NA
// Dependencies : Jquery 1.5.2 - RaphaelJs 1.5.2 jquery.backgroundPosition - jquery.fancybox-1.3.4 - jquery.tools



// Summary by anchor (ALT+F for search in file) :
// 1)  SPLASH SCREEN CLASS
// 2)  LAYOUT CLASS
// 3)  SEASONS CAROUSEL CLASS
// 4)  RAPHAEL HOT SPOT CLASS
// XX) FUNCTIONS
// XX) SEASONS SCRIPTS
// XX) DOCUMENT READY CALLS



// ***************************************************************************************
//                                  SPLASH SCREEN CLASS
// ***************************************************************************************
SplashScreen = function (splashID) {
  this.splashid = splashID;

  this.Constructor = function () {
    $(splashID + " " + ".treelogo").mouseover(function () {
      $(splashID + " " + ".treelogo .leaves").animate({opacity: 1}, 500, "linear");
    });
    $(splashID + " " + ".treelogo").mouseout(function () {
      $(splashID + " " + ".treelogo .leaves").animate({opacity: 0}, 500, "linear");
    });
    $(window).load(function () {
      $(splashID + " " + ".progress").animate({ 
        opacity: 0},
        500,
        "linear",
        function() {
          $(this).css("display", "none");
          $(splashID + " " + ".launchbtn").css("display", "block");
          $(splashID + " " + ".launchbtn").animate({
            opacity: 1},
            500,
            "linear",
            function() {
              $(this).mouseover(function () {
                $(this).animate({color: "#ff5d18"}, 200, "linear");
              });
              $(this).mouseout(function () {
                $(this).animate({color: "#9a9a9a"}, 200, "linear");
              });
            }
          );
        }
      );
    });
  }

  this.ResizeMe = function () {
    var windowheight = $(window).height();
    var windowwidth  = $(window).width();

    $(this.splashid).css('height', windowheight);
    $(this.splashid).css('width', windowwidth);
  }

  this.FadeOutMe = function (fadeTIME) {
    $(this.splashid).animate( {
      opacity: 0},
      fadeTIME, 
      "linear", 
      function() {
        $(this).css("display", "none");
      }
    );
  }

  this.Constructor();
  this.ResizeMe();
}



// ***************************************************************************************
//                                        LAYOUT CLASS
// ***************************************************************************************
Layout = function (layoutID, headerID, contentID, footerID) {
  this.layoutid      = layoutID;
  this.headerid      = headerID;
  this.contentid     = contentID;
  this.footerid      = footerID;
  this.contentheight;
  this.contentwidth;

  this.ResizeMe = function () {
    var windowheight = $(window).height();
    var windowwidth  = $(window).width();
    var headerheight = $(this.headerid).height();
    var footerheight = $(this.footerid).height();
    this.contentheight= (windowheight-(headerheight + footerheight));
    this.contentwidth = $(window).width();

    $(this.contentid).css('height', this.contentheight);
    $(this.contentid).css('width', this.contentwidth);
  }

  this.ReturnContentHeight = function () {
    return this.contentheight;
  }

  this.ReturnContentWidth = function () {
    return this.contentwidth;
  }

  this.ResizeMe();
}



// ***************************************************************************************
//                                SEASONS CAROUSEL CLASS
// ***************************************************************************************
SeasonsCarousel = function (destID, destH, destW) {
  this.destid  = destID;
  this.desth   = destH;
  this.destw   = destW;
  this.caroh;
  this.carow;
  this.currenth;
  this.currentw;
  this.currentseasons;
  this.season0canvas;
  this.season1canvas;
  this.season2canvas;
  this.season3canvas;

  this.CreateContainers = function () {
    $(destID).append('<div id="SeasonsCarousel"></div>');
    $("#SeasonsCarousel").append('<div class="seasonswrapper"></div>');
    $("#SeasonsCarousel").append('<div class="closeupbands topband"></div>');
    $("#SeasonsCarousel").append('<div class="closeupbands bottomband"></div>');
  }

  this.CreateNavigationButtons = function () {
    $("#SeasonsCarousel").append('<div class="seasonsswitcher left do-SlideToPreviousSeason"></div>');
    $("#SeasonsCarousel").append('<div class="seasonsswitcher right do-SlideToNextSeason"></div>');
  }

  this.CreateSeasonsContainers = function () {
    $("#SeasonsCarousel .seasonswrapper").append('<div class="season season0" id="Season0"></div>');
    $("#SeasonsCarousel .seasonswrapper").append('<div class="season season1" id="Season1"></div>');
    $("#SeasonsCarousel .seasonswrapper").append('<div class="season season2" id="Season2"></div>');
    $("#SeasonsCarousel .seasonswrapper").append('<div class="season season3" id="Season3"></div>');
    $("#SeasonsCarousel .seasonswrapper .season").append('<div class="paralax top"></div>');
    $("#SeasonsCarousel .seasonswrapper .season").append('<div class="paralax bottom"></div>');
    $("#SeasonsCarousel .seasonswrapper .season").append('<div class="scenebackground"></div>');
  }

  this.CreateSeasonsCanvas = function () {
    this.season0canvas = Raphael("Season0", "100%", "100%");
    this.season1canvas = Raphael("Season1", "100%", "100%");
    this.season2canvas = Raphael("Season2", "100%", "100%");
    this.season3canvas = Raphael("Season3", "100%", "100%");
  }

  this.ResizeMe = function (newH, newW) {
    $("#SeasonsCarousel").css("height", newH);
    $("#SeasonsCarousel").css("width", newW);
    $("#SeasonsCarousel .seasonswrapper").css("height", newH);
    $("#SeasonsCarousel .seasonswrapper").css("width", (newW*4));
    $("#SeasonsCarousel .seasonswrapper .season").css("height", newH);
    $("#SeasonsCarousel .seasonswrapper .season").css("width", newW);
    this.currenth = newH;
    this.currentw = newW;
  }

  this.ShowSeason = function (seasonNUM, transTIME, playSTATUS) {
    var season0xpos = 0;
    var season1xpos = this.currentw;
    var season2xpos = this.currentw*2;
    var season3xpos = this.currentw*3;
    switch (seasonNUM) {
      case 0:
        $("#SeasonsCarousel .seasonswrapper").css("left", season0xpos);
        $("#SeasonsCarousel .do-SlideToPreviousSeason").css("opacity", 0);
        $("#SeasonsCarousel .do-SlideToPreviousSeason").css("display", "none");
        if (playSTATUS == "play") { AnimateParalax(0, transTIME, "play");}
      break;
      case 1:
        $("#SeasonsCarousel .seasonswrapper").css("left", -season1xpos);
        if (playSTATUS == "play") { AnimateParalax(1, transTIME, "play");}
      break;
      case 2:
        $("#SeasonsCarousel .seasonswrapper").css("left", -season2xpos);
        if (playSTATUS == "play") { AnimateParalax(2, transTIME, "play");}
      break;
      case 3:
        $("#SeasonsCarousel .seasonswrapper").css("left", -season3xpos);
        $("#SeasonsCarousel .do-SlideToNextSeason").css("opacity", 0);
        $("#SeasonsCarousel .do-SlideToNextSeason").css("display", "none");
        if (playSTATUS == "play") { AnimateParalax(3, transTIME, "play");}
      break;
    }
    this.currentseasons = seasonNUM;
  }

  this.SlideToSeason = function (seasonNUM, transTIME) {
    var season0xpos = 0;
    var season1xpos = this.currentw;
    var season2xpos = this.currentw*2;
    var season3xpos = this.currentw*3;
    switch (seasonNUM) {
      case 0:
        PlaySeasonTransition(season0xpos, transTIME);
        AnimateParalax(0, transTIME, "play");
        AnimateParalax(1, transTIME, "stop");
        AnimateParalax(2, transTIME, "stop");
        AnimateParalax(3, transTIME, "stop");
        $("#SeasonsCarousel .do-SlideToPreviousSeason").animate({
          opacity: 0},
          transTIME/4,
          "linear",
            function() {
              $(this).css("display", "none");
            }
          );
      break;
      case 1:
        PlaySeasonTransition(season1xpos, transTIME);
        AnimateParalax(1, transTIME, "play");
        AnimateParalax(2, transTIME, "stop");
        AnimateParalax(3, transTIME, "stop");
        AnimateParalax(0, transTIME, "stop");
        $("#SeasonsCarousel .do-SlideToPreviousSeason").css("display", "block");
        $("#SeasonsCarousel .do-SlideToPreviousSeason").animate({opacity: 1}, transTIME/4, "linear");
      break;
      case 2:
        PlaySeasonTransition(season2xpos, transTIME);
        AnimateParalax(2, transTIME, "play");
        AnimateParalax(3, transTIME, "stop");
        AnimateParalax(0, transTIME, "stop");
        AnimateParalax(1, transTIME, "stop");
        $("#SeasonsCarousel .do-SlideToNextSeason").css("display", "block");
        $("#SeasonsCarousel .do-SlideToNextSeason").animate({opacity: 1}, transTIME/4, "linear");
      break;
      case 3:
        PlaySeasonTransition(season3xpos, transTIME);
        AnimateParalax(3, transTIME, "play");
        AnimateParalax(0, transTIME, "stop");
        AnimateParalax(1, transTIME, "stop");
        AnimateParalax(2, transTIME, "stop");
        $("#SeasonsCarousel .do-SlideToNextSeason").animate({
          opacity: 0},
          transTIME/4,
          "linear",
            function() {
              $(this).css("display", "none");
            }
          );
      break;
    }
    this.currentseasons = seasonNUM;
  }

  function PlaySeasonTransition(seasonPOS, transTIME) {
    $("#SeasonsCarousel .closeupbands").css("display", "block");
    $("#SeasonsCarousel .closeupbands").animate({height: "30%"}, transTIME, "easeInQuad");
    $("#SeasonApp-01 .contentwrapper").animate({
      opacity: 0},
      transTIME/2,
      "easeInQuad",
      function () {
        $('#SeasonsCarousel .seasonswrapper').animate( {
          left: -seasonPOS},
          transTIME, 
          "easeOutQuad", 
          function() {
            $("#SeasonsCarousel .closeupbands").animate({height: "0%"}, transTIME, "easeOutQuad");
            $("#SeasonApp-01 .contentwrapper").animate({opacity: 1}, transTIME, "easeOutQuad");
          }
        );
      }
    );
  }

  function AnimateParalax(seasonNUM, transTIME, playSTATUS) {
    var seasonIdString = seasonNUM + "";
    var paralaxtopSELECTOR = "#SeasonsCarousel .seasonswrapper .season.season"+ seasonIdString +" .paralax.top";
    var paralaxbottomSELECTOR = "#SeasonsCarousel .seasonswrapper .season.season"+ seasonIdString +" .paralax.bottom";

    if (playSTATUS == "play") {
      $(paralaxtopSELECTOR).stop();
      $(paralaxbottomSELECTOR).stop();
      $(paralaxtopSELECTOR).animate({backgroundPosition: "0px top"}, 0, "linear");
      $(paralaxbottomSELECTOR).animate({backgroundPosition: "0px bottom"}, 0, "linear");
      $(paralaxtopSELECTOR).animate({backgroundPosition: "-7000px top"}, transTIME*1000, "linear");
      $(paralaxbottomSELECTOR).animate({backgroundPosition: "7000px bottom"}, transTIME*1000, "linear");
    }
    if (playSTATUS == "stop") {
      $(paralaxtopSELECTOR).stop();
      $(paralaxbottomSELECTOR).stop();
    }
  }

  this.ReturnCurrentSeasonNum = function () {
    return this.currentseasons;
  }

  this.ReturnSeasonCanvas = function (seasonNUM) {
    switch (seasonNUM) {
      case 0:
        return this.season0canvas;
      break;
      case 1:
        return this.season1canvas;
      break;
      case 2:
        return this.season2canvas;
      break;
      case 3:
        return this.season3canvas;
      break;
    }
  }

  this.CreateContainers();
  this.CreateNavigationButtons();
  this.CreateSeasonsContainers();
  this.ResizeMe(destH, destW);
  this.CreateSeasonsCanvas();
  this.ShowSeason(0, 500, "play");
}



// ***************************************************************************************
//                                RAPHAEL HOT SPOT CLASS
// ***************************************************************************************
SvgHotSpot = function (canvasOBJ, imgURL, posX, posY, popinID) {
  this.canvasobj       = canvasOBJ;
  this.posx            = posX - 40;
  this.posy            = posY - 40;
  this.popinid         = popinID;
  this.imgurl          = imgURL;
  var offsetx          = 40;
  var offsety          = 40;
  var hitzonex         = this.posx + offsetx;
  var hitzoney         = this.posy + offsety;
  var actionclass      = null;
  var popindomselector = null;
  var spotimg          = null;
  var spothitzone      = null;

  this.Constructor = function () {
    spotimg          = this.canvasobj.image(this.imgurl, this.posx, this.posy, 80, 80);
    spothitzone      = this.canvasobj.circle(hitzonex, hitzoney, 25);
    actionclass      = "do-Show-" + popinID;
    popindomselector = "#" + popinID;

    spothitzone.attr({"stroke": "none", "fill": "rgba(0, 0, 0, 0.0)", "cursor": "pointer"});
    spotimg.attr({"opacity": "0.0"});
    spothitzone.attr({"opacity": "0.0"});

    $(spothitzone.node).attr("class", actionclass);
    $(spothitzone.node).attr("href", popindomselector);
    
    $("."+actionclass).fancybox({
      'overlayOpacity' : '0.9',
      'overlayColor'   : '#1d1d1d',
      'transitionIn'   : 'fade',
      'speedIn'        : '500',
      'speedOut'       : '500'
    });

    spothitzone.mouseover(function (event) {
      spotimg.animate({"translation": "0, -7"}, 200, "linear");
      spothitzone.animate({"translation": "0, -7"}, 200, "linear");
    });

    spothitzone.mouseout(function (event) {
      spotimg.animate({"translation": "0, 7"}, 400, "bounce");
      spothitzone.animate({"translation": "0, 7"}, 400, "bounce");
    });
  }

  this.AnimationIn = function () {
    spotimg.animate({"opacity": "1.0"}, 2000);
    spothitzone.animate({"opacity": "1.0"}, 2000);
  }

  this.AnimationOut = function () {
    spotimg.animate({"opacity": "0.0"}, 2000);
    spothitzone.animate({"opacity": "0.0"}, 2000);
  }

  this.Constructor();
  this.AnimationIn();
}



// ***************************************************************************************
//                                      FUNCTIONS
// ***************************************************************************************



// ***************************************************************************************
//                                    SEASONS SCRIPTS
// ***************************************************************************************



// ***************************************************************************************
//                                 DOCUMENT READY CALLS
// ***************************************************************************************
// Document ready
$(document).ready(function () {
  var splashscreen   = new SplashScreen("#SplashScreen");
  var seasonlayout   = new Layout("#SeasonApp-01", "#Header", "#Content", "#Footer");
  var contentheight  = seasonlayout.ReturnContentHeight();
  var contentwidth   = seasonlayout.ReturnContentWidth();
  var seasoncarousel = new SeasonsCarousel("#Content", contentheight, contentwidth);
  var currentseason  = seasoncarousel.ReturnCurrentSeasonNum();


  // Next Button
  // Attach event on next button
  $(".do-SlideToNextSeason").click(function (e) {
    currentseason  = seasoncarousel.ReturnCurrentSeasonNum();
    switch (currentseason) {
      case 0:
        seasoncarousel.SlideToSeason(1, 400);
      break;
      case 1:
        seasoncarousel.SlideToSeason(2, 400);
      break;
      case 2:
        seasoncarousel.SlideToSeason(3, 400);
      break;
      case 3:
        alert("fin");
      break;
    }
    e.preventDefault(); 
  });


  // Previous Button
  // Attach event on previous button
  $(".do-SlideToPreviousSeason").click(function (e) {
    currentseason  = seasoncarousel.ReturnCurrentSeasonNum();
    switch (currentseason) {
      case 0:
        alert("début");
      break;
      case 1:
        seasoncarousel.SlideToSeason(0, 400);
      break;
      case 2:
        seasoncarousel.SlideToSeason(1, 400);
      break;
      case 3:
        seasoncarousel.SlideToSeason(2, 400);
      break;
    }
    e.preventDefault(); 
  });


  // Launch Button
  // Attach event on start button
  $(".do-FadeOutSplash").click(function (e) {
    splashscreen.FadeOutMe(600);
    // Tests
    var hotspo01 = new SvgHotSpot(seasoncarousel.season0canvas, "/assets/seasonsproject/hotspot_season0_01.png", 737, 232, "PopIn-Season0-01");
    var hotspo02 = new SvgHotSpot(seasoncarousel.season0canvas, "/assets/seasonsproject/hotspot_season0_02.png", 517, 406, "PopIn-Season0-02");
    var hotspo03 = new SvgHotSpot(seasoncarousel.season0canvas, "/assets/seasonsproject/hotspot_season0_03.png", 810, 434, "PopIn-Season0-03");
    var hotspo04 = new SvgHotSpot(seasoncarousel.season0canvas, "/assets/seasonsproject/hotspot_season0_04.png", 408, 175, "PopIn-Season0-04");
    var hotspo05 = new SvgHotSpot(seasoncarousel.season0canvas, "/assets/seasonsproject/hotspot_season0_05.png", 65, 432, "PopIn-Season0-05");
    // End of tests bloc
    e.preventDefault(); 
  });


  // Document On Resize
  $(window).resize(function() {
    splashscreen.ResizeMe();
    seasonlayout.ResizeMe();
    contentheight  = seasonlayout.ReturnContentHeight();
    contentwidth   = seasonlayout.ReturnContentWidth();
    currentseason  = seasoncarousel.ReturnCurrentSeasonNum();
    seasoncarousel.ResizeMe(contentheight, contentwidth);
    seasoncarousel.ShowSeason(currentseason, 500, "na");
  });
});




