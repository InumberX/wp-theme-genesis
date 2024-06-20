import { ANIMATION_SPEED } from '~/assets/ts/animationSpeed';
const openStatusAttribute = 'data-accordion-open';
const animatingStatusAttribute = 'data-accordion-animating';
const isAccordionOpened = (button) => {
    return button.getAttribute('aria-expanded') === 'true';
};
const show = (button) => {
    const wrapper = button.closest('.JsAccordion, .JsAccordionParent');
    const isAnimating = wrapper.getAttribute(animatingStatusAttribute) === 'true';
    if (isAnimating) {
        return;
    }
    wrapper.setAttribute(animatingStatusAttribute, 'true');
    const contents = wrapper.querySelector('.JsAccordion__contents, .JsAccordionParent__contents');
    button.setAttribute('aria-expanded', 'true');
    contents.removeAttribute('hidden');
    contents.style.willChange = 'max-block-size';
    contents.style.overflow = 'clip';
    const { blockSize } = window.getComputedStyle(contents);
    const keyframes = [
        {
            maxBlockSize: '0',
        },
        {
            maxBlockSize: blockSize,
        },
    ];
    const onAnimationEnd = () => {
        requestAnimationFrame(() => {
            contents.style.willChange = '';
            contents.style.overflow = '';
            wrapper.removeAttribute(animatingStatusAttribute);
        });
    };
    requestAnimationFrame(() => {
        const animation = contents.animate(keyframes, {
            duration: ANIMATION_SPEED.main,
            easing: 'ease-in-out',
        });
        animation.addEventListener('finish', onAnimationEnd);
    });
    const value = wrapper.querySelector('.JsAccordion__value');
    if (!value) {
        return;
    }
    value.setAttribute('value', 'true');
};
const hide = (button) => {
    const wrapper = button.closest('.JsAccordion, .JsAccordionParent');
    const isAnimating = wrapper.getAttribute(animatingStatusAttribute) === 'true';
    if (isAnimating) {
        return;
    }
    wrapper.setAttribute(animatingStatusAttribute, 'true');
    const contents = wrapper.querySelector('.JsAccordion__contents, .JsAccordionParent__contents');
    button.setAttribute('aria-expanded', 'false');
    contents.style.willChange = 'max-block-size';
    contents.style.overflow = 'clip';
    const { blockSize } = window.getComputedStyle(contents);
    const keyframes = [
        {
            maxBlockSize: blockSize,
        },
        {
            maxBlockSize: '0',
        },
    ];
    const onAnimationEnd = () => {
        requestAnimationFrame(() => {
            contents.style.willChange = '';
            contents.style.overflow = '';
            contents.setAttribute('hidden', 'until-found');
            wrapper.removeAttribute(animatingStatusAttribute);
        });
    };
    requestAnimationFrame(() => {
        const animation = contents.animate(keyframes, {
            duration: ANIMATION_SPEED.main,
            easing: 'ease-in-out',
        });
        animation.addEventListener('finish', onAnimationEnd);
    });
    const value = wrapper.querySelector('.JsAccordion__value');
    if (!value) {
        return;
    }
    value.setAttribute('value', '');
};
const handleBeforePrint = () => {
    const wrappers = document.querySelectorAll('.JsAccordion, .JsAccordionParent');
    for (let i = 0, iLength = wrappers.length; i < iLength; i = i + 1) {
        const wrapper = wrappers[i];
        const button = wrapper.querySelector('.JsAccordion__button, .JsAccordionParent__button');
        const contents = wrapper.querySelector('.JsAccordion__contents, .JsAccordionParent__contents');
        const isOpen = isAccordionOpened(button);
        wrapper.setAttribute(openStatusAttribute, String(isOpen));
        button.setAttribute('aria-expanded', 'true');
        contents.removeAttribute('hidden');
    }
};
const handleAfterPrint = () => {
    const wrappers = document.querySelectorAll('.JsAccordion, .JsAccordionParent');
    for (let i = 0, iLength = wrappers.length; i < iLength; i = i + 1) {
        const wrapper = wrappers[i];
        const button = wrapper.querySelector('.JsAccordion__button, .JsAccordionParent__button');
        const contents = wrapper.querySelector('.JsAccordion__contents, .JsAccordionParent__contents');
        const isOpen = isAccordionOpened(button);
        button.setAttribute('aria-expanded', String(isOpen));
        if (!isOpen) {
            contents.setAttribute('hidden', 'until-found');
        }
        wrapper.removeAttribute(openStatusAttribute);
    }
};
const init = () => {
    $(document)
        .off('click.accordion')
        .on('click.accordion', '.JsAccordion__button, .JsAccordionParent__button', function () {
        const self = this;
        isAccordionOpened(self) ? hide(self) : show(self);
        return false;
    });
    $(window)
        .off('beforeprint.accordion')
        .on('beforeprint.accordion', function () {
        handleBeforePrint();
    });
    $(window)
        .off('afterprint.accordion')
        .on('afterprint.accordion', function () {
        handleAfterPrint();
    });
    const wrappers = document.querySelectorAll('.JsAccordion');
    for (let i = 0, iLength = wrappers.length; i < iLength; i = i + 1) {
        const wrapper = wrappers[i];
        const button = wrapper.querySelector('.JsAccordion__button');
        const contents = wrapper.querySelector('.JsAccordion__contents');
        const contentsId = contents.getAttribute('id');
        button.setAttribute('role', 'button');
        button.setAttribute('aria-expanded', String(!contents.hasAttribute('hidden')));
        button.setAttribute('aria-controls', contentsId);
    }
    const parentWrappers = document.querySelectorAll('.JsAccordionParent');
    for (let i = 0, iLength = parentWrappers.length; i < iLength; i = i + 1) {
        const wrapper = parentWrappers[i];
        const button = wrapper.querySelector('.JsAccordionParent__button');
        const contents = wrapper.querySelector('.JsAccordionParent__contents');
        const contentsId = contents.getAttribute('id');
        button.setAttribute('role', 'button');
        button.setAttribute('aria-expanded', String(!contents.hasAttribute('hidden')));
        button.setAttribute('aria-controls', contentsId);
    }
};
export const accordion = {
    init,
};
