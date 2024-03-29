const DEFAULT_FILTER = {
  min: 0,
  max: 100,
  step: 1,
};

const Filter = {
  chrome: {
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: 'none'
  },
  sepia: {
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: 'none'
  },
  marvin: {
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  phobos: {
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  heat: {
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: 'none'
  }
};

const imageElement = document.querySelector('.img-upload__preview img');
const filtersContainerElement = document.querySelector('.effects__list');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const filterElement = document.querySelector('.effect-level__value');

let chosenElement = '';

const hideSlider = () => {
  sliderContainerElement.classList.add('hidden');
};

const showSlider = () => {
  sliderContainerElement.classList.remove('hidden');
};

noUiSlider.create(sliderElement, {
  range: {
    min: DEFAULT_FILTER.min,
    max: DEFAULT_FILTER.max,
  },
  start: DEFAULT_FILTER.max,
  step: DEFAULT_FILTER.step,
  connect:'lower',
});

hideSlider();

const updateSlider = (filter) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: filter.min,
      max: filter.max,
    },
    step: filter.step,
    start: filter.max,
    format: {
      to: function (value) {
        switch(filter.unit) {
          case 'none':
            return `${chosenElement.style}(${value})`;
          case filter.unit:
            return `${chosenElement.style}(${value}${filter.unit})`;
        }
      },
      from: function (value) {
        return value;
      }
    },
  });
};

const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  imageElement.style.filter = sliderValue;
  filterElement.value = +(sliderValue);
};

const onFiltersChange = (evt) => {
  const currentFilterInput = evt.target.closest('input');
  if(currentFilterInput.value === 'none') {
    imageElement.className = '';
    imageElement.style.filter = '';
    hideSlider();
  } else {
    showSlider();
    chosenElement = Filter[currentFilterInput.value];
    imageElement.className = `effects__preview--${currentFilterInput.value}`;
    updateSlider(chosenElement);
  }
};

const resetFilters = () => {
  imageElement.className = '';
  imageElement.style.filter = '';
  hideSlider();
};

filtersContainerElement.addEventListener('change', onFiltersChange);
sliderElement.noUiSlider.on('update', onSliderUpdate);

export {resetFilters};
