$(document).ready(()=> {
  let view = (() => {
    let menu = new MainMenu('mainMenu',
        [
          new SubMenu('Услуги', '#', 'mainMenuSub', 'subLi', [
            new MenuItem('Проводка в квартире и доме', '#'),
            new MenuItem('Проводка в деревянном доме', '#'),
            new MenuItem('Коммерческие объекты', '#'),
            new MenuItem('Разные', '#'),
          ]),
          new MenuItem('Цены', '#'),
          new MenuItem('Наши работы', '#'),
          new MenuItem('Отзывы', '#'),
          new MenuItem('Контакты', '#'),
        ]
    );
    $('#mainMenu').append(menu._render())
  })();
  
  let control = (() => {
    let $subMenuContainer = $('.subLi');
    $subMenuContainer.hover(()=> {
      $subMenuContainer.find('ul')
          .slideToggle(200)
          .end()
          .toggleClass('active');
    });
  })();
});
