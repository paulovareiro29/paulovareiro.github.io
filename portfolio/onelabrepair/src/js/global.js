$(document).ready(() => {
  //  Verificação se o DOM está loaded
  let stateCheck = setInterval(() => {
    if (document.readyState === "complete") {
      clearInterval(stateCheck);

      loadElements();
      loadCostum();

      //  Mostra o body enquanto o DOM não está fully loaded
      $("body").css({
        opacity: 1,
      });
    }
  }, 100);
});

function loadElements() {
  loadDropdowns();
  loadAnimations();
  loadCarousel();
  loadFooterWidget();
}

function loadCostum() {
  loadNavbar();
  loadHeros();

  loadReviews();
}

function loadDropdowns() {
  $(".dropdown-content").animate(
    {
      height: "hide",
    },
    $(":root").css("--transition-time")
  );

  $(".dropdown-label").click((e) => {
    const parent = $(e.target).parents(".dropdown");

    $(parent).children(".dropdown-content").animate(
      {
        height: "toggle",
      },
      $(":root").css("--transition-time")
    );

    $(parent).toggleClass("open");
  });
}

$.fn.PVAnimate = function () {
  let animation = $(this).attr("data-animation");
  let delay = $(this).attr("data-delay");

  if (!animation) return;

  setTimeout(() => {
    $(this).removeClass("animated").addClass(animation);
  }, parseInt(delay));
};

function loadAnimations() {
  function checkAnimation() {
    const elements = $(".animated");

    if (!elements.length) return;

    $(elements).each(function (key, element) {
      let topOfElement = $(element).offset().top;
      let bottomOfElement = $(element).offset().top + $(element).outerHeight();
      let bottomOfScreen = $(window).scrollTop() + $(window).innerHeight();
      let topOfScreen = $(window).scrollTop();

      if (bottomOfScreen > topOfElement && topOfScreen < bottomOfElement) {
        $(element).PVAnimate();
      }
    });
  }

  checkAnimation();
  $(window).scroll(checkAnimation);
}

function loadCarousel() {
  const element = $(".carousel");

  $(element).slick({
    infinite: true,
    dots: $(element).attr("data-dots") || true,
    fade: $(element).attr("data-fade") || false,
    arrows: $(element).attr("data-arrows") || true,
    prevArrow: `<button type="button" class="carousel-prev"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.9427 23.0574L11.2187 17.3334H24V14.6667H11.2187L16.9427 8.94271L15.0573 7.05737L6.11465 16L15.0573 24.9427L16.9427 23.0574Z" fill="#FFCC01"/>
    </svg>
    </button>`,
    nextArrow: `<button type="button" class="carousel-next"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.0573 23.0574L16.9427 24.9427L25.8853 16L16.9427 7.05737L15.0573 8.94271L20.7813 14.6667H8V17.3334H20.7813L15.0573 23.0574Z" fill="#FFCC01"/>
    </svg></button>`,
  });
}

function loadFooterWidget() {
  if ($(window).width() <= 768) {
    $(".footer-widget-content").animate(
      {
        height: "toggle",
      },
      $(":root").css("--transition-time")
    );
  }

  $(".footer-widget-label").click((e) => {
    if ($(window).width() <= 768) {
      const parent = $(e.target).parents(".footer-widget");
      $(parent).toggleClass("open");
      console.log(parent);

      $(parent).children(".footer-widget-content").animate(
        {
          height: "toggle",
        },
        $(":root").css("--transition-time")
      );
    }
  });
}

/**  COSTUM  */
function loadNavbar() {
  $("#overlay").hide();
  $(".hoverable-container").hide();
  $(".navbar-mobile-navigation").hide();

  $(".hoverable-label").mouseenter((e) => {
    const parent = $(e.target).parents(".hoverable-link");

    $(parent).children(".hoverable-label").addClass("color-secondary");
    $(parent).children(".hoverable-container").show();
  });

  $(".hoverable-link").mouseleave((e) => {
    let parent = $(e.target).parents(".hoverable-link");
    if (!parent.length) parent = $(e.target);

    $(parent).children(".hoverable-label").removeClass("color-secondary");
    $(parent).children(".hoverable-container").hide();
  });

  /** MOBILE */
  $(".hoverable-label").mouseenter((e) => {
    const parent = $(e.target).parents(".hoverable-link");

    if ($(parent).hasClass("navbar-mobile")) {
      $("#overlay").show();
    }
  });

  $(".hoverable-link").mouseleave((e) => {
    let parent = $(e.target).parents(".hoverable-link");
    if (!parent.length) parent = $(e.target);

    if ($(parent).hasClass("navbar-mobile")) {
      $("#overlay").hide();
    }
  });
}

function loadHeros() {
  $(".hero-carousel").slick({
    infinite: true,
    dots: true,
    adaptiveHeight: true,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    speed: 1000,
    cssEase: "linear",
    arrows: false,
  });
}

let reviews = Array();

for (let i = 0; i < 5; i++) {
  reviews.push({
    photo: "src/images/photo.png",
    name: "George Walker",
    rating: 5,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
  });
}

function loadReviews() {
  reviews.forEach((review) => {
    let rating = "";

    review.rating = parseInt(review.rating);

    for (let i = 0; i < review.rating; i++) {
      rating += `<img src="src/images/icons/star-filled.svg" alt="">`;
    }

    if (review.rating < 5)
      for (let i = 0; i < 5 - review.rating; i++) {
        rating += `<img src="src/images/icons/star-nofilled.svg" alt="">`;
      }

    $(".reviews.carousel").slick(
      "slickAdd",
      `
    <div class="review-item">
      <div class="review-item-wrapper">
        <div class="review-photo">
          <img src="${review.photo}" alt="">
        </div>
        <h5 class="review-name text-center">${review.name}</h5>
        <div class="rating d-flex">
          ${rating}
        </div>
        <p class="text-center color-text-secondary">${review.review}</p>
      </div>
    </div>
    `
    );

    $(".reviews.carousel").each(function (index, element) {
      $(element)
        .slick("unslick")
        .slick({
          infinite: true,
          dots: $(element).attr("data-dots") || true,
          fade: $(element).attr("data-fade") || false,
          arrows: $(element).attr("data-arrows") || true,
          prevArrow: `<button type="button" class="carousel-prev"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.9427 23.0574L11.2187 17.3334H24V14.6667H11.2187L16.9427 8.94271L15.0573 7.05737L6.11465 16L15.0573 24.9427L16.9427 23.0574Z" fill="#FFCC01"/>
        </svg>
        </button>`,
          nextArrow: `<button type="button" class="carousel-next"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.0573 23.0574L16.9427 24.9427L25.8853 16L16.9427 7.05737L15.0573 8.94271L20.7813 14.6667H8V17.3334H20.7813L15.0573 23.0574Z" fill="#FFCC01"/>
        </svg></button>`,
        });
    });
  });
}
