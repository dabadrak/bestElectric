$(document).ready(()=> {
  let view = (() => {
    const $mainMenuContainer = $('#mainMenu');
    let menu = new Menu('mainMenu',
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
    let mobileMenu = new Menu('mobileMenu',
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
  
  let control = (() => {
    let $subMenuContainer = $('.mainMenuSubLi');
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
});
