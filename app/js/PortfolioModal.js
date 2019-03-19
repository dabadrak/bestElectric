"use strict";

class PortfolioModal {
  constructor (source, triggerCategory = 'проводка в квартире и доме', containerId) {
    this.source = source;
    this.triggerCategory = triggerCategory;
    this.items = [];
    this.itemsInCategory = [];
    this.currentIdx = 0;
    this.container = $(containerId);
    this.categoriesContainer = null;
    this.carouselContainer = null;
    this.footerBottomContainer = null;
    this.nameContainer = null;
    this.doneContainer = null;
    this.priceContainer = null;
    this.durationContainer = null;
    this.anotherBtn = null;
    this.slideLeftBtn = null;
    this.slideRightBtn = null;
    this.closeBtn = null;
    this._init();
  }
  
  _init() {
    this.container.fadeIn(200).css('display', 'flex');
    $('html').css('overflow', 'hidden');
    fetch(this.source)
        .then(result => {
          if (result) {return result.json()}
        })
        .then(data => {
          this.items = data;
          this.itemsInCategory = this._getItemsInCategory(data, this.triggerCategory);
          this._renderLayout();
          this._renderCategories(this._getCategories(data), this.categoriesContainer);
          this._setActiveCategory(this.triggerCategory);
          this._renderItem(this.itemsInCategory, this.currentIdx);
          this._initControllers();
        });
  }
  
  _renderLayout() {
    const $content = $('<div class="pm-content"/>');
    const $header = $('<div class="pm-header"/>');
    const $h2 = $('<h2>Наши работы</h2>');
    this.categoriesContainer = $('<ul class="pm-categories"/>');
    this.carouselContainer = $('<div class="pm-carousel-container owl-carousel"/>');
    const $footer = $('<div class="pm-footer"/>');
    const $info = $('<div class="pm-info"/>');
    this.nameContainer = $(`<h3 class="pm-name">Объект: <span></span></h3>`);
    this.doneContainer = $(`<h4 class="pm-done">Сделано: <span></span></h4>`);
    this.footerBottomContainer = $('<div class="pm-footer-bottom"/>');
    this.priceContainer = $(`<div class="pm-price">стоимотсь: <span></span> &#8381;</div>`);
    this.durationContainer = $(`<div class="pm-duration">срок: <span class="pm-duration-number"></span> <span class="pm-duration-word"></span></div>`);
    this.anotherBtn = $('<div class="pm-another">показать следующий</div>');
    this.closeBtn = $('<svg version="1.1" id="Capa_1" viewBox="0 0 212.982 212.982" class="pm-close"><path' +
        ' fill="#ffffff" style="fill-rule:evenodd; clip-rule:evenodd;" d="M131.804,106.491l75.936-75.936c6.99-6.99,' +
        '6.99-18.323,0-25.312c-6.99-6.99-18.322-6.99-25.312,0l-75.937,75.937L30.554,5.242c-6.99-6.99-18.322-6.99-25' +
        '.312,0c-6.989,6.99-6.989,18.323,0,25.312l75.937,75.936L5.242,182.427c-6.989,6.99-6.989,18.323,0,25.312c6.99,' +
        '6.99,18.322,6.99,25.312,0l75.937-75.937l75.937,75.937c6.989,6.99,18.322,6.99,25.312,0c6.99-6.99,6.99-18.322,' +
        '0-25.312L131.804,106.491z"/></g></svg>');
    this.slideLeftBtn = $('<div class="pm-control pm-control__left"/>');
    this.slideRightBtn = $('<div class="pm-control pm-control__right"/>');
    
    $header.appendTo($content);
    $h2.appendTo($header);
    this.categoriesContainer.appendTo($header);
    this.carouselContainer.appendTo($content);
    this.nameContainer.appendTo($info);
    this.doneContainer.appendTo($info);
    $info.appendTo($footer);
    for (let i = 0; i < 3; i++) {
      $('<div class="pm-footer-inner"/>').appendTo(this.footerBottomContainer)
    }
    this.footerBottomContainer.appendTo($footer);
    $footer.appendTo($content);
    this.closeBtn.appendTo($content);
    $content.appendTo(this.container);
    this.slideLeftBtn.appendTo(this.container);
    this.slideRightBtn.appendTo(this.container);
    this.footerBottomContainer.children().each((idx, elem) => {
      switch (idx) {
        case 0: $(elem).append(this.anotherBtn).append($('<div class="pm-underline"/>'));
          break;
        case 1: $(elem).append(this.durationContainer).append($('<div class="pm-underline"/>'));
          break;
        case 2: $(elem).append(this.priceContainer).append($('<div class="pm-underline"/>'));
          break;
      }
    });
  }
  
  _renderItem(items, idx) {
    this.currentIdx = idx;
    this.carouselContainer.empty();
    items[idx].img.forEach(img => {
      $('<div/>', {
        class: 'pm-carousel-inner',
        css: {
          background: `url(${img}) center bottom no-repeat`,
          backgroundSize: 'cover'
        }
      })
          .appendTo(this.carouselContainer)
    });
    this.nameContainer.find('span').text(items[idx].name);
    if (items[idx].name) {
      this.nameContainer.show();
      this.nameContainer.find('span').text(items[idx].name);
    } else {
      this.nameContainer.hide();
    }
    if (items[idx].done) {
      this.doneContainer.show();
      this.doneContainer.find('span').text(items[idx].done);
    } else {
      this.doneContainer.hide();
    }
    if (items[idx].price !== 0) {
      this.priceContainer.show();
      this.priceContainer.find('span').text(items[idx].price);
    } else {
      this.priceContainer.hide();
    }
    if (items[idx].duration !== 0) {
      this.durationContainer.show();
      this.durationContainer.find('span.pm-duration-number').text(items[idx].duration);
      this.durationContainer.find('span.pm-duration-word').text(this._getEnding(items[idx].duration));
    } else {
      this.durationContainer.hide();
    }
    if (this.itemsInCategory.length <= 1) {
      this.anotherBtn.hide();
    } else {
      this.anotherBtn.show();
    }
    this._initCarousel();
  }
  
  _initCarousel() {
    this.carouselContainer.trigger('destroy.owl.carousel');
    this.carouselContainer.owlCarousel({
          loop: true,
          items: 1,
          dots: false,
          margin: 5,
          responsive: {
            800: {
              items: 2
            },
            1300: {
              items: 3
            }
          }
        }
    );
    this.slideLeftBtn.click(() => {
      this.carouselContainer.trigger('prev.owl.carousel');
    });
    this.slideRightBtn.click(() => {
      this.carouselContainer.trigger('next.owl.carousel');
    });
    this.carouselContainer.trigger('refresh.owl.carousel')
  }
  
  _renderCategories(categories, container) {
    categories.forEach(item => {
      container.append($(`<li>${item}</li>`))
    });
  };
  
  _getCategories(items) {
    let categories = [];
    items.forEach(item => {
      if (!categories.includes(item.category)) {
        categories.push(item.category)
      }
    });
    return categories;
  }
  
  _getItemsInCategory(items, category) {
    let itemsInCategory = [];
    items.forEach(item => {
      if (item.category === category) {
        itemsInCategory.push(item)
      }
    });
    return itemsInCategory;
  }
  
  _setActiveCategory(category) {
    let $categoryElems = this.categoriesContainer.find('li');
    $categoryElems.removeClass('active');
    $categoryElems.each((_, elem) => {
      if ($(elem).text() === category) {
        $(elem).addClass('active')
      }
    })
  }
  
  _getNextItemIdx() {
    if (this.currentIdx === this.itemsInCategory.length - 1) {
      return 0
    } else {
      return this.currentIdx + 1
    }
  }
  
  _getEnding(value) {
    /**
     * Возвращает две последних цифры от переданного числа
     * @param {number} deposit
     * @returns {number}
     */
    let getLastDigits = (deposit) => deposit % 100;
  
    /**
     * Возвращает последнюю цифру от переданного числа
     * @param {number} deposit
     * @returns {number}
     */
    let getLastDigit = (deposit) => deposit % 10;
  
    if (Number.isNaN(value)) {
      console.error('Неверный параметр функции подбора слова к колличеству дней, должно быть number');
    } else if (getLastDigits(value) === 10 ||
        getLastDigits(value) === 11 ||
        getLastDigits(value) === 12 ||
        getLastDigits(value) === 13 ||
        getLastDigits(value) === 14 ||
        getLastDigit(value) === 0 ||
        getLastDigit(value) === 5 ||
        getLastDigit(value) === 6 ||
        getLastDigit(value) === 7 ||
        getLastDigit(value) === 8 ||
        getLastDigit(value) === 9) {
      return 'дней'
    } else if (getLastDigit(value) === 1) {
      return 'день'
    } else {
      return 'дня'
    }
  }
  
  _initControllers() {
    this.container.click((e) => {
      if (e.target.id === 'modalPortfolioScreen') {
        this.container.empty();
        this.container.fadeOut(200);
        $('html').css('overflow', 'auto');
      }
    });
    this.closeBtn.click(() => {
      this.container.empty();
      this.container.fadeOut(200);
      $('html').css('overflow', 'auto');
    });
    this.categoriesContainer.click('li', (e) => {
      this._setActiveCategory($(e.target).text());
      this.itemsInCategory = this._getItemsInCategory(this.items, $(e.target).text());
      this._renderItem(this.itemsInCategory, 0)
    });
  
    this.anotherBtn.click(() => {
      this._renderItem(this.itemsInCategory, this._getNextItemIdx());
    })
  }
}