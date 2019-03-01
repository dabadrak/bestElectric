class MenuItem{
  constructor(label, href) {
    this.label = label;
    this.href = href;
  }
  
  _render() {
    return `<li><a href="${this.href}">${this.label}</a></li>`
  }
}