window.addEventListener('DOMContentLoaded', () => {
    const dualRangeSliders = document.querySelectorAll('.dual-range');
    dualRangeSliders.forEach(rangeElement => {
        new DualRangeSlider(rangeElement);
    });
});
class DualRangeSlider {
    constructor(rangeElement) {
        this.range = rangeElement;
        this.min = Number(rangeElement.dataset.min);
        this.max = Number(rangeElement.dataset.max);
        this.handles = [...this.range.querySelectorAll('.handle')];
        this.startPos = 0;
        this.activeHandle;

        this.handles.forEach(handle => {
            handle.addEventListener('mousedown', this.startMove.bind(this));
            handle.addEventListener('touchstart', this.startMoveTouch.bind(this));
        });

        window.addEventListener('mouseup', this.stopMove.bind(this));
        window.addEventListener('touchend', this.stopMove.bind(this));
        window.addEventListener('touchcancel', this.stopMove.bind(this));
        window.addEventListener('touchleave', this.stopMove.bind(this));

        const rangeRect = this.range.getBoundingClientRect();
        const handleRect = this.handles[0].getBoundingClientRect();
        this.range.style.setProperty('--x-1', '0px');
        this.range.style.setProperty('--x-2', rangeRect.width - handleRect.width / 2 + 'px');
        this.handles[0].dataset.value = this.range.dataset.min;
        this.handles[1].dataset.value = this.range.dataset.max;
    }

    startMoveTouch(e) {
        const handleRect = e.target.getBoundingClientRect();
        this.startPos = e.touches[0].clientX - handleRect.x;
        this.activeHandle = e.target;
        this.moveTouchListener = this.moveTouch.bind(this);
        window.addEventListener('touchmove', this.moveTouchListener);
    }

    startMove(e) {
        this.startPos = e.offsetX;
        this.activeHandle = e.target;
        this.moveListener = this.move.bind(this);
        window.addEventListener('mousemove', this.moveListener);
    }

    moveTouch(e) {
        this.move({
            clientX: e.touches[0].clientX
        });
    }

    move(e) {
        const isLeft = this.activeHandle.classList.contains('left');
        const property = isLeft ? '--x-1' : '--x-2';
        const parentRect = this.range.getBoundingClientRect();
        const handleRect = this.activeHandle.getBoundingClientRect();
        let newX = e.clientX - parentRect.x - this.startPos;
        if (isLeft) {
            const otherX = parseInt(this.range.style.getPropertyValue('--x-2'));
            newX = Math.min(newX, otherX - handleRect.width);
            newX = Math.max(newX, 0 - handleRect.width / 2);
        } else {
            const otherX = parseInt(this.range.style.getPropertyValue('--x-1'));
            newX = Math.max(newX, otherX + handleRect.width);
            newX = Math.min(newX, parentRect.width - handleRect.width / 2);
        }
        this.activeHandle.dataset.value = this.calcHandleValue((newX + handleRect.width / 2) / parentRect
            .width);
        this.range.style.setProperty(property, newX + 'px');
    }

    calcHandleValue(percentage) {
        return Math.round(percentage * (this.max - this.min) + this.min);
    }

    stopMove() {
        window.removeEventListener('mousemove', this.moveListener);
        window.removeEventListener('touchmove', this.moveTouchListener);
    }
}

$(document).ready(function () {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    $('.modal__show').modal('show');
    $(document).ready(function () {
        $('.active__content').click(function () {
            $('.active__content').next().slideToggle();
        })
        $('.country__content div').click(function () {
            $('.country__content').slideToggle();
        })
        $('.filter__item').click(function () {
            if ($(this).next().css('display') === 'none') {
                $(this).next().slideToggle();
                $(this).children('img').css('transform', 'rotate(180deg)');
            }else{
                $(this).next().slideToggle();
                $(this).children('img').css('transform', 'rotate(0deg)');
            }
        })
    })
});