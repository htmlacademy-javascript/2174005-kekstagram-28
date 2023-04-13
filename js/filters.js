const DEFAULT_FILTER = {
  name: 'none',
  style: 'none',
  min: 0,
  max: 100,
  step: 1,
  unit: ''
};

const Filter = {
  chrome: {
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  sepia: {
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
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
    unit: ''
  }
};

const imageElement = document.querySelector('.img-upload__preview img');
const filtersContainerElement = document.querySelector('.effects__list');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const filterElement = document.querySelector('.effect-level__value');

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

  isDefault() ? hideSlider() : showSlider();
};

const onFiltersChange = (evt) => {
  const currentFilterInput = evt.target.classList.contains('effects__radio');
  if(!currentFilterInput) {
    return;
  }
  chosenFilter = Filter[currentFilterInput.value];
  imageElement.className = `effects__preview--${currentFilterInput.value}`;
  updateSlider();
};

const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  imageElement.style.filter = isDefault()
    ? DEFAULT_FILTER.style
    : `${chosenFilter.style}(${sliderValue}${chosenFilter.unit})`;
  filterElement.value = sliderValue;
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

filtersContainerElement.addEventListener('change', onFiltersChange);
sliderElement.noUiSlider.on('update', onSliderUpdate);

export {resetFilters};
