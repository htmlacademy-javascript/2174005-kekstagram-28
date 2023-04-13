const DEFAULT_FILTER = {
  name: 'none',
  style: 'none',
  min: 0,
  max: 100,
  step: 1,
  unit: ''
};

const FILTERS = [
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
];

const imageElement = document.querySelector('.img-upload__preview img');
const filtersContainer = document.querySelector('.effects__list');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const filterLevel = document.querySelector('.effect-level__value');

let chosenFilter = DEFAULT_FILTER;

const isDefault = () => chosenFilter === DEFAULT_FILTER;

const hideSlider = () => {
  sliderContainerElement.classList.add('hidden');
};

const showSlider = () => {
  sliderContainerElement.classList.remove('hidden');
};

const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenFilter.min,
      max: chosenFilter.max,
    },
    step: chosenFilter.step,
    start: chosenFilter.max,
  });

  if(isDefault()){
    hideSlider();
  } else {
    showSlider();
  }
};

const onFiltersChange = (evt) => {
  if(!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenFilter = FILTERS.find((filter) => filter.name === evt.target.value);
  imageElement.className = `effects__preview--${chosenFilter.name}`;
  updateSlider();
};

const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  imageElement.style.filter = isDefault()
    ? DEFAULT_FILTER.style
    : `${chosenFilter.style}(${sliderValue}${chosenFilter.unit})`;
  filterLevel.value = sliderValue;
};

const resetFilters = () => {
  chosenFilter = DEFAULT_FILTER;
  updateSlider();
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

filtersContainer.addEventListener('change', onFiltersChange);
sliderElement.noUiSlider.on('update', onSliderUpdate);

export {resetFilters};
