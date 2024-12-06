export default class ColumnChart {
  element;
  subElements = {};
  chartHeight = 50;
  #loadingStyleAttribute = 'column-chart_loading';

  constructor({ data = [], label = '', value = 0, formatHeading = null, link = '' } = {}) {
    this.data = data;
    this.label = label;
    this.value = formatHeading ? formatHeading(value) : value;
    this.link = link;

    this.render();
  }

  getColumnsBody(chartValues) {
    const maxValue = Math.max(...chartValues);

    return chartValues && !!chartValues.length
      ? chartValues
          .map((numValue) => {
            const ratio = numValue / maxValue;

            return /*html*/ `<div data-tooltip="${(ratio * 100).toFixed(0)}%" style="--value: ${Math.floor(
              ratio * this.chartHeight
            )}"></div>`;
          })
          .join('')
      : '';
  }

  get template() {
    return /*html*/ `
      <div class="column-chart ${this.#loadingStyleAttribute}">
        <div class="column-chart__title">
          ${this.label ? 'Total ' + this.label : ''}
          ${this.link ? `<a class="column-chart__link" href="${this.link}">View all</a>` : ''}
        </div>
        <div class="column-chart__container">
          <div class="column-chart__header">
            ${this.value}
          </div>
          <div data-element="chart" class="column-chart__chart">
            ${this.getColumnsBody(this.data)}
          </div>
        </div>
      </div>
    `;
  }

  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');

    return [...elements].reduce((acc, subElement) => {
      acc[subElement.dataset.element] = subElement;

      return acc;
    }, {});
  }

  render() {
    const element = document.createElement('div');

    element.innerHTML = this.template;
    this.element = element.firstElementChild;

    if (this.data.length) {
      this.element.classList.remove(this.#loadingStyleAttribute);
    }

    this.subElements = this.getSubElements(this.element);
  }

  update(data = []) {
    this.data = data;
    if (!data.length) {
      this.element.classList.add(this.#loadingStyleAttribute);

      return;
    }
    this.subElements.chart.innerHTML = this.getColumnsBody(data);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    this.subElements = {};
    this.data = null;
  }
}
