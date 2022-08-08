// swipper js (for tesstimonials section)

const swiper = new Swiper('.swiper', {
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
    },
});

const menuBtn = document.getElementById("menu-btn")
const closeBtn = document.getElementById('close-btn')
const navMenu = document.querySelector("nav .container ul")

// show menu
menuBtn.addEventListener('click', () => {
        menuBtn.style.display = 'none'
        closeBtn.style.display = 'inline-block'
        navMenu.style.display = 'block'
    })
    // HIDDEN MENU
closeBtn.addEventListener('click', () => {
    closeBtn.style.display = 'none'
    menuBtn.style.display = 'inline-block'
    navMenu.style.display = 'none'
})

// create active classe

const navItems = document.querySelectorAll('li')
const removeActiveClass = () => {
    navItems.forEach(item => {
        const link = item.querySelector("a")
        link.classList.remove("active")
    })
}

navItems.forEach(item => {
    const link = item.querySelector("a")
    link.addEventListener('click', () => {
        removeActiveClass();
        link.classList.add('active');
    })
})

// hidden description 

const aboutDescription = document.querySelector(".readmore_section")
const showMore = document.querySelector('.read-more')
    // show more 

showMore.addEventListener('click', () => {
    aboutDescription.classList.toggle("show-content")
    aboutDescription.classList.contains('show-content') ? showMore.textContent = 'Show less' : showMore.textContent = 'Show more'
})

//show/hide skills items

const skillsItems = document.querySelectorAll('section.skills .skill')

skillsItems.forEach(skill => {
    skill.querySelector('.head').addEventListener('click', () => {
        skill.querySelector('.items').classList.toggle("show-items");
    })
})

// add box-shadow on scroll

window.addEventListener('scroll', () => {
    document.querySelector('nav').classList.toggle("show-box-shadow", window.scrollY > 0)
})