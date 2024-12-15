const screenSize = 32; //32x16 technically with an icon bar on top and bottom
let tuneagachiPixels = []; //For saving shape of the digital pet
let defaultTune = ['pixel408','pixel471','pixel440','pixel343','pixel341','pixel342','pixel376','pixel470','pixel536','pixel568','pixel340','pixel339','pixel338','pixel337','pixel368','pixel399','pixel431','pixel463','pixel495','pixel504','pixel599','pixel598','pixel597','pixel593','pixel594','pixel595','pixel596','pixel527','pixel560','pixel402','pixel403','pixel435','pixel434','pixel530','pixel499','pixel498','pixel531']
let tuneEyesOpened = ['pixel402', 'pixel403', 'pixel434', 'pixel435', 'pixel498', 'pixel499', 'pixel530', 'pixel531'];
let tuneEyesClosed = ['pixel403', 'pixel435', 'pixel499', 'pixel531'];
const tuneEyesHappy = ['pixel499','pixel403','pixel434','pixel467','pixel530','pixel563'];
const tuneEyesSad = ['pixel403','pixel435','pixel434','pixel499','pixel498','pixel531']
const foodIconLocation = ['pixel98','pixel99','pixel100','pixel132','pixel164','pixel163','pixel162','pixel131','pixel133','pixel134','pixel135','pixel136','pixel226','pixel227','pixel228','pixel229','pixel230','pixel231','pixel232','pixel258','pixel261','pixel260','pixel259','pixel291','pixel292'];
const bathIconLocation = ['pixel94','pixel91','pixel122','pixel154','pixel218','pixel186','pixel219','pixel220','pixel316','pixel348','pixel288','pixel256','pixel224','pixel192','pixel160','pixel159','pixel127','pixel156','pixel320','pixel62','pixel61','pixel92','pixel349','pixel319','pixel285','pixel253','pixel350']
const lightIconLocation = ['pixel456','pixel488','pixel520','pixel454','pixel486','pixel518','pixel421','pixel388','pixel387','pixel418','pixel449','pixel481','pixel545','pixel513','pixel578','pixel611','pixel612','pixel581','pixel550','pixel552','pixel517','pixel484','pixel516','pixel521','pixel489']
const foodCursor = ['pixel138','pixel170','pixel234','pixel202'];
const lightCursor = ['pixel490','pixel522','pixel554','pixel458'];
const duckCursor = ['pixel249','pixel217','pixel185','pixel153'];
let cursorLocation = 'food';
let okayToBlink = false;
let okayToMakeStinky = true;
let isTuneClean = true;
let isFoodOnScreen = false;
let isTuneSleeping = false;
const stinkyLocation = ['pixel56','pixel88','pixel152','pixel120','pixel87','pixel119','pixel184','pixel151','pixel118','pixel52','pixel19','pixel50','pixel181','pixel212','pixel179','pixel210','pixel177','pixel17']
const fullFoodLocation = ['pixel792','pixel824','pixel888','pixel952','pixel856','pixel920','pixel887','pixel886','pixel855','pixel854','pixel982','pixel949','pixel789','pixel758','pixel851','pixel883','pixel820','pixel916','pixel983','pixel984','pixel759','pixel760'];
const halfFoodLocation= ['pixel883','pixel884','pixel885','pixel886','pixel887','pixel888','pixel920','pixel952','pixel984','pixel983','pixel982','pixel949','pixel916']

//PAGE LOAD METHODS
function createGridScreen(){
    const screen = document.querySelector('.device-screen');
    let pixelNum = 1;
    for(let j=0;j<screenSize;j++){
        const pixelContainer = document.createElement('div');
        pixelContainer.classList.add('pixel-container');
        for(let i=0;i<screenSize;i++){
            const pixel = document.createElement('div');
            pixel.classList.add('pixel');
            //Below comment block allows for drawing on pixel screen
            /* pixel.addEventListener('click', (e)=>{
                colorPixel(e.target);
            }) */
            pixel.setAttribute('id', 'pixel' + pixelNum)
            pixelNum++;
            if(i<9 || i>24){ pixel.classList.add('screen-edge') }
            pixelContainer.appendChild(pixel);
            }
        screen.appendChild(pixelContainer);
        }
}

function loadTune(){
    tuneagachiPixels = defaultTune;
    //listPixels(); //Uncomment for pixel modifying during development
    tuneagachiPixels.forEach(pixel => {
        let pixelEL = document.querySelector('#'+ pixel);
        pixelEL.classList.add('tune-pixel');
    });
    tuneBlink();
}

function setupIcons(){
    foodIconLocation.forEach(pixel => {
        let pixelEl = document.querySelector('#'+pixel);
        pixelEl.style.backgroundColor = 'black';
    });
    bathIconLocation.forEach(pixel => {
        let pixelEl = document.querySelector('#'+pixel);
        pixelEl.style.backgroundColor = 'black';
    });
    lightIconLocation.forEach(pixel => {
        let pixelEl = document.querySelector('#'+pixel);
        pixelEl.style.backgroundColor = 'black';
    });
    foodCursor.forEach(pixel => {
        let pixelEl = document.querySelector('#'+pixel);
        pixelEl.style.backgroundColor = 'black';
    });
}

//EYE ANIMATIONS
function closeTuneEyes(){
    tuneEyesOpened.forEach(pixel => {
        let pixelEl = document.querySelector('#'+pixel);
        pixelEl.classList.remove('tune-pixel')
    });
    tuneEyesClosed.forEach(pixel => {
        let pixelEl = document.querySelector('#'+pixel);
        pixelEl.classList.add('tune-pixel')
    });
}

function openTuneEyes(){
    tuneEyesClosed.forEach(pixel => {
        let pixelEl = document.querySelector('#'+pixel);
        pixelEl.classList.remove('tune-pixel')
    });
    tuneEyesOpened.forEach(pixel => {
        let pixelEl = document.querySelector('#'+pixel);
        pixelEl.classList.add('tune-pixel')
    });
}

function happyTuneEyes(){
    tuneEyesOpened.forEach(pixel => {
        let pixelEl = document.querySelector('#'+pixel);
        pixelEl.classList.remove('tune-pixel')
    });
    tuneEyesHappy.forEach(pixel => {
        let pixelEl = document.querySelector('#'+pixel);
        pixelEl.classList.add('tune-pixel')
    });
    setTimeout(()=>{
        tuneEyesHappy.forEach(pixel => {
            let pixelEl = document.querySelector('#'+pixel);
            pixelEl.classList.remove('tune-pixel')
        });
        tuneEyesOpened.forEach(pixel => {
            let pixelEl = document.querySelector('#'+pixel);
            pixelEl.classList.add('tune-pixel')
        });
    },3000);
}

function sadTuneEyes(){
    tuneEyesOpened.forEach(pixel => {
        let pixelEl = document.querySelector('#'+pixel);
        pixelEl.classList.remove('tune-pixel')
    });
    tuneEyesSad.forEach(pixel => {
        let pixelEl = document.querySelector('#'+pixel);
        pixelEl.classList.add('tune-pixel')
    });
    setTimeout(()=>{
        tuneEyesSad.forEach(pixel => {
            let pixelEl = document.querySelector('#'+pixel);
            pixelEl.classList.remove('tune-pixel')
        });
        tuneEyesOpened.forEach(pixel => {
            let pixelEl = document.querySelector('#'+pixel);
            pixelEl.classList.add('tune-pixel')
        });
    },3000);
}

function tuneBlink(){
    setTimeout(()=>{closeTuneEyes();},5000);
    setTimeout(()=>{openTuneEyes();},6000);
    //if(okayToBlink){setTimeout(()=>{tuneBlink()},7000);}
}

//CHANGE SOMETHING ON SCREEN METHODS
function moveCursor(){
    switch(cursorLocation){
        case 'food':
            cursorLocation = 'light';
            foodCursor.forEach(pixel => {
                let pixelEl = document.querySelector('#'+pixel);
                pixelEl.style.backgroundColor = 'orange';
            });
            lightCursor.forEach(pixel => {
                let pixelEl = document.querySelector('#'+pixel);
                pixelEl.style.backgroundColor = 'black';
            });
            break;
        case 'light':
            cursorLocation = 'duck';
            lightCursor.forEach(pixel => {
                let pixelEl = document.querySelector('#'+pixel);
                pixelEl.style.backgroundColor = 'orange';
            });
            duckCursor.forEach(pixel => {
                let pixelEl = document.querySelector('#'+pixel);
                pixelEl.style.backgroundColor = 'black';
            });
            break;
        case 'duck':
            cursorLocation = 'food';
            duckCursor.forEach(pixel => {
                let pixelEl = document.querySelector('#'+pixel);
                pixelEl.style.backgroundColor = 'orange';
            });
            foodCursor.forEach(pixel => {
                let pixelEl = document.querySelector('#'+pixel);
                pixelEl.style.backgroundColor = 'black';
            });
    }
}

function feedTune(){
    isFoodOnScreen = true;
    fullFoodLocation.forEach(pixel => {
        let pixelEl = document.querySelector('#'+pixel);
        pixelEl.style.backgroundColor = 'black';
    });
    happyTuneEyes();
    setTimeout(()=>{
        fullFoodLocation.forEach(pixel => {
            let pixelEl = document.querySelector('#'+pixel);
            pixelEl.style.backgroundColor = 'orange';
        });
        halfFoodLocation.forEach(pixel => {
            let pixelEl = document.querySelector('#'+pixel);
            pixelEl.style.backgroundColor = 'black';
        });
    }, 3000);
    setTimeout(()=>{
        halfFoodLocation.forEach(pixel => {
            let pixelEl = document.querySelector('#'+pixel);
            pixelEl.style.backgroundColor = 'orange';
        });
        isFoodOnScreen = false;
    }, 10000);
}

function sleepTune(){
    okayToBlink = false;
    closeTuneEyes();
    isTuneSleeping = true;
    setTimeout(()=>{
        openTuneEyes();
        okayToBlink = true;
        tuneBlink();
        isTuneSleeping = false;
    }, 20000);
}

function cleanTune(){
    if(!isTuneClean){
        stinkyLocation.forEach(pixel => {
            let pixelEl = document.querySelector('#'+pixel);
            pixelEl.style.backgroundColor = 'orange';
        });
        happyTuneEyes();
        isTuneClean = true;
        setTimeout(()=>{createStinky();}, 45000);
    }
}

//TIMER INITIATED METHODS
function createStinky(){
    if(isTuneClean){
        sadTuneEyes();
        isTuneClean = false;
        stinkyLocation.forEach(pixel => {
            let pixelEl = document.querySelector('#'+pixel);
            pixelEl.style.backgroundColor = 'black';
        });
    }
}

//HELPER METHODS
function handleCursorAction(){
    switch(cursorLocation){
        case 'food':
            if(!isFoodOnScreen){feedTune();}
            break;
        case 'light':
            if(!isTuneSleeping){sleepTune();}
            break;
        case 'duck':
            cleanTune();
    }
}

//DEVELOPEMENT HELPER METHODS
function colorPixel(el){
    if( el.classList.contains('tune-pixel') ){
        el.classList.remove('tune-pixel');
        tuneagachiPixels = tuneagachiPixels.filter( pixel => pixel !== el.id )
    }else{
        el.classList.add('tune-pixel');
        tuneagachiPixels.push(el.id);
    }
    listPixels();
}

function listPixels(){
    let pixelList = document.querySelector('#tune-pixel-list');
    pixelList.textContent = tuneagachiPixels;
}

//START UP CALLS
createGridScreen();
setupIcons();
loadTune();
setTimeout(()=>{createStinky();},15000)