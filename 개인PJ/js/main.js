const scene = ["./images/main1.jpg", "./images/main2.jpg","./images/main3.jpg","./images/main4.jpg","./images/main5.jpg"]
let seq = 0;

setInterval(() => {

    // 순번찍기
    console.log("이번순번은?", seq);

    // body에 배경이미지 변경하기
    document.simg.img =
        `url(${scene[seq]})`;

    // 순번증가
    seq++;
    // 한계값 체크 
    if (seq === 5) seq = 0; // 처음으로 

}, 3000); /// 인터발 함수/////

// $("#slide > div:gt(0)").hide();

// setInterval(function() { 
//   $('#slide > div:first')
//     .fadeOut(1000)
//     .next()
//     .fadeIn(1000)
//     .end()
//     .appendTo('#slide');
// },  3000);