const screenSize = 32; //32x16 technically with an icon bar on top
let tuneagachiPixels = []; //For saving shape of the digital pet
let defaultTune = ['pixel408','pixel471','pixel440','pixel343','pixel341','pixel342','pixel376','pixel470','pixel536','pixel568','pixel340','pixel339','pixel338','pixel337','pixel368','pixel399','pixel431','pixel463','pixel495','pixel504','pixel599','pixel598','pixel597','pixel593','pixel594','pixel595','pixel596','pixel527','pixel560','pixel402','pixel403','pixel435','pixel434','pixel530','pixel499','pixel498','pixel531']
let tuneEyesOpened = ['402', '403', '434', '435', '498', '499', '530', '531'];
let tuneEyesClosed = ['403', '435', '499', '531'];

function createGridScreen(){
    const screen = document.querySelector('.device-screen');
    let pixelNum = 1;
    for(let j=0;j<screenSize;j++){
        const pixelContainer = document.createElement('div');
        pixelContainer.classList.add('pixel-container');
        for(let i=0;i<screenSize;i++){
            const pixel = document.createElement('div');
            pixel.classList.add('pixel');
            pixel.addEventListener('click', (e)=>{
                colorPixel(e.target);
            })
            pixel.setAttribute('id', 'pixel' + pixelNum)
            pixelNum++;
            if(j%2===0){
                i%2===0 ? pixel.classList.add('odd') : pixel.classList.add('even')
            }else{
                i%2===0 ? pixel.classList.add('even') : pixel.classList.add('odd')
            }
            pixelContainer.appendChild(pixel);
            }
        screen.appendChild(pixelContainer);
        }
}

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

function loadTune(e){
    tuneagachiPixels = defaultTune;
    listPixels();
    tuneagachiPixels.forEach(pixel => {
        let pixelEL = document.querySelector('#'+ pixel);
        pixelEL.classList.add('tune-pixel');
    });
}

createGridScreen();