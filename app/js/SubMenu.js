class SubMenu extends MainMenu {
  constructor (label, href, ulClass, liClass, items) {
    super (ulClass, items);
    this.label = label;
    this.href = href;
    this.liClass = liClass;
  }
  
  _render() {
    let $li = $(`<li class="${this.liClass}"/>`);
    let $a = $(`<a href="${this.href}">${this.label}</a>`);
    let $subMenu = super._render();
    $a.appendTo($li);
    $subMenu.appendTo($li);
    return $li;
  }
}