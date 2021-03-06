$(document).ready(()=> {
  
  /**
   * Основное меню в хедере
   */
  const mainMenu = (() => {
    //Создание меню
    const menu = new Menu('mainMenu',
        [
          new SubMenu('Услуги', '#', 'mainMenuSub', 'mainMenuSubLi', [
            new MenuItem('Проводка в квартире и доме', '#housesAppartments'),
            new MenuItem('Проводка в деревянном доме', '#woodenHouses'),
            new MenuItem('Коммерческие объекты', '#commercial'),
            new MenuItem('Разные', '#'),
          ]),
          new MenuItem('Цены', '#'),
          new MenuItem('Наши&nbsp;работы', '#'),
          new MenuItem('Отзывы', '#'),
          new MenuItem('Контакты', '#'),
        ]
    );
    //Добавление меню
    const $mainMenuContainer = $('#mainMenu');
    $mainMenuContainer.append(menu._render());
  
    //Прячет меню при прокрутке вниз и показывает при прокрутке вверх
    const $header = $('#header');
    let lastScrollTop = 0;
    $(window).scroll(() => {
      let scrollTop = $(this).scrollTop();
      if (scrollTop > lastScrollTop) {
        $header.hide('slide', {direction: 'up'}, 200);
      } else {
        $header.show('slide', {direction: 'up'}, 200);
      }
      lastScrollTop = scrollTop;
    });
    
    //Разворачивает пункт субменю
    const $subMenuContainer = $('.mainMenuSubLi');
    $subMenuContainer.hover(()=> {
      $subMenuContainer
          .toggleClass('active')
          .find('ul')
          .fadeToggle(200)
    });
  })();
  
  /**
   * Мобильное меню
   */
  const mobileMenu = (() => {
    //Создание мобильного меню
    const mobileMenu = new Menu('mobileMenu',
        [
          new SubMenu('Услуги', '#', 'mobileMenuSub', 'mobileMenuSubLi', [
            new MenuItem('Проводка в квартире и доме', '#housesAppartments'),
            new MenuItem('Проводка в деревянном доме', '#woodenHouses'),
            new MenuItem('Коммерческие объекты', '#commercial'),
            new MenuItem('Разные', '#'),
          ]),
          new MenuItem('Цены', '#'),
          new MenuItem('Наши&nbsp;работы', '#'),
          new MenuItem('Отзывы', '#'),
          new MenuItem('Контакты', '#'),
        ]
    );
    //Добавление мобильного иеню
    const $mobileMenuContainer = $('#mobileMenu');
    $mobileMenuContainer.append(mobileMenu._render());

    //Показать меню при нажатии на кнопку меню
    const $mobileMenuSideBar = $('.mobileMenuSideBar');
    const $mobileMenuContentMask = $('#mobileMenuContentMask');
    $('#mobileMenuBtn').click(() => {
      $mobileMenuSideBar.show('slide', {direction: 'right'}, 200);
      $mobileMenuContentMask.fadeIn();
    });

    //Скрыть меню при нажатии на кнопку закрыть
    $('#mobileMenuCloseBtn').click(() => {hideMenu()});
    $mobileMenuContentMask.click(() => {hideMenu()});
  
    //Скрыть меню при выборе пункта
    const $mobileMenuSubLiA = $('.mobileMenuSubLi>a');
    $mobileMenuContainer.find('a').not($mobileMenuSubLiA).click(() => {hideMenu()});
    $mobileMenuContentMask.click(() => {hideMenu()});
    $mobileMenuSubLiA.click(() => {
      $('.mobileMenuSub').slideToggle(200)
    });
  
    /**
     * Скрывает меню плавным слайдом
     */
    function hideMenu() {
      $mobileMenuSideBar.hide('slide', {direction: 'right'}, 200);
      $mobileMenuContentMask.fadeOut();
    }
  })();
  
  /**
   * Управление секцией serices
   */
  const services = (() => {
    
    //Аккордионы мини прайсов
    $('#accordionWiring').accordion(100);
    $('#accordionTools').accordion(100);
    $('#accordionCommercial').accordion(100);
    
    //Табы с мини прайсами
    $('#servicesTabs').tabs({
      active: 0,
      hide: {
        effect: "fade",
        duration: 200
      },
      show: {
        effect: "fade",
        duration: 200
      }
    });
    
    //Подсветка лэйбла активного таба
    $('.servicesPriceNav').click('li', (e) => {
      $('.servicesPriceNav')
          .find('.active')
          .removeClass('active');
      e.target.parentNode.classList.add('active')
    });
  })();
  
  /**
   * Управление секцией sericesBig
   */
  const servicesBig = (() => {
    /**
     * Вызов потфолио во всплывающем окне
     */
    $('.jsPortfolioModalTrigger').click((e) => {
      new PortfolioModal('../json/portfolioModal.json', e.target.dataset.category, '#modalPortfolioScreen');
    });
  })();
  
  //Анимированная кнопка заказить
  new BubblyButton();
});
