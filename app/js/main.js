$(document).ready(()=> {
  const view = (() => {
    const $mainMenuContainer = $('#mainMenu');
    const menu = new Menu('mainMenu',
        [
          new SubMenu('Услуги', '#', 'mainMenuSub', 'mainMenuSubLi', [
            new MenuItem('Проводка в квартире и доме', '#'),
            new MenuItem('Проводка в деревянном доме', '#'),
            new MenuItem('Коммерческие объекты', '#'),
            new MenuItem('Разные', '#'),
          ]),
          new MenuItem('Цены', '#'),
          new MenuItem('Наши&nbsp;работы', '#'),
          new MenuItem('Отзывы', '#'),
          new MenuItem('Контакты', '#'),
        ]
    );
    $mainMenuContainer.append(menu._render());
    
    const $mobileMenuContainer = $('#mobileMenu');
    const mobileMenu = new Menu('mobileMenu',
        [
          new SubMenu('Услуги', '#', 'mobileMenuSub', 'mobileMenuSubLi', [
            new MenuItem('Проводка в квартире и доме', '#'),
            new MenuItem('Проводка в деревянном доме', '#'),
            new MenuItem('Коммерческие объекты', '#'),
            new MenuItem('Разные', '#'),
          ]),
          new MenuItem('Цены', '#'),
          new MenuItem('Наши&nbsp;работы', '#'),
          new MenuItem('Отзывы', '#'),
          new MenuItem('Контакты', '#'),
        ]
    );
    $mobileMenuContainer.append(mobileMenu._render());
  
   
  })();
  
  const control = (() => {
    const menu = (() =>{
      const $header = $('#header');
      let lastScrollTop = 0;
      $(window).scroll(() => {
        let scrollTop = $(this).scrollTop();
        if (scrollTop > lastScrollTop) {
          $header.hide('slide', {direction: 'up'}, 300);
        } else {
          $header.show('slide', {direction: 'up'}, 300);
        }
        lastScrollTop = scrollTop;
      });
      
      const $subMenuContainer = $('.mainMenuSubLi');
      $subMenuContainer.hover(()=> {
        $subMenuContainer
            .toggleClass('active')
            .find('ul')
            .fadeToggle(400)
      });

      const $mobileMenuSideBar = $('.mobileMenuSideBar');
      const $mobileMenuContentMask = $('#mobileMenuContentMask');
      $('#mobileMenuBtn').click(() => {
        $mobileMenuSideBar.show('slide', {direction: 'right'}, 500);
        $mobileMenuContentMask.fadeIn();
      });
  
      function hideMenu() {
        $mobileMenuSideBar.hide('slide', {direction: 'right'}, 500);
        $mobileMenuContentMask.fadeOut();
      }
  
      $('#mobileMenuCloseBtn').click(() => {hideMenu()});
      $mobileMenuContentMask.click(() => {hideMenu()});
  
      $('.mobileMenuSubLi>a').click(() => {
        $('.mobileMenuSub').slideToggle()
      });
    })();
  })();
  
  const plugins = (() => {
  
    //Аккордионы мини прайсов
    $('#accordionWiring').accordion(1000);
    $('#accordionTools').accordion(1000);
    $('#accordionCommercial').accordion(1000);
    
    //Табы с мини прайсами в начале страницы
    $('#servicesTabs').tabs({
      active: 0,
      hide: {
        effect: "drop",
        duration: 1000
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
});
