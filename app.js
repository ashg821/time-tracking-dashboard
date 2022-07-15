async function fetchData() {
    const res = await fetch('./data.json');
    const data = await res.json();
    return data;
}


async function consumeData() {
    const data = await fetchData();

    const iconArray = ['./images/icon-work.svg', './images/icon-play.svg', './images/icon-study.svg', './images/icon-exercise.svg', './images/icon-social.svg', './images/icon-self-care.svg'];

    const backgroundColors = ['hsl(15, 100%, 70%)', 'hsl(195, 74%, 62%)', 'hsl(348, 100%, 68%)', 'hsl(145, 58%, 55%)', 'hsl(264, 64%, 52%)', 'hsl(43, 84%, 65%)'];

    data.forEach((element, index) => {
        category.innerHTML += `
            <div class="card" id="card-${index + 1}">
            <img src=${iconArray[index]} alt="card-icon" height=60 width=60 class="cardIcon">
                <div class="cardDetail">
                    <div class="titleHolder">
                        <p class="detailTitle">${element.title}</p>
                        <img class="ellipseImage" src="./images/icon-ellipsis.svg" alt="ellipse-icon">
                    </div>
                    <div class="timeContainer">
                        <p class="currentTime">${element.timeframes.daily.current}hrs</p>
                        <p class="previousTime">Last week - ${element.timeframes.daily.previous}hrs</p>
                    </div>
                </div>
            </div>`

        document.getElementById(`card-${index + 1}`).style.backgroundColor = backgroundColors[index];
    });


    const links = document.querySelectorAll('.link');
    links[0].style.color = 'white';

    links.forEach((ele, Index) => {
        ele.addEventListener('click', () => {
            const text = ele.innerText.toLowerCase();
            const category = document.getElementById('category');
            changeLinkColor(Index);
            category.innerHTML = '';
            data.forEach((element, index) => {
                category.innerHTML += `
                    <div class="card" id="card-${index + 1}">
                    <img src=${iconArray[index]} alt="card-icon" height=60 width=60 class="cardIcon">
                    <div class="cardDetail">
                    <div class="titleHolder">
                        <p class="detailTitle">${element.title}</p>
                        <img class="ellipseImage" src="./images/icon-ellipsis.svg" alt="ellipse-icon">
                    </div>
                    <div class="timeContainer">
                        <p class="currentTime">${element.timeframes[text].current}hrs</p>
                        <p class="previousTime">Last week - ${element.timeframes[text].previous}hrs</p>
                    </div>
                    </div>
                </div>`

                document.getElementById(`card-${index + 1}`).style.backgroundColor = backgroundColors[index];
            });
        });
    });

    function changeLinkColor(index){
        links[index].style.color = 'white';

        links.forEach((ele, linkIndex)=>{
            if(index != linkIndex) ele.style.color = 'hsl(235, 45%, 61%)';
        });
    }


}

consumeData();